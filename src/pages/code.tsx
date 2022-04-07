import CodeBlock from "../components/CodeBlock";
import { API, graphqlOperation } from "aws-amplify";
import awsconfig from "../aws-exports";
import { useState } from "react";
import { listProjects } from "../graphql/queries";

export default function Code() {
  API.configure(awsconfig);
  useState(() => {
    const fetchProject = async () => {
      const project = await API.graphql(graphqlOperation(listProjects));
      console.log(project);
    };
    // API.graphql(graphqlOperation(listProjects)).then((res) => {
    //   console.log(res);
    // });
    fetchProject();
  });
  return <div></div>;
}
