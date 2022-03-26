import { PlayIcon } from "@heroicons/react/solid";

interface CodeBlockProps {
  title: string;
  width: string;
  height: string;
}

export default function CodeControlBar({
  title,
  height,
  width,
}: CodeBlockProps) {
  return (
    <div
      style={{ height, width }}
      className="flex flex-row content-center px-3 bg-gray-100 justify-between"
    >
      <div className="grid content-center">{title}</div>
      <button className="grid content-center m-2 p-3 bg-pink-600 rounded text-slate-100 hover:drop-shadow-lg select-none">
        Run
      </button>
    </div>
  );
}
