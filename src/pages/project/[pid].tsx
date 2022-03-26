import CodeBlock from "../../components/CodeBlock";
import { useRouter } from "next/router";
import CodeControlBar from "../../components/CodeControlBar";

export default function Code() {
  const router = useRouter();
  const { pid, pName } = router.query;
  console.log(pName);
  return (
    <div>
      <CodeControlBar
        height="10vh"
        width="100vw"
        title={pName ?? "Untitled Project"}
      />
      <CodeBlock language="c" width="100vw" height="90vh" />
    </div>
  );
}
