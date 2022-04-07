import { PlayIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

interface CodeBlockProps {
  title: string;
  width: string;
  height: string;
  disableRun: boolean;
  refFromParent: any;
  runCode: () => void;
  users: [
    {
      userName: string;
      codeLocation: CodeLocation;
      peerId: string;
      id: string;
    }
  ];
}

interface CodeLocation {
  lineNumber: number;
  column: number;
}

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
  });
  function setRunState(state: boolean) {
    console.log(state);
    setIsRunning(state);
  }
  return (
    <div
      style={{ width }}
      className="flex flex-row content-center px-3 bg-gray-100 justify-between"
    >
      <div className="flex">
        <div className="grid content-center">{title}</div>
        <div className="h-5 w-5"></div>
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
