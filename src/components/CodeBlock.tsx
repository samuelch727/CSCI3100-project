import Editor from "@monaco-editor/react";

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
  function escapeHtml(str: string) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  return (
    <div className="text-lg">
      <Editor
        height={height}
        width={width}
        defaultLanguage={language}
        value={defaultValue}
        options={{ fontSize: 16 }}
        onChange={(e) => console.log(escapeHtml(e))}
      />
    </div>
  );
}
