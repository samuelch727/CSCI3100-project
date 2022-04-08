// import "../styles/globals.css";
import type { AppProps } from "next/app";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import { Authenticator, Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

Amplify.configure(awsconfig);

const initialFormState = {
  username: '', password: '', email: '', authCode: '', formType: 'signup'
}

function SignUp() {
  const [formState, updateFormState] = useState(initialFormState)
  const router = useRouter()
  // const [user, updateUser] = useState(null)
  // useEffect(()=> {
  //   checkUser()
  //   setAuthListener()
  // }, [])
  function onChange(e) {
    e.persist()
    updateFormState(()=>({...formState, [e.target.name]: e.target.value}))
  }
  const{ formType } = formState
  async function signUp() {
    const { username, email, password } = formState
    await Auth.signUp({ username, password, attributes: {email}})
    updateFormState(()=>({...formState, formType: "confirmSignUp"}))
    // if (router.asPath === "/signin") router.push("/home");
  }
  async function confirmSignUp() {
    const { username, authCode } = formState
    await Auth.confirmSignUp(username, authCode)
    updateFormState(()=>({...formState, formType: "signIn"}))
  }
  return (
    <div className="main"> 
    {
      formType === 'signUp' && (
        <div>
          <input name="username" onChange={onChange} placeholder="username" />
          <input name="password" type="password" onChange={onChange} placeholder="password" />
          <input name="email" onChange={onChange} placeholder="email" />
          <button onClick={()=>signUp()}>Sign Up</button>
        </div>
      )
    }
    {
      formType === 'confirmSignUp' && (
        <div>
          <input name="authCode" onChange={onChange} placeholder="Confirmation code" />
          <button onClick={()=>confirmSignUp()}>Confirm Sign Up</button>
        </div>
      )
    }    
    </div>
  );
}

export default SignUp
