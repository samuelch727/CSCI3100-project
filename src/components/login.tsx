// import "../styles/globals.css";
import type { AppProps } from "next/app";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";
import { Authenticator, Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import type { NextPage } from "next";
import Head from "next/head";
import Link from 'next/link'
// import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import React from 'react';
import SignIn from '../pages/signin'
import {useRouter} from "next/router";
import { Sign } from "crypto";
import {SingoutContext} from "../components/context/singout";
// import console from "console";

Amplify.configure(awsconfig);

export default function Login(props:any) {
  const MyContext = React.createContext<any>(null);
  const [loggedIn,setLoggedIn] = useState(false)
  // const [auth,checkAuth] = useState('')
  
  const router = useRouter()
  console.log("URL:", router.asPath)
  //console.log("LoggedIn:", loggedIn)

  useEffect(() => {

    async function AccessLoggedInState() {
        try {
            await Auth.currentAuthenticatedUser();
            setLoggedIn(true);
            {console.log("Login status in index:", loggedIn)}
            // router.push("/home");
            // return true
        } catch {
          setLoggedIn(false);
          // return false
        }
    }

    AccessLoggedInState()
  }, [])

  const signOut = async () => {
    try {
      await Auth.signOut();
      setLoggedIn(false)
      router.push("/")
    } catch (error) {
        console.log('error signing out', error);
    }
  }

  // useEffect(() => {
    const checkAuth = () => {
    // const path = console.log("router", router.pathname)
    if (router.asPath.includes("project")|| router.asPath.includes("home")) {
      console.log("need auth");
      return true
    } else { 
      console.log("No need auth");
      return false 
    } 
  }
  //   checkAuth()
  // }, [])

  // const onSignIn = () => {
  //   setLoggedIn(true)
  // };

 // useEffect(() => {
   // Hub.listen("auth event", (event:any) =>{
   //   console.log("auth event", event);
   //   setCurrentUser(event.payload.data);
  //  });
 // });
  return (
        <SingoutContext.Provider value={{signOut}}>
    <div> 
      <div>
      { (loggedIn && checkAuth()) || !checkAuth() ? 
        <div>
            {props.children}
          {/* {loggedIn ? <div><Button onClick={()=> signOut()}>Sign Out</Button></div> : <div></div>}           */}
        </div> : <div><SignIn>{props.children}</SignIn></div>
      }
      </div>
    </div>
      </SingoutContext.Provider>
  );
}
