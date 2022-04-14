import CodeBlock from "../../components/CodeBlock";
import { useRouter } from "next/router";
import CodeControlBar from "../../components/CodeControlBar";
import { API, graphqlOperation } from "aws-amplify";
import { getProject, listUsers } from "../../graphql/queries";
import { updateProject } from "../../graphql/mutations";
import { Project, User } from "../../API";
import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
  useLayoutEffect,
} from "react";
import { Auth } from "aws-amplify";
import { diff_match_patch } from "../../functions/diff_match_patch_uncompressed";
import { v4 as uuidv4 } from "uuid";
import CodeInputOutput from "../../components/CodeInputOutput";
import awsconfig from "../../aws-exports";
import stream from "../../components/stream";
import Stream from "../../components/stream";
import Chat from "../../components/Chat";

interface CodeLocation {
  lineNumber: number;
  column: number;
}
interface UserData {
  userName: string;
  codeLocation: CodeLocation;
  peerId: string;
}

interface chatData {
  name: string;
  message: string;
  id: string;
}

export default function Code() {
  API.configure(awsconfig);
  const socket = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [avaUser, setAvaUser] = useState([]);
  const [tabSelected, setTabSelected] = useState(1);
  const [chatHeight, setChatHeight] = useState(0);
  const [tabBarHeight, setTabBarHeight] = useState(0);
  const [chatData, setChatData] = useState<chatData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [sourceCode, setSourceCode] = useState("This\nis\na\ntest");
  const codeBlock = useRef(null);
  const codeBar = useRef(null);
  const [videoHeight, setVideoHeight] = useState(0);
  let lastSentCode = "";
  let sentUUId = "";
  // let outPut = "";
  const [connectionId, setConnectionId] = useState("");
  const originalText = "This\nis\na\ntest";
  const router = useRouter();
  const { pid } = router.query;
  const [project, setProject] = useState<Project>();
  const [outPut, setOutPut] = useState("");
  const CIORef = useRef(null);
  const StreamRef = useRef(null);
  // const TabRef = useRef(null);
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
              roomId: pid,
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
  //@ts-ignore
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
      //@ts-ignore
      codeBlock.current.updateSourceCode(null, data.initCode);
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
        //@ts-ignore
        codeBlock.current.updateSourceCode(data.sourceCode);
      }
    }
    if (data.disconnectId) {
      //@ts-ignore
      StreamRef.current.disconnect(data.disconnectId);
    }
    if (data.callId) {
      //@ts-ignore
      StreamRef.current.call(data.callId);
    }
    if (data.running != null) {
      //@ts-ignore
      codeBar.current.setIsRunning(data.running);
    }
    if (data.result) {
      //@ts-ignore
      CIORef.current.setOutPut(data.result);
    }
    if (data.chat) {
      setChatData(data.chat);
    }
    if (data.updateProject) {
      fetchProject();
    }
  }, []);

  const onConnect = useCallback((pid: string, codeId: string) => {
    if (socket.current?.readyState !== WebSocket.OPEN) {
      socket.current = new WebSocket(socketUrl);
      console.log(socket.current);
      //@ts-ignore
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
  //@ts-ignore
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
  //@ts-ignore
  function throttle(cb, delay = 1000) {
    let shouldWait = false;
    let originalCode = "";
    let init = false;
    //@ts-ignore
    let waitingArgs;
    const timeoutFunc = () => {
      //@ts-ignore
      if (waitingArgs == null) {
        shouldWait = false;
      } else {
        // console.log("waitingArgs: ", waitingArgs);
        //@ts-ignore
        cb(waitingArgs[0], waitingArgs[1]);
        //@ts-ignore
        originalCode = waitingArgs[0];
        waitingArgs = null;
        setTimeout(timeoutFunc, delay);
      }
    };
    //@ts-ignore
    return (...args) => {
      console.log("trottle, should wait? ", shouldWait);
      if (shouldWait) {
        waitingArgs = args;
        console.log("throttle waiting, waiting args: ", waitingArgs);
        return;
      } else {
        waitingArgs = args;
      }
      if (!init) {
        originalCode = args[1];
        init = true;
      }
      shouldWait = true;

      setTimeout(timeoutFunc, delay);
    };
  }

  async function runCode() {
    console.log("run click");
    //@ts-ignore
    codeBar.current.setIsRunning(true);
    socket.current?.send(
      JSON.stringify({
        action: "sendCodeResult",
        running: true,
      })
    );
    API.post("restapi", "/compile", {
      body: {
        //@ts-ignore
        code: codeBlock.current.sourceCode,
        language: project?.language,
        input:
          //@ts-ignore
          CIORef.current.inputValue === "" ? "\n" : CIORef.current.inputValue,
        expected: "",
      },
    })
      .then((res) => {
        socket.current?.send(
          JSON.stringify({
            action: "sendCodeResult",
            running: false,
            result: res.output === "" ? res.status : res.output,
          })
        );
        //@ts-ignore
        CIORef.current.setOutPut(res.output === "" ? res.status : res.output);
        setOutPut(res.output);
        console.log(res);
        //@ts-ignore
        codeBar.current.setIsRunning(false);
      })
      .catch((err) => {
        socket.current?.send(
          JSON.stringify({
            action: "sendCodeResult",
            running: false,
          })
        );
        console.log("error when running code");
        console.log(err.response.data);
        //@ts-ignore
        codeBar.current.setIsRunning(false);
      });
  }

  function setPeerId(pid: string | null) {
    socket.current?.send(
      JSON.stringify({
        action: "sendVideoStream",
        peerId: pid,
      })
    );
  }

  function disconnectStream(pid: string) {
    console.log("send disconnect signal");
    socket.current?.send(
      JSON.stringify({
        action: "disconnectStream",
        peerId: pid,
      })
    );
  }

  function sendChat(message: string) {
    console.log("send message: ", message);
    socket.current?.send(
      JSON.stringify({
        action: "sendChat",
        message: message,
      })
    );
  }

  useLayoutEffect(() => {
    setVideoHeight(((window.innerWidth * 0.2) / 4) * 3);
    setChatHeight(
      window.innerHeight - ((window.innerWidth * 0.2) / 4) * 3 - tabBarHeight
    );
    console.log(
      "chat height: ",
      window.innerHeight - ((window.innerWidth * 0.2) / 4) * 3 - tabBarHeight
    );
    function resizeWindow() {
      console.log("height:", window.innerHeight);
      setVideoHeight(((window.innerWidth * 0.2) / 4) * 3);
      setChatHeight(
        window.innerWidth - ((window.innerWidth * 0.2) / 4) * 3 - tabBarHeight
      );
    }
    window.addEventListener("resize", resizeWindow);
  });

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
      //@ts-ignore
      if (project.data.getProject) {
        //@ts-ignore
        setProject(project.data.getProject);
        //@ts-ignore
        console.log(project.data.getProject);
        //@ts-ignore
        let codeId = project.data.getProject.projectCodeId;
        // TODO: activate
        onConnect(pid.toString(), codeId.toString());
        return project.data;
      } else {
        console.log("fail to load project");
      }
    }
  };
  useEffect(() => {
    fetchProject();
    // console.log("pid: ", pid);
  }, [pid]);

  const updateShareList = async (list: string[]) => {
    const projectDetail = {
      id: project?.id,
      shareTo: list,
    };
    const updatedProject = await API.graphql(
      graphqlOperation(updateProject, { input: projectDetail })
    );
    console.log("updated project: ", updatedProject);
    //@ts-ignore
    setProject(updatedProject.data.updateProject);
    socket.current?.send(
      JSON.stringify({
        action: "updateShare",
      })
    );
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await Auth.currentAuthenticatedUser();
      // console.log(user.username);
      console.log("fetching user");
      const users = await API.graphql(
        graphqlOperation(`
        query ListUsers(
          $filter: ModelUserFilterInput
          $limit: Int
          $nextToken: String
        ) {
          listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
              username
            }
            nextToken
          }
        }
      `)
      );
      //@ts-ignore
      console.log("Users fetched: ", users.data.listUsers.items);
      //@ts-ignore
      setAvaUser(users.data.listUsers.items);
      // console.log("Users fetched: ", project.error);
      console.log("fetch user complete");
    };
    fetchUser();
  }, []);

  // const;

  const TabRef = useCallback((e) => {
    if (!e) return;
    console.log("tabRef: ", e.clientHeight);
    setTabBarHeight(e.clientHeight);
  }, []);

  return (
    <div className="flex h-screen">
      <div className="h-screen">
        <CodeControlBar
          height="6vh"
          width="75vw"
          title={project?.projectName ?? "Untitled Project"}
          disableRun={project?.language ? false : true}
          runCode={runCode}
          refFromParent={codeBar}
          users={users}
          userList={avaUser}
          sharedWith={project?.shareTo ?? []}
          owner={project?.owner ?? ""}
          //@ts-ignore
          updateShareList={updateShareList}
        />
        {project?.language ? (
          <CodeBlock
            updateCodeFromSocket={codeBlock}
            language={project?.language.toString().toLowerCase() ?? ""}
            width="75vw"
            height="74vh"
            connectionId={connectionId}
            id={project?.projectCodeId}
            //@ts-ignore
            users={users}
            //@ts-ignore
            updateCode={(code: string, userLocation: any) =>
              updateCode(code, userLocation)
            }
          />
        ) : (
          <div style={{ height: "74vh" }}></div>
        )}
        <CodeInputOutput
          width="75vw"
          height="20vh"
          refFromParent={CIORef}
          outPut={outPut}
        />
      </div>
      <div className="flex-col">
        <Stream
          refFromParent={StreamRef}
          width="25vw"
          height={videoHeight.toString().concat("px")}
          setPeerId={setPeerId}
          user={users}
          disPeerId={disconnectStream}
          heightValue={videoHeight}
        />
        <div
          className="flex"
          style={{
            marginTop: videoHeight.toString().concat("px"),
            position: "absolute",
            top: 0,
            width: "25vw",
          }}
          ref={TabRef}
        >
          {/* <button
            className={
              tabSelected !== 0
                ? "bg-gray-300 basis-1/2 grid justify-items-center py-1 hover:bg-gray-200 transition duration-300 ease-in-out"
                : "bg-gray-50 basis-1/2 grid justify-items-center py-1"
            }
            onClick={() => setTabSelected(0)}
          >
            Document
          </button> */}
          <button
            className={
              tabSelected !== 1
                ? "bg-gray-300 grow grid justify-items-center py-1 hover:bg-gray-200 transition duration-300 ease-in-out"
                : "bg-gray-50 grow grid justify-items-center py-1"
            }
            onClick={() => setTabSelected(1)}
          >
            Chat
          </button>
        </div>
        <Chat
          height={chatHeight.toString().concat("px")}
          width="25vw"
          data={chatData}
          connectionId={connectionId}
          sendMessage={sendChat}
        />
        {/* <Document height={chatHeight.toString().concat("px")} width="25vw" /> */}
      </div>
    </div>
  );
}
