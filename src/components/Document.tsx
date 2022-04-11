import { useCallback, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

interface documentInterface {
  height: string;
  width: string;
}

export default function Document({ height, width }: documentInterface) {
  //   const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [value, setValue] = useState("");
  const quillRef = useRef(null);

  useEffect(() => {
    if (!document) return;

    quillRef.innerHTML = "";
    const editor = document.createElement("div");
    //   .setAttribute("style", "height: 100%");
    quillRef.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    // q.disable();
    // q.setText("Loading...");
    setQuill(q);
  }, []);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null || !document) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    //   .setAttribute("style", "height: 100%");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    // q.disable();
    // q.setText("Loading...");
    setQuill(q);
  }, []);
  return (
    <div
      style={{ width, height, position: "absolute", right: "0", bottom: "0" }}
    >
      {document ? <div className="container" ref={quillRef}></div> : null}
    </div>
  );
}
