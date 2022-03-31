import Editor, { useMonaco } from "@monaco-editor/react";
import React, { useRef, useEffect, useState } from "react";

interface CodeBlockProps {
  language: string;
  defaultValue?: string;
  width: string;
  height: string;
}

export default function CodeBlock({
  language,
  defaultValue,
  width,
  height,
}: CodeBlockProps) {
  const monaco = useMonaco();
  const editorRef = useRef(null);
  const [position, setPosition] = useState(null);
  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  useEffect(() => {
    //@ts-ignore
    console.log(editorRef?.current?.getPosition());
  }, [editorRef?.current]);

  function escapeHtml(str: string) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, '\"')
      .replace(/'/g, "\'");
  }

  var contentWidget = {
    domNode: null,
    getId: () => "my.content.widget",
    getDomNode: function () {
      if (!this.domNode) {
        this.domNode = document.createElement("div");
        this.domNode.innerHTML =
          '<div class="bg-yellow-500 rounded-full px-2">On9_3100<div/>';
        // this.domNode.style.background = "grey";
      }
      return this.domNode;
    },
    getPosition: function () {
      return {
        position: position ?? {
          lineNumber: 10,
          column: 1,
        },
        preference: [
          // monaco?.editor.ContentWidgetPositionPreference.EXACT,
          monaco?.editor.ContentWidgetPositionPreference.ABOVE,
          monaco?.editor.ContentWidgetPositionPreference.BELOW,
        ],
      };
    },
  };

  return (
    <div className="text-lg">
      <Editor
        height={height}
        width={width}
        defaultLanguage={language}
        value={defaultValue}
        options={{ fontSize: 16 }}
        onChange={(e) => {
          setPosition(editorRef?.current?.getPosition());
          editorRef.current.removeContentWidget(contentWidget);
          editorRef.current.addContentWidget(contentWidget);
          console.log(escapeHtml(e));
        }}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}
