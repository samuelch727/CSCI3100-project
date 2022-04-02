import "../styles/globals.css";
import Head from "next/head";
import Amplify from "aws-amplify";
import awsExports from "../aws-exports";
import {
  Authenticator
} from "@aws-amplify/ui-react";
//import "../project/index.css"
import { AppProps } from "next/app";
import { useState, useEffect } from "react";

import Index from "../pages/index";

Amplify.configure(awsExports);

function MyApp({ Component , pageProps } : AppProps) {
  const [currentUser, setCurrentUser] = useState();

 // useEffect(() => {
   // Hub.listen("auth event", (event:any) =>{
   //   console.log("auth event", event);
   //   setCurrentUser(event.payload.data);
  //  });
 // });
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
