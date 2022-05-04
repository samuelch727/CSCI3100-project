// 願有一天，自由如雨。
/**
 * @description Chat component which renders a chat box
 * @author Samuel Chan Sze Nok
 * @version 1.0 (2022-04-29)
 *
 * INTERFACE chatData
 * INTERFACE chatInterface
 * FUNCTION Chat(props: chatData)
 */
import { useState } from "react";

interface chatData {
  name: string;
  message: string;
  id: string;
}

interface chatInterface {
  data: chatData[];
  height: string;
  width: string;
  connectionId: string;
  sendMessage: (message: string) => void;
}

/**
 *
 * @param {string} props.height - height of the chat box
 * @param {string} props.width - width of the chat box
 * @param {chatData} props.data - chat data
 * @param {string} props.connectionId - user's socket connection id
 *
 * @returns {JSX.Element} - Chat component
 */
export default function Chat({
  height,
  width,
  data,
  connectionId,
  sendMessage,
}: chatInterface) {
  //   let data = [
  //     { name: "Samuel", message: "Hello world", id: "1" },
  //     { name: "Samuel", message: "Hello world", id: "2" },
  //     { name: "Samuel", message: "Hello world", id: "2" },
  //     { name: "Samuel", message: "Hello world", id: "2" },
  //   ];
  //   let connectionId = "1";
  const [message, setMessage] = useState("");
  return (
    <div
      style={{
        position: "absolute",
        right: "0",
        bottom: "0",
        width,
        height,
        overflow: "scroll",
      }}
      className="bg-gray-50"
    >
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className={item.id === connectionId ? "grid justify-items-end" : ""}
          >
            <div
              className={
                item.id === connectionId
                  ? "rounded-lg py-2 bg-green-200 w-fit m-2 px-4"
                  : "rounded-lg py-2 bg-gray-200 w-fit m-2 px-4"
              }
            >
              <div
                className={
                  item.id === connectionId
                    ? "text-sm text-gray-800"
                    : "text-sm text-gray-600"
                }
              >
                {item.name}
              </div>
              {item.message}
            </div>
          </div>
        );
      })}
      <div className="h-20" />
      <div
        className="fixed bottom-0 bg-gray-200 flex p-2 pb-4"
        style={{ width }}
      >
        <input
          className="rounded grow px-1 py-2"
          value={message}
          onChange={(e) => {
            console.log(e.target.value);
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && message !== "") {
              sendMessage(message);
              setMessage("");
            }
          }}
        ></input>
        <button
          className="px-2 rounded bg-teal-700 ml-2"
          onClick={() => {
            if (message !== "") {
              sendMessage(message);
              setMessage("");
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#ffffff"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
