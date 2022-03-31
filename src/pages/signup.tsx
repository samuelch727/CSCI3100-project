// import "../styles/globals.css";
import type { AppProps } from "next/app";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

function Login({ Component, pageProps }: AppProps) {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Component {...pageProps} signOut={signOut} />
      )}
    </Authenticator>
  );
  // return <Component {...pageProps} />;
}

export default Login
