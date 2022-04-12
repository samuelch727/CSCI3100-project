import { Fragment, useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  UsersIcon,
  VideoCameraIcon,
  MicrophoneIcon,
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
  disPeerId: (id: string) => void;
  refFromParent: any;
  heightValue: number;
}

function Stream({
  setPeerId,
  disPeerId,
  width,
  height,
  user,
  refFromParent,
  heightValue,
}: streamInterface) {
  console.log("Run Script");
  // const [peerId, setPeerId] = useState('');
  console.log("stream user: ", user);
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [userPid, setUserPid] = useState("");
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState({});
  const [selectedPid, setSelectedPid] = useState("n/a");
  const [numOfConnection, setNumOfConnection] = useState(0);
  const [calledId, setClalledId] = useState([]);
  const remoteVideoRef = useRef([]);
  const remoteAudioRef = useRef([]);
  remoteAudioRef.current = [];
  const [remoteUserPid, setRemoteUserPid] = useState({}); // {pid: stream}
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoStop, setIsVideoStop] = useState(false);

  var myVideo: any = undefined;
  useEffect(() => {
    refFromParent.current = {
      call: call,
      disconnect: disconnect,
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
        //@ts-ignore
        peerInstance.current = peer;
      }
    });
  }, []);

  useEffect(() => {
    console.log("user: ", user);
    if (!currentUserVideoRef.current) {
      console.log("there are no video element render, skipping call");
      return;
    } else {
      user.map((user, index) => {
        console.log("calling ", user.userName, " with id: ", user.peerId);
        if (!user.peerId) {
          console.log("no pid, no call");
        } else call(user.peerId);
      });
    }
  }, [user]);

  function disconnect(pid: string) {
    console.log("remote user disconnected, pid: ", pid);
    let storageSelectedPid = localStorage.getItem("selectedPid");
    console.log("selected: ", storageSelectedPid);
    console.log("is currently selected? ", storageSelectedPid === pid);
    //@ts-ignore
    let index = calledId.indexOf(pid);
    setClalledId((temp) => {
      return temp.splice(index, 1);
    });
    if (storageSelectedPid === pid) {
      setSelectedPid("");
      //@ts-ignore
      currentUserVideoRef.current.srcObject = null;
    }
  }

  function leaveStream() {
    setIsJoined(false);
    localStream?.getAudioTracks()[0].stop();
    localStream?.getVideoTracks()[0].stop();
    if (selectedPid === userPid) {
      //@ts-ignore
      currentUserVideoRef.current.srcObject = null;
    }
    disPeerId(userPid);
  }

  function joinStream() {
    setIsJoined(true);
    console.log("audio ref: ", remoteAudioRef.current);
    import("peerjs").then(({ default: Peer }) => {
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          //@ts-ignore
          var getUserMedia =
            //@ts-ignore
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
          //@ts-ignore
          currentUserVideoRef.current.srcObject = mediaStream;
          //@ts-ignore
          currentUserVideoRef.current.play();

          setPeerId(userPid);
          setSelectedPid(userPid);
          //@ts-ignore
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
    //@ts-ignore
    const track = dst.stream.getAudioTracks()[0];
    return Object.assign(track, { enabled: false });
  };
  //@ts-ignore
  const createEmptyVideoTrack = ({ width, height }) => {
    const canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });
    //@ts-ignore
    canvas.getContext("2d").fillRect(0, 0, width, height);

    const stream = canvas.captureStream();
    const track = stream.getVideoTracks()[0];

    return Object.assign(track, { enabled: false });
  };

  const call = (remotePeerId: string) => {
    if (remotePeerId === userPid || remoteAudioRef.current.length === 0) return;
    //@ts-ignore
    if (calledId.includes(remotePeerId)) {
      console.log("already called this id");
      return;
    }
    console.log("calling new user checked");
    //@ts-ignore
    var call = peerInstance.current.call(
      remotePeerId,
      localStream ? localStream : createMediaStreamFake()
    );
    console.log(call);
    //@ts-ignore
    call.on("stream", (remoteStream) => {
      if (remoteAudioRef.current.length == 0) return;
      console.log(remoteAudioRef.current);
      //@ts-ignore
      remoteAudioRef.current[numOfConnection]?.srcObject = remoteStream;
      //@ts-ignore
      remoteAudioRef.current[numOfConnection]?.play();
      setNumOfConnection((numOfConnection) => numOfConnection + 1);
      console.log("calling new user, stream: ", remoteStream);
      // let temp = remoteUserPid;
      setRemoteUserPid((temp) => {
        //@ts-ignore
        temp[remotePeerId] = remoteStream;
        console.log("calling new user, temp: ", temp);
        return temp;
      });
    });
    console.log("done");
    setClalledId((temp) => {
      //@ts-ignore
      temp.push(remotePeerId);
      return temp;
    });
  };

  function displayChanging(peerId: string) {
    if (selectedPid === peerId) return;
    console.log("displayChanging: ", peerId);
    console.log("remoteUserPid: ", Object.keys(remoteUserPid));
    //@ts-ignore
    console.log("target: ", remoteUserPid[peerId]);
    setSelectedPid(peerId);
    localStorage.setItem("selectedPid", peerId);
    if (peerId === userPid) {
      //@ts-ignore
      currentUserVideoRef.current.srcObject = localStream;
      //@ts-ignore
      currentUserVideoRef.current.play();
    } else {
      //@ts-ignore
      currentUserVideoRef.current.srcObject = remoteUserPid[peerId];
      //@ts-ignore
      currentUserVideoRef.current.play();
    }
  }
  let numOfUser = 0;

  function muteAudio() {
    if (localStream) {
      localStream.getAudioTracks()[0].enabled = isMuted;
    }
    setIsMuted((temp) => !temp);
  }

  function stopVideo() {
    if (localStream) {
      localStream.getVideoTracks()[0].enabled = isVideoStop;
    }
    setIsVideoStop((temp) => !temp);
  }

  function addToAudioRef(el: any) {
    //@ts-ignore
    if (el && !remoteAudioRef.current.includes(el)) {
      console.log("add to audio ref: ", el);
      //@ts-ignore
      remoteAudioRef.current.push(el);
    }
  }

  return (
    // <div className="col-start-3 row-start-1 col-span-1 row-span-1 gap-4 justify-end content-end">
    <div className="relative">
      <div>
        <div className="box-content h-48 justify-end" style={{ width }}>
          {user.map((user, key) => {
            return (
              <video
                // autoPlay
                ref={addToAudioRef}
                key={key}
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  // zIndex: "1",
                  width: "1px",
                }}
                // controls
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
          {//@ts-ignore
          currentUserVideoRef.current?.srcObject ? null : (
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
      {isJoined ? (
        <div
          className="absolute left-0 p-2 mx-1 grid grid-cols-2 rounded-lg select-none"
          style={{ top: heightValue - 55 }}
        >
          <button onClick={() => stopVideo()}>
            <VideoCameraIcon
              className={
                isVideoStop
                  ? "w-9 text-white bg-rose-600 p-2 rounded-tl-lg rounded-bl-lg"
                  : "w-9 text-white bg-emerald-600 p-2 rounded-tl-lg rounded-bl-lg"
              }
            />
          </button>
          <button onClick={() => muteAudio()}>
            <MicrophoneIcon
              className={
                isMuted
                  ? "w-9 text-white bg-rose-600 p-2 rounded-tr-lg rounded-br-lg"
                  : "w-9 text-white bg-emerald-600 p-2 rounded-tr-lg rounded-br-lg"
              }
            />
          </button>
        </div>
      ) : null}
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
