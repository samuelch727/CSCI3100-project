// import "../styles/globals.css";
import Head from "next/head";
import Amplify, { Auth } from "aws-amplify";
import awsExports from "../../aws-exports";
import {
  Authenticator, Button
} from "@aws-amplify/ui-react";
//import "../project/index.css"
import { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { TextField } from "@aws-amplify/ui-react";
// import Index from "../pages/index";
import Link from "next/link";
import Router from "next/router";

Amplify.configure(awsExports);

// interface SignInProp {
//     onSignIn: () => void;
// }

const SignIn = () => {

  // const AccessLoggedInState = () => {
  //   Auth.currentAuthenticatedUser()
  //   .then(() => {
  //     setLoggedIn(true);
  //   })
  //   .catch(() => {
  //     setLoggedIn(false);
  //   })
  // }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
      try {
        const user = await Auth.signIn(username, password);
        // onSignIn();
        Router.push("/home");
      } catch (error) {
          console.log('there was an error logging in', error);
      }
  };

    //<div className="fixed inset-0 overflow-y-auto p-4 pt-[25vh]">
 return (
    <div className="">
      <div className="max-w-xs">
        <div className="text-sky-500 bg-gray-400">
          testing
        </div>
     <TextField 
      className="bg-slate-900"
       id = 'username'
       label = 'Username'
        value = {username}
       onChange = {e => setUsername(e.target.value)}
      />
      <TextField
        id = 'password'
       label = 'Password'
        value = {password}
        onChange = {e => setPassword(e.target.value)}
     
      />

        {/* <Link href="/project"> */}
            <Button id = 'SignInButton' onClick ={signIn}>Sign In</Button>
        {/* </Link> */}
     </div>
   </div>
  )
}

export default SignIn
