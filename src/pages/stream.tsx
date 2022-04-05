import { Fragment, useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, UsersIcon } from "@heroicons/react/solid"
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


function Stream({  setPeerId }: streamInterface) {
  let user = [{userName:"ryan",peerId:"52276eea-654f-4845-8d92-24dcf08c0ce6",lineNumber:null, column: null }]
  console.log("Run Script");
  // const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const remoteVideoRef = useRef([]);
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

  function displayChanging(peerId:string){
    
      call(peerId);

  }

  return (
    <div className="grid grid-cols-3 grid-row-3 gap-4">
      <div className="col-span-2 row-span-3 content-center">
        CODING BLOCKING
      </div>
      <div className="col-start-3 row-start-1 col-span-1 row-span-1 gap-4 justify-center content-center">
      <input
        type="PeerID" 
        className="bg-blue-200 opacity-50 border-2 border-slate-900 "
        value={remotePeerIdValue}
        onChange={(e) => setRemotePeerIdValue(e.target.value)}
      />
      <button onClick={() => call(remotePeerIdValue)} className="bg-slate-900 text-white opacity-70 box-content h32 w32">Call</button>
      <div>
        <video className="h-42 w-42" ref={currentUserVideoRef} />
      </div>
      <div>
        <video ref={remoteVideoRef} />
      </div>
      </div>
      <div className="col-start-3 row-start-2 col-span-1 row-span-2 gap-4 justify-center content-center">
        DOCUMENT BLOCK
      </div>
    <div className="w-56 text-right fixed top-16">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            User
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {/* {/* <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    
                    Ryan
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    
                    Samuel
                  </button>
                )} */}
              {/* </Menu.Item> */}


              {user.map((value, key) => {
                if (!value.peerId) return null;

                return (
                  <Menu.Item>
                    {({ active }) => (
                  <button
                    className="hover:bg-violet-500 hover:text-white text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                    // 
                    onClick={() => displayChanging(value.peerId)}>
                      
                    {value.userName}
                    
                    </button>
                )}
                  </Menu.Item>
                )
              })}

              
              {/* <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    
                   King
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}  
                  >
                    
                    Kim
                  </button>
                )}
              </Menu.Item> */} 
            </div>
            
          </Menu.Items>
        </Transition>
      </Menu>
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

