import Editor, { useMonaco } from "@monaco-editor/react";
import React, { useRef, useEffect, useState, useImperativeHandle } from "react";
import {API, graphqlOperation} from "aws-amplify";
import {getCode} from "../graphql/queries";
import {Code} from "../API";
import {Auth} from "aws-amplify";
import {updateCode} from "../graphql/mutations";
import {onCreateCode} from "../graphql/subscriptions";
import {Observable} from "../../node_modules/zen-observable-ts";
import {diff_match_patch} from "../functions/diff_match_patch_uncompressed";

interface CodeBlockProps {
  language: string;
  updateCode: (code: string) => void;
  updateCodeFromSocket: any;
  defaultValue?: string;
  id: string | undefined | null;
  width: string;
  height: string;
  connectionId: string;
  users: [
    {
      userName: string;
      codeLocation: CodeLocation;
      peerId: string;
      id: string;
    }
  ]
}

interface UserData 
  {
    userName: string;
    codeLocation: CodeLocation;
    peerId: string;
  }


interface CodeLocation {
  lineNumber: number;
  column: number;
}

export default function CodeBlock({
  language,
  defaultValue,
  width,
  height,
  id,
  users,
  updateCode,
  updateCodeFromSocket,
  connectionId
}: CodeBlockProps) {
  const monaco = useMonaco();
  const editorRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [sourceCode, setSourceCode] = useState("");
  // const [code, setCode] = useState<Code>();
  const [subscription, setSubscription] = useState<any>();
  // let subscription = null;
  const dmp = new diff_match_patch();

  useEffect(() => {
    updateCodeFromSocket.current = {updateSourceCode: updateSourceCode, sourceCode: sourceCode};
  })

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
    setOtherUserTag();
  }

    function updateSourceCode(patch: string, code: string) {
      if (code) return setSourceCode(code);
      let patchResult = dmp.patch_apply(
        dmp.patch_fromText(patch),
        sourceCode
      );
      console.log("patch result: ", patchResult[0]);
      setSourceCode((code) => dmp.patch_apply(
        dmp.patch_fromText(patch),
        code
      )[0]);
    }


  function escapeHtml(str: string) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, '\"')
      .replace(/'/g, "\'");
  }

  var myContentWidget = {
    domNode: null,
    getId: () => "my.content.widget",
    getDomNode: function () {
      if (!this.domNode) {
        this.domNode = document.createElement("div");
        // const userName = await Auth.currentUserInfo();
        this.domNode.innerHTML =
          '<div class="bg-yellow-500 rounded-full px-2">' + "samuel" + '</div>';
        // this.domNode.style.background = "grey";
      }
      return this.domNode;
    },
    getPosition: function () {
      return {
        position: position,
        preference: [
          // monaco?.editor.ContentWidgetPositionPreference.EXACT,
          monaco?.editor.ContentWidgetPositionPreference.ABOVE,
          monaco?.editor.ContentWidgetPositionPreference.BELOW,
        ],
      };
    },
  };

  const demoData = []

  const[userContentWidget, setUserContentWidget] = useState<any>([]);

  function setOtherUserTag() {
    userContentWidget.forEach((element) => {
      editorRef.current?.removeContentWidget(element);
    })
    setUserContentWidget([]);
    users.forEach((element, index) => {
      if (!element?.codeLocation || element?.id.toString() === connectionId) return;
      console.log("element id: ", element?.id, " self id: ", connectionId);
      const tempElement = {
        domNode: null,
        getId: () => index,
        getDomNode: function () {
          if (!this.domNode) {
            this.domNode = document.createElement("div");
            // const userName = await Auth.currentUserInfo();
            this.domNode.innerHTML =
              '<div class="bg-yellow-500 rounded-full px-2">' + element.userName + '</div>';
            // this.domNode.style.background = "grey";
          }
          return this.domNode;
        },
        getPosition: function () {
          return {
            position: {
              lineNumber: element.codeLocation.lineNumber,
              column: element.codeLocation.column,
            },
            preference: [
              // monaco?.editor.ContentWidgetPositionPreference.EXACT,
              monaco?.editor.ContentWidgetPositionPreference.ABOVE,
              monaco?.editor.ContentWidgetPositionPreference.BELOW,
            ],
          };
        },
      }
      editorRef.current?.addContentWidget(tempElement);
      setUserContentWidget((prevState) => [...prevState, tempElement]);
    })
  }


  return (
    <div className="text-lg">
      <Editor
        height={height}
        width={width}
        defaultLanguage={language}
        value={sourceCode}
        options={{ fontSize: 16 }}
        onChange={(e) => {
          setPosition(editorRef?.current?.getPosition());
          editorRef?.current?.removeContentWidget(myContentWidget);
          editorRef?.current?.addContentWidget(myContentWidget);
          setSourceCode(escapeHtml(e));
          setOtherUserTag();
          updateCode(escapeHtml(e), editorRef?.current?.getPosition());
        }}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}
