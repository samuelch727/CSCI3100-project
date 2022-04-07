import { useEffect, useState } from "react";

interface CIOInterface {
  height: string;
  width: string;
  refFromParent: any;
  outPut: string;
}

export default function CodeInputOutput({
  height,
  width,
  refFromParent,
  outPut,
}: CIOInterface) {
  const [input, setInput] = useState("");
  const [expectOut, setExpectOut] = useState("");
  const [outPutState, setOutPut] = useState(outPut);
  const [correctAns, setCorrectAns] = useState(0);
  useEffect(() => {
    refFromParent.current = {
      inputValue: input,
      expectOutValue: expectOut,
      setOutPut: updateOutput,
    };
  });
  function updateOutput(out: string) {
    console.log(out);
    setOutPut(() => out);
  }
  return (
    <div style={{ height, width }} className="flex flex-row">
      <div
        className="basis-1/3 h-14 flex bg-gray-50 p-2 flex-col"
        style={{ height }}
      >
        Input:
        <textarea
          onChange={(e) => {
            setInput(e.target.value);
            console.log(e.target.value);
          }}
          rows={4}
          style={{ resize: "none" }}
          className="grow border-slate-300 border rounded p-1"
        ></textarea>
      </div>
      <div
        className="basis-1/3 h-14 flex bg-gray-50 p-2 flex-col"
        style={{ height }}
      >
        Expected output:
        <textarea
          onChange={(e) => {
            setExpectOut(e.target.value);
            console.log(e.target.value);
          }}
          rows={4}
          style={{ resize: "none" }}
          className="grow border-slate-300 border rounded p-1"
        ></textarea>
      </div>
      <div
        className="basis-1/3 h-14 flex bg-gray-50 p-2 flex-col"
        style={{ height }}
      >
        Output:
        <textarea
          rows={4}
          style={{ resize: "none" }}
          className={
            expectOut === "" || outPutState === ""
              ? "border-slate-300 border rounded p-1 grow"
              : outPutState === expectOut.toString().concat("\n")
              ? "border-slate-300 border rounded p-1 grow bg-green-200"
              : "border-slate-300 border rounded p-1 grow bg-red-200"
          }
          disabled
          defaultValue={outPutState}
        >
          {console.log(
            "UI: ",
            outPutState === expectOut.toString().concat("\n")
          )}
          {/* {outPutState.toString()} */}
        </textarea>
      </div>
    </div>
  );
}
