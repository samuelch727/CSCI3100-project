// import "../styles/globals.css";
import type { AppProps } from "next/app";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import type { NextPage } from "next";
import Head from "next/head";
import Link from 'next/link'
// import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import React from 'react';

// import Login from "./login";

//Amplify.configure(awsconfig);

export default function Login() {
    let [ username, setUsername ] = useState("");
    let [ password, setPassword ] = useState("");

    let handleSubmit = async function () {
      let response = await Auth.signIn(username, password)
      console.log('auth response', response)
    }


 {
  //let handleSubmit = async function (event) {
 //   event.preventDefault();
  //  let response = await Auth.signIn(username, password)
   // console.log('auth response', response)
}  

return (
<div>
<div style={{color: "white", backgroundColor: "black", width:"100%"}}>Code Code Guide</div>
<h2 className = "mt-6 text-3xl font-extrabold leanding-9 text-center text-gray-900">
  Sign in to your account
</h2>
<input type = "text" id = "username" placeholder="Username"></input>
<br></br>
<input type = "password" id = "password" placeholder="Password"></input>
</div>
);
}
