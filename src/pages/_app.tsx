import "../styles/globals.css";
import Head from "next/head";
import Amplify, { Auth } from "aws-amplify";
import awsExports from "../aws-exports";
import {
  Authenticator, Button
} from "@aws-amplify/ui-react";
//import "../project/index.css"
import { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { TextField } from "@aws-amplify/ui-react";
import Index from "../pages/index";
import Link from "next/link";
import Router from "next/router";
import Login from "./login"

Amplify.configure(awsExports);

function MyApp({ Component , pageProps} : AppProps) {
  return (
    <Login {...pageProps}>
      <Component {...pageProps} />
    </Login>
  );
} 

//const SignIn = async() => {
 // const [username, setUsername] = useState();
 // const [password, setPassword] = useState();
 // return (
 //   <div className = 'signIn'>
  //    <TextField
  //      id = 'username'
  ///      label = 'Username'
  //      value = {username}
      //  onChange = {e => setUsername(e.target.value)}
  //    />
  //    <TextField
   //     id = 'password'
  //      label = 'Password'
   //     value = {password}
     //   onChange = {e => setPassword(e.target.value)}
     
  //    />
  //     <Button id = 'SignInButton' onClick ='signIn'></Button>
      

 //   </div>
//  )
//}

export default MyApp;
