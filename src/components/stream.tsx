import { Fragment, useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  UsersIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";

interface CodeLocation {
  lineNumber: number;
  column: number;
}
interface UserData {
  userName: string;
  codeLocation: CodeLocation;
  peerId: string;
}
interface streamInterface {
  width: string;
  height: string;
  user: UserData[];
  setPeerId: (id: string | null) => void;
  refFromParent: any;
}

function Stream({
  setPeerId,
  width,
  height,
  user,
  refFromParent,
}: streamInterface) {
  console.log("Run Script");
  // const [peerId, setPeerId] = useState('');
  console.log("stream user: ", user);
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [userPid, setUserPid] = useState("");
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState({});
  const [selectedPid, setSelectedPid] = useState("");
  const [numOfConnection, setNumOfConnection] = useState(0);
  const remoteVideoRef = useRef([]);
  const remoteAudioRef = useRef([]);
  remoteAudioRef.current = [];
  const [remoteUserPid, setRemoteUserPid] = useState({}); // {pid: stream}
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  var myVideo: any = undefined;
  useEffect(() => {
    refFromParent.current = {
      call: call,
    };
    console.log("audio ref: ", remoteAudioRef.current);
    import("peerjs").then(({ default: Peer }) => {
      const peer = new Peer();
      if (userPid === "") {
        peer.on("open", (id) => {
          if (userPid === "") {
            console.log("set user pid", userPid);
            setUserPid(id);
            console.log("user id: ", id);
          }
        });
        peerInstance.current = peer;
      }
    });
  }, []);

  function leaveStream() {
    setIsJoined(false);
    localStream?.getAudioTracks()[0].stop();
    localStream?.getVideoTracks()[0].stop();
    if (selectedPid === userPid) {
      currentUserVideoRef.current.srcObject = null;
    } else {
      console.log("selectedPid: ", selectedPid);
      console.log("userPid: ", userPid);
    }
    setPeerId(null);
  }

  function joinStream() {
    setIsJoined(true);
    console.log("audio ref: ", remoteAudioRef.current);
    import("peerjs").then(({ default: Peer }) => {
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          var getUserMedia =
            navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

          if (!getUserMedia) {
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }

          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          if (!currentUserVideoRef.current) return;
          setLocalStream(mediaStream);
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();

          setPeerId(userPid);
          setSelectedPid(userPid);

          peerInstance.current.on("call", (call) => {
            console.log("call");
            call.answer(mediaStream);
          });
        });
    });
  }

  const createMediaStreamFake = () => {
    return new MediaStream([
      createEmptyAudioTrack(),
      createEmptyVideoTrack({ width: 640, height: 480 }),
    ]);
  };

  const createEmptyAudioTrack = () => {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    const track = dst.stream.getAudioTracks()[0];
    return Object.assign(track, { enabled: false });
  };

  const createEmptyVideoTrack = ({ width, height }) => {
    const canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });
    canvas.getContext("2d").fillRect(0, 0, width, height);

    const stream = canvas.captureStream();
    const track = stream.getVideoTracks()[0];

    return Object.assign(track, { enabled: false });
  };

  const call = (remotePeerId: string) => {
    if (remotePeerId === userPid || remoteAudioRef.current.length === 0) return;
    console.log("calling new user checked");
    var call = peerInstance.current.call(
      remotePeerId,
      localStream ? localStream : createMediaStreamFake()
    );
    console.log(call);
    call.on("stream", (remoteStream) => {
      if (remoteAudioRef.current.length == 0) return;
      console.log(remoteAudioRef.current);
      remoteAudioRef.current[numOfConnection].src = [remoteStream];
      // remoteAudioRef.current[numOfConnection].play();
      setNumOfConnection((numOfConnection) => numOfConnection + 1);
      console.log("calling new user, stream: ", remoteStream);
      // let temp = remoteUserPid;
      setRemoteUserPid((temp) => {
        temp[remotePeerId] = remoteStream;
        console.log("calling new user, temp: ", temp);
        return temp;
      });
    });
    console.log("done");
  };

  function displayChanging(peerId: string) {
    if (selectedPid === peerId) return;
    console.log("displayChanging: ", peerId);
    console.log("remoteUserPid: ", Object.keys(remoteUserPid));
    console.log("target: ", remoteUserPid[peerId]);
    setSelectedPid(peerId);
    currentUserVideoRef.current.srcObject = remoteUserPid[peerId];
    currentUserVideoRef.current.play();
  }
  let numOfUser = 0;

  function addToAudioRef(el: any) {
    if (el && !remoteAudioRef.current.includes(el)) {
      console.log("add to audio ref: ", el);
      remoteAudioRef.current.push(el);
    }
  }

  return (
    // <div className="col-start-3 row-start-1 col-span-1 row-span-1 gap-4 justify-end content-end">
    <div>
      <div>
        <div className="box-content h-48 justify-end" style={{ width }}>
          {user.map((user, key) => {
            return (
              <audio
                ref={addToAudioRef}
                key={key}
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  // zIndex: "1",
                  width: "1px",
                }}
                controls
              />
            );
          })}
          <video
            muted
            className="object-cover"
            ref={currentUserVideoRef}
            style={{ width, height, zIndex: 3 }}
          />
          {console.log("currentUserVideoRef", currentUserVideoRef)}
          {currentUserVideoRef.current?.srcObject ? null : (
            <div
              style={{ height, width, position: "absolute", top: "0px" }}
              className="bg-slate-500 grid place-items-center"
            >
              <VideoCameraIcon className="w-16 text-gray-100" />
            </div>
          )}
        </div>
        <div></div>
      </div>

      <div
        className="flex absolute top-0 justify-between pt-2 px-2"
        style={{ width }}
      >
        {isJoined ? (
          <button
            onClick={() => leaveStream()}
            className="bg-rose-600 text-white box-content px-5 py-2 rounded-xl text-base transition ease-in-out hover:bg-rose-500 bg-opacity-90"
          >
            Leave
          </button>
        ) : (
          <button
            onClick={() => joinStream()}
            className="bg-emerald-600 text-white box-content px-5 py-2 rounded-xl text-base transition ease-in-out hover:bg-emerald-500 bg-opacity-90"
          >
            Join
          </button>
        )}
        <div>
          <Menu as="div" className="">
            <div>
              <Menu.Button className="transition ease-in-out hover:bg-gray-600 grid place-items-center px-5 py-2 text-base font-medium text-white bg-gray-900 rounded-md bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 z-10">
                <div className="flex items-center">
                  User
                  <ChevronDownIcon
                    className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                    aria-hidden="true"
                  />
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100 z-10"
              enterFrom="transform opacity-0 scale-95 z-10"
              enterTo="transform opacity-100 scale-100 z-10"
              leave="transition ease-in duration-75 z-10"
              leaveFrom="transform opacity-100 scale-100 z-10"
              leaveTo="transform opacity-0 scale-95 z-10"
            >
              <Menu.Items className="absolute right-0 mr-2 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 z-10">
                  {user.map((value, key) => {
                    if (!value.peerId) return null;
                    numOfUser++;
                    return (
                      <Menu.Item key={key}>
                        {({ active }) => {
                          if (value.peerId === selectedPid) {
                            return (
                              <button
                                style={{ zIndex: 20 }}
                                className="transition ease-in-out rounded z-10 bg-green-200 text-gray-900 group flex items-center px-2 py-2 text-sm z-10 w-full"
                              >
                                {value.userName}
                              </button>
                            );
                          } else {
                            return (
                              <button
                                style={{ zIndex: 20 }}
                                className="transition ease-in-out rounded z-10 bg-white hover:bg-violet-500 hover:text-white text-gray-900 group flex items-center px-2 py-2 text-sm z-10 w-full"
                                //
                                onClick={() => displayChanging(value.peerId)}
                              >
                                {value.userName}
                              </button>
                            );
                          }
                        }}
                      </Menu.Item>
                    );
                  })}
                  {numOfUser === 0 ? (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          style={{ zIndex: 20 }}
                          className="transition ease-in-out rounded z-10 bg-white text-gray-900 group flex items-center px-2 py-2 text-sm z-10 w-full bg-gray-200"
                          disabled
                        >
                          No User Joined
                        </button>
                      )}
                    </Menu.Item>
                  ) : null}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Stream;

function App() {
  return <div>test</div>;
}
function displayChanging(): void {
  throw new Error("Function not implemented.");
}
