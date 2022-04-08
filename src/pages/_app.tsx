import "../styles/globals.css";
import type { AppProps } from "next/app";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";
import { Authenticator } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { API, graphqlOperation } from "aws-amplify";
import { listProjects } from "../graphql/queries";
import '@aws-amplify/ui-react/styles.css';
import { useEffect } from "react";

Amplify.configure(awsconfig);

function MyApp({ Component, pageProps, signOut }: any) {
  useEffect(() => {
    async function fetchProject() {
      try {
        const project = await API.graphql(graphqlOperation(listProjects));
        console.log(project);
      } catch (err) { 
        console.log(err);
      }
    }
    fetchProject();
  })

  return (
    <Component {...pageProps} signOut={signOut}/>
  );
  // return <Component {...pageProps} />;
}

export default withAuthenticator(MyApp);
