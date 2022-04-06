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
import SignUp from "../../component/signup";

Amplify.configure(awsExports);

interface SignInProp {
    children: any;
}

const initialFormState = {
  username: '', password: '', email: '', name: '', authCode: '', formType: 'signIn'
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
  //const [username, setUsername] = useState('');
  //const [password, setPassword] = useState('');
  const [formState, updateFormState] = useState(initialFormState)
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  function onChange(e) {
    e.persist()
    updateFormState(()=>({...formState, [e.target.name]: e.target.value}))
  }

  const{ formType } = formState

  async function signUp() {
    try {
      const { username, email, password } = formState
      await Auth.signUp({ username, password, attributes: {email, name}})
      updateFormState(()=>({...formState, formType: "confirmSignUp"}))
    } catch(error) {
      setError(error.toString());
      console.log('there was an error signing up', error);
    }
    
    // if (router.asPath === "/signin") router.push("/home");
  }
  async function confirmSignUp() {
    try {
      const { username, authCode } = formState
      const userSignUp = await Auth.confirmSignUp(username, authCode)
      setUser(userSignUp);
      if (router.asPath === "/signin") router.push("/home");
    } catch(error) {
      setError(error.toString());
      console.log('there was an error', error);
    }   
  }

  const signIn = async () => {    
      try {
        const { username, password } = formState
        const userLogin = await Auth.signIn(username, password);
        // onSignIn();
        setUser(userLogin);
        // console.log("push")
        if (router.asPath === "/signin") router.push("/home");
      } catch (error) {
        setError(error.toString());
        console.log('there was an error logging in', error);
      }
  };

    //<div className="fixed inset-0 overflow-y-auto p-4 pt-[25vh]">
  return (
    <div className="main">
      {console.log("formType: ", formType)}
      { user ? children : <div className="">
        {
          formType === 'signIn' && (
            <div>
              <h1>Sign In</h1>
              <input name="username" onChange={onChange} placeholder="username" /><br />
              <input name="password" type="password" onChange={onChange} placeholder="password" /><br />
              {/* <TextField 
                id = 'username'
                label = 'Username'
                value = {username}
                onChange = {e => setUsername(e.target.value)}
                />
                <TextField
                  id = 'password'
                  label = 'Password'
                  type = 'password'
                  value = {password}
                  onChange = {e => setPassword(e.target.value)}
                /> */}
              <Button onClick={()=>signIn()}>Sign In</Button>
              <Button id = 'SignUpButton' onClick ={()=> {
                updateFormState(()=> ({...formState, formType: "signUp"}));
                setError("");
                }}>Sign Up</Button>
            </div>
          )
        }
        {
          formType === 'signUp' && (
            <div>
              <h1>Sign Up</h1>
              <input name="username" onChange={onChange} placeholder="username" /><br />
              <input name="password" type="password" onChange={onChange} placeholder="password" /><br />
              <input name="email" onChange={onChange} placeholder="email" /><br />
              <input name="name" onChange={onChange} placeholder="nickname" />
              <Button onClick={()=>signUp()} onChange={onChange}>Sign Up</Button>
              <Button id = 'SignInButton' onClick ={()=> {
                updateFormState(()=> ({...formState, formType: "signIn"}));
                setError("");
                }}>Back to Sign In</Button>
            </div>
          )
        }
        {
          formType === 'confirmSignUp' && (
            <div>
              <input name="authCode" onChange={onChange} placeholder="Confirmation code" />
              <Button onClick={()=>{
                confirmSignUp();
                setError("");
                }}>Confirm Sign Up
              </Button>
              <Button onClick={()=>{
                signUp();
                setError("");
                }}>Back To Sign Up
              </Button>
            </div>
          )
        }
        <div>
          {
            error != null ? error : any
          }
        </div>
        </div>  

     /* <TextField 
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
     
      /> */
      /* <Button id = 'SignInButton' onClick ={()=>signIn()}>Sign In</Button> */
      /* <Button id = 'SignUpButton' onClick ={()=> updateFormState(()=> ({
        ...formState, formType: "signUp"
        }))}>Sign Up</Button> */
      }
      </div>
  )
}

export default SignIn
