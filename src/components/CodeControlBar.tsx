import { PlayIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { HomeIcon } from "@heroicons/react/solid";

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
}: CodeBlockProps) {
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    refFromParent.current = {
      setIsRunning: setIsRunning,
    };
  }, []);
  function setRunState(state: boolean) {
    console.log(state);
    setIsRunning(state);
  }
  return (
    <div
      style={{ width }}
      className="flex flex-row content-center px-3 bg-gray-100 justify-between items-center"
    >
      <div className="flex items-center">
        <button className="w-8 mr-4 rounded bg-gray-300 hover:bg-black transition ease-in-out duration-300">
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
      <button
        className="grid content-center m-2 p-3 bg-pink-600 rounded text-slate-100 hover:drop-shadow-lg select-none disabled:bg-gray-400"
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
  );
}
