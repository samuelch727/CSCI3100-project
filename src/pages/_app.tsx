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
import Login from "../components/login"

Amplify.configure(awsconfig);

function MyApp({ Component , pageProps } : AppProps) {
  return (
    <Login>
      <Component {...pageProps} />
    </Login>
  );
} 

export default MyApp;
