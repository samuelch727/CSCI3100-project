import CodeBlock from "../../components/CodeBlock";
import { useRouter } from "next/router";
import CodeControlBar from "../../components/CodeControlBar";
import { API, graphqlOperation } from "aws-amplify";
import { getProject } from "../../graphql/queries";
import { Project } from "../../API";
import { useEffect, useState } from "react";

export default function Code() {
  const router = useRouter();
  const { pid, pName } = router.query;
  console.log(pName);
  const [project, setProject] = useState<Project>();
  useEffect(() => {
    const fetchProject = async () => {
      if (pid) {
        const project = await API.graphql(
          graphqlOperation(getProject, { id: pid })
        );
        return project;
      } else return null;
    };
    console.log(fetchProject());
  }, [pid]);
  return (
    <div>
      <CodeControlBar
        height="10vh"
        width="100vw"
        title={pName ?? "Untitled Project"}
      />
      <CodeBlock language="python" width="100vw" height="90vh" />
    </div>
  );
}
