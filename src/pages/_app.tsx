import "../styles/globals.css";
<<<<<<< HEAD
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
import Login from "../component/login"
=======
import type { AppProps } from "next/app";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";
import { Authenticator } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { API, graphqlOperation } from "aws-amplify";
import { listProjects } from "../graphql/queries";
import '@aws-amplify/ui-react/styles.css';
import { useEffect } from "react";
>>>>>>> 7/4LoginPageAdded

Amplify.configure(awsExports);

<<<<<<< HEAD
function MyApp({ Component , pageProps } : AppProps) {
  return (
    <Login>
      <Component {...pageProps} />
    </Login>
  );
} 
=======
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
>>>>>>> 7/4LoginPageAdded

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
