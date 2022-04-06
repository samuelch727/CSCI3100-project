import CodeBlock from "../../components/CodeBlock";
import { useRouter } from "next/router";
import CodeControlBar from "../../components/CodeControlBar";
import { API, graphqlOperation } from "aws-amplify";
import { getProject } from "../../graphql/queries";
import { Project } from "../../API";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { Auth } from "aws-amplify";
import { diff_match_patch } from "../../functions/diff_match_patch_uncompressed";
import { v4 as uuidv4 } from "uuid";

interface CodeLocation {
  lineNumber: number;
  column: number;
}
interface UserData {
  userName: string;
  codeLocation: CodeLocation;
  peerId: string;
}

export default function Code() {
  const socket = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [users, setUsers] = useState<UserData[]>([]);
  const [sourceCode, setSourceCode] = useState("This\nis\na\ntest");
  const codeBlock = useRef(null);
  let lastSentCode = "";
  let sentUUId = "";
  const [connectionId, setConnectionId] = useState("");
  const originalText = "This\nis\na\ntest";
  const router = useRouter();
  const { pid } = router.query;
  const [project, setProject] = useState<Project>();
  const socketUrl =
    "wss://fq6x2i22xb.execute-api.ap-southeast-1.amazonaws.com/production";

  var dmp = new diff_match_patch();
  const onSocketOpen = useCallback((pid: string, codeId: string) => {
    const setName = async () => {
      setIsConnected(true);
      const user = await Auth.currentAuthenticatedUser();
      console.log("codeId: ", codeId);
      waitForConnection(() => {
        try {
          console.log("pid: ", pid);
          socket.current?.send(
            JSON.stringify({
              action: "setName",
              userName: user.username,
              roomId: project?.projectCodeId,
              codeId: codeId,
            })
          );
          console.log("setName done");
        } catch (e) {
          console.log(e);
        }
      }, 1000);
    };
    setName();
  }, []);

  const waitForConnection = function(callback, interval) {
    if (socket.current?.readyState === WebSocket.OPEN) {
      console.log("connected");
      console.log(socket.current);
      callback();
    } else {
      setTimeout(function() {
        waitForConnection(callback, interval);
      }, interval);
    }
  };

  const onSocketClose = useCallback(() => {
    setIsConnected(false);
    setUsers([]);
  }, []);

  const onSocketMessage = useCallback((message) => {
    const data = JSON.parse(message);
    console.log(data);
    if (data.id) {
      setConnectionId(data.id);
      console.log(connectionId);
    }
    if (data.users) {
      setUsers(data.users);
    }
    if (data.initCode) {
      console.log(data.initCode);
      lastSentCode = data.initCode;
      codeBlock.current(null, data.initCode);
    }
    if (data.sourceCode) {
      // let patchResult = dmp.patch_apply(
      //   dmp.patch_fromText(data.sourceCode),
      //   lastSentCode
      // );
      // console.log(codeBlock);
      console.log("sentUUId: ", data.codeId.toString() === sentUUId);
      if (data.codeId.toString() !== sentUUId) {
        lastSentCode = dmp
          .patch_apply(dmp.patch_fromText(data.sourceCode), lastSentCode)[0]
          .toString();
        console.log("lastSentCode: ", lastSentCode);
        codeBlock.current(data.sourceCode);
      }
    }
  }, []);

  const onConnect = useCallback((pid: string, codeId: string) => {
    if (socket.current?.readyState !== WebSocket.OPEN) {
      socket.current = new WebSocket(socketUrl);
      console.log(socket.current);
      socket.current.addEventListener("open", onSocketOpen(pid, codeId));
      socket.current.addEventListener("close", onSocketClose);
      socket.current.addEventListener("message", (e) => {
        onSocketMessage(e.data);
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      socket.current?.close();
    };
  }, []);

  const updateCode = useCallback((code, userLocation) => {
    sendUpdatedCode(code, userLocation);
    console.log("lastSentCode: ", lastSentCode);
  }, []);

  const sendUpdatedCode = throttle((code, userLocation) => {
    console.log("sendUpdatedCode: orgCode: ", lastSentCode);
    var patch = dmp.patch_make(lastSentCode, code);
    console.log("change code: ", dmp.patch_toText(patch));
    setSourceCode(code);
    lastSentCode = code;
    sentUUId = uuidv4();
    socket.current?.send(
      JSON.stringify({
        action: "sendCode",
        sourceCode: dmp.patch_toText(patch),
        codeId: sentUUId,
        codeLocation: userLocation,
      })
    );
    // socket.current?.send(
    //   JSON.stringify({ action: "sendCodeLocation", codeLocation: "test" })
    // );
  });

  function throttle(cb, delay = 1000) {
    let shouldWait = false;
    let originalCode = "";
    let init = false;
    let waitingArgs;
    const timeoutFunc = () => {
      if (waitingArgs == null) {
        shouldWait = false;
      } else {
        // console.log("waitingArgs: ", waitingArgs);
        cb(waitingArgs[0], waitingArgs[1]);
        originalCode = waitingArgs[0];
        waitingArgs = null;
        setTimeout(timeoutFunc, delay);
      }
    };

    return (...args) => {
      if (shouldWait) {
        waitingArgs = args;
        return;
      }
      if (!init) {
        originalCode = args[1];
        init = true;
      }
      shouldWait = true;

      setTimeout(timeoutFunc, delay);
    };
  }

  function updateLocation(location: CodeLocation) {
    socket.current?.send(
      JSON.stringify({ action: "sendCodeLocation", codeLocation: location })
    );
  }

  useEffect(() => {
    const fetchProject = async () => {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user.username);
      if (pid) {
        const project = (await API.graphql(
          graphqlOperation(getProject, { id: pid })
        )) as {
          data: Project;
          error: any;
        };

        if (project.data) {
          setProject(project.data.getProject);
          console.log(project.data.getProject);
          let codeId = project.data.getProject.projectCodeId;
          onConnect(pid.toString(), codeId.toString());
          return project.data;
        } else {
          throw new Error("fail to get project");
        }
      }
    };
    fetchProject();
    // console.log("pid: ", pid);
  }, [pid]);

  return (
    <div>
      <CodeControlBar
        height="10vh"
        width="100vw"
        title={project?.projectName ?? "Untitled Project"}
      />
      <CodeBlock
        updateCodeFromSocket={codeBlock}
        language="python"
        width="100vw"
        height="90vh"
        connectionId={connectionId}
        id={project?.projectCodeId}
        users={users}
        updateCode={(code: string, userLocation: any) =>
          updateCode(code, userLocation)
        }
      />
    </div>
  );
}
