import "../styles/globals.css";
import type { AppProps } from "next/app";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { API, graphqlOperation } from "aws-amplify";
import { listProjects } from "../graphql/queries";
import "@aws-amplify/ui-react/styles.css";
import { useEffect } from "react";
import Login from "../components/login";
import Head from "next/head";

Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Code Code Guide</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <Login>
        <Component {...pageProps} />
      </Login>
    </div>
  );
}

export default MyApp;
