import {
  ChevronDownIcon,
  PlayIcon,
  HomeIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { useEffect, useState, Fragment } from "react";
import { TrashIcon, PlusIcon } from "@heroicons/react/outline";
import { Popover, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

interface CodeLocation {
  lineNumber: number;
  column: number;
}
interface UserData {
  userName: string;
  codeLocation: CodeLocation;
  peerId: string;
}

interface CodeBlockProps {
  title: string;
  width: string;
  height: string;
  disableRun: boolean;
  refFromParent: any;
  runCode: () => void;
  users: UserData[];
  userList: any[];
  owner: string;
  sharedWith: any;
  updateShareList: () => void;
}

const userColors = [
  " bg-red-100 border-red-700 text-red-900",
  " bg-orange-100 border-orange-700 text-orange-900",
  " bg-green-100 border-green-700 text-green-900",
  " bg-emerald-100 border-emerald-700 text-emerald-900",
  " bg-cyan-100 border-cyan-700 text-cyan-900",
  " bg-sky-100 border-sky-700 text-sky-900",
  " bg-indigo-100 border-indigo-700 text-indigo-900",
  " bg-purple-100 border-purple-700 text-purple-900",
  " bg-fuchsia-100 border-fuchsia-700 text-fuchsia-900",
  " bg-rose-100 border-rose-700 text-rose-900",
];

export default function CodeControlBar({
  title,
  height,
  width,
  runCode,
  refFromParent,
  users,
  userList,
  owner,
  sharedWith,
  updateShareList,
}: CodeBlockProps) {
  // const userList = [
  //   { username: "samuel" },
  //   { username: "ryan" },
  //   { username: "kim" },
  //   { username: "kingsley" },
  //   { username: "sarah" },
  // ];

  // const sharedWith = ["samuel", "ryan"];

  const [isRunning, setIsRunning] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [updatingShare, setUpdatingShare] = useState(false);
  const router = useRouter();
  useEffect(() => {
    refFromParent.current = {
      setIsRunning: setIsRunning,
    };
  }, []);
  function setRunState(state: boolean) {
    console.log(state);
    setIsRunning(state);
  }

  function addShareUser(index: number) {
    setUpdatingShare(true);
    const newList = sharedWith;
    newList.push(userList[index].username);
    updateShareList(newList);
    userList.splice(index, 1);
    console.log(newList);
    setUpdatingShare(false);
  }

  function removeShareUser(index: number) {
    setUpdatingShare(true);
    const newList = sharedWith;
    newList.splice(index, 1);
    updateShareList(newList);
    console.log(newList);
    setUpdatingShare(false);
  }
  return (
    <div
      style={{ width, height }}
      className="flex flex-row content-center px-3 bg-gray-100 justify-between items-center"
    >
      <div className="flex items-center">
        <button
          className="w-8 mr-4 rounded bg-gray-300 hover:bg-black transition ease-in-out duration-300"
          onClick={() => {
            router.push("/home");
          }}
        >
          <HomeIcon className="w-8 h-8 text-gray-700 rounded p-1 hover:text-white" />
        </button>
        <div className="">{title}</div>
        <div className="ml-3 flex">
          {users.map((value, key) => {
            return (
              <div
                className={"h-7 w-7 rounded-full text-center grid content-center mx-1 border-2 select-none".concat(
                  userColors[key % userColors.length]
                )}
              >
                {value.userName[0].toUpperCase()}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center">
        <div className="">
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`
                ${open ? "" : "text-opacity-90"}
                text-white group bg-sky-500 px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span>Share</span>
                  <ChevronDownIcon
                    className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-sky-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                    aria-hidden="true"
                  />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 w-fit px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 max-w-xs">
                    <div
                      className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 w-[20vw] bg-white min-w-fit"
                      // style={{ width: "20vw" }}
                    >
                      <div className="relative grid gap-6 bg-white p-4 subpixel-antialiased w-full">
                        {/* Sharing With: */}
                        <div className="flex">
                          <input
                            placeholder="Invite a friend"
                            className="p-1 px-2 bg-gray-100 rounded-tl-lg rounded-bl-lg grow"
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                          />
                          <button className="w-10 h-10 bg-sky-900 rounded-tr-lg rounded-br-lg grid place-content-center hover:shadow-lg transition ease-in-out duration-300">
                            <SearchIcon className="w-7 h-7 text-gray-100" />
                          </button>
                        </div>
                        {searchInput !== "" ? (
                          <ul className="divide-y divide-slate-200 text-lg text-gray-800">
                            {userList.map((value, key) => {
                              if (sharedWith.includes(value.username)) {
                                return null;
                              }
                              if (value.username.includes(searchInput))
                                return (
                                  <li
                                    className="py-4 flex first:pt-0 last:pb-0 items-center justify-between px-1"
                                    key={key}
                                  >
                                    {value.username}
                                    <button
                                      className="bg-green-100 rounded p-1 hover:shadow transition ease-in-out duration-300"
                                      onClick={() => {
                                        setUpdatingShare(true);
                                        addShareUser(key);
                                      }}
                                      disabled={updatingShare}
                                    >
                                      <PlusIcon className="h-6 text-green-900" />
                                    </button>
                                  </li>
                                );
                            })}
                          </ul>
                        ) : null}
                      </div>
                      <div className="relative grid gap-6 p-4 subpixel-antialiased w-full bg-gray-100 text-xl text-gray-600 select-none">
                        Shared with
                        <ul className="divide-y divide-slate-200 text-lg text-gray-800">
                          <li className="py-4 flex first:pt-0 last:pb-0 items-center justify-between px-1">
                            {owner}
                            <div className="px-3 text-sm text-gray-500">
                              owner
                            </div>
                          </li>
                          {sharedWith.map((value, key) => {
                            return (
                              <li
                                className="py-4 flex first:pt-0 last:pb-0 items-center justify-between px-1"
                                key={key}
                              >
                                {value}
                                <button
                                  className="bg-rose-100 rounded p-1 hover:shadow transition ease-in-out duration-300"
                                  onClick={() => {
                                    setUpdatingShare(true);
                                    removeShareUser(key);
                                  }}
                                  disabled={updatingShare}
                                >
                                  <TrashIcon className="h-6 text-rose-900" />
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
        <button
          className="m-2 px-3 py-2 bg-pink-600 rounded text-slate-100 hover:drop-shadow-lg select-none disabled:bg-gray-400"
          onClick={() => runCode()}
          disabled={isRunning}
        >
          {isRunning ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <>Run</>
          )}
        </button>
      </div>
    </div>
  );
}
