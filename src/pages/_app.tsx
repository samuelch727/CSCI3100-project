import "../styles/globals.css";
import type { AppProps } from "next/app";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";

Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <AmplifySignOut />
    </div>
  )
  // return <Component {...pageProps} />;
}

export default withAuthenticator(MyApp);
