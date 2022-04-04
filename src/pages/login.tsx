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
import SignIn from './signin'
// import Router from "next/router";

// import Login from "./login";

//Amplify.configure(awsconfig);

export default function Login(props:any) {
  

 // useEffect(() => {
   // Hub.listen("auth event", (event:any) =>{
   //   console.log("auth event", event);
   //   setCurrentUser(event.payload.data);
  //  });
 // });
  return (
 //   <Component {...pageProps} />
    <div className = "App">
      <header className = "App-Header">
        {
          <Link href = "/signin">
            <Button onClick={onSignIn}>
              Sign In
            </Button>
          </Link>
        }
      </header>
    </div>
  );
}
