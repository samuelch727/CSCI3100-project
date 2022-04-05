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
import { useRouter } from "next/router";

Amplify.configure(awsExports);

interface SignInProp {
    children: any;
}

const SignIn = ({children}: SignInProp) => {

  // const AccessLoggedInState = () => {
  //   Auth.currentAuthenticatedUser()
  //   .then(() => {
  //     setLoggedIn(true);
  //   })
  //   .catch(() => {
  //     setLoggedIn(false);
  //   })
  // }
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const signIn = async () => {    
      try {
        const userLogin = await Auth.signIn(username, password);
        // onSignIn();
        setUser(userLogin);
        // console.log("push")
        if (router.asPath === "/signin") router.push("/home");
      } catch (error) {
          console.log('there was an error logging in', error);
      }
  };

 return (
   <div>
    {user ? <div>{children}</div> : <div className = 'signIn'>
    <TextField
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

       {/* <Link href="/home"> */}
           <Button id = 'SignInButton' onClick ={() => {
             console.log("button clicked");
             signIn()
             }}>Sign In</Button>
       {/* </Link> */}
   </div>}</div>
  )
}

export default SignIn
