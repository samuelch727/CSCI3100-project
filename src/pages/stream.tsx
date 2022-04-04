import { useEffect, useRef, useState } from "react";
import { Menu } from "@headlessui/react";

interface streamInterface {
  user: [
    {
      userName: string;
      peerId: string;
      codeLocation: {
        lineNumber: number;
        column: number;
      };
    }
  ];
  setPeerId: (id: string) => {};
}

function Stream({ user, setPeerId }: streamInterface) {
  console.log("Run Script");
  // const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  var myVideo: any = undefined;
  useEffect(() => {
    import("peerjs").then(({ default: Peer }) => {
      if (!navigator) return;
      console.log("navigator ", navigator);

      const peer = new Peer();

      peer.on("open", (id: string) => {
        console.log(id);
        setPeerId(id);
      });

      peer.on("call", (call) => {
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
            var getUserMedia =
              navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            if (!getUserMedia) {
              return Promise.reject(
                new Error("getUserMedia is not implemented in this browser")
              );
            }

            return new Promise(function (resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject);
            });
          };
        }

        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((mediaStream) => {
            if (!currentUserVideoRef.current) return;
            if ("srcObject" in currentUserVideoRef.current) {
              currentUserVideoRef.current.srcObject = mediaStream;
              currentUserVideoRef.current.play();
              call.answer(mediaStream);
            } else {
              alert("unsupported browser version");
              return;
            }
            if (!remoteVideoRef.current) return;
            if ("srcObject" in remoteVideoRef.current) {
              call.on("stream", function (remoteStream) {
                if (!remoteVideoRef.current) return;
                remoteVideoRef.current.srcObject = remoteStream;
                remoteVideoRef.current.play();
              });
            }
          });
      });

      peerInstance?.current = peer;
    });
  }, [navigator]);

  const call = (remotePeerId: any) => {
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        var getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        if (!getUserMedia) {
          return Promise.reject(
            new Error("getUserMedia is not implemented in this browser")
          );
        }

        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        if (!currentUserVideoRef.current) return;
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();

        const call = peerInstance.current.call(remotePeerId, mediaStream);

        call.on("stream", (remoteStream: any) => {
          if (!remoteVideoRef.current) return;
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      });
  };

  return (
    <div className="">
      <input
        type="text"
        value={remotePeerIdValue}
        onChange={(e) => setRemotePeerIdValue(e.target.value)}
      />
      <div className="bg-gray-500">test</div>
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div>
        <video ref={currentUserVideoRef} />
      </div>
      <div>
        <video ref={remoteVideoRef} />
      </div>
        <Menu>
          <Menu.Button>More</Menu.Button>
          <Menu.Items>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && "bg-blue-500"}`}
                  href="/account-settings"
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className= "bg-blue-500"
                  href="/account-settings"
                >
                  Documentation
                </a>
              )}
            </Menu.Item>
            <Menu.Item disabled>
              <span className="opacity-75">Invite a friend (coming soon!)</span>
            </Menu.Item>
          </Menu.Items>
        </Menu>
    </div>
  );
}

export default Stream;

function App() {
  return <div>test</div>;
}
