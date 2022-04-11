// import "../styles/globals.css";
import Head from "next/head";
import Amplify, { Auth } from "aws-amplify";
import awsExports from "../../aws-exports";
import { Authenticator, Button } from "@aws-amplify/ui-react";
//import "../project/index.css"
import { AppProps } from "next/app";
import { useState, useEffect, useRef } from "react";
import { TextField } from "@aws-amplify/ui-react";
// import Index from "../pages/index";
import { useRouter } from "next/router";
import Logotry from "next/image";
import Logo from "../../public/icon.png";
import Background from "../../../public/login_background.png";
// import SignUp from "../../component/signup";
import Header from "../component/header";
import Image from "next/image";
import React from "react";

Amplify.configure(awsExports);

interface SignInProp {
  children: any;
}

const initialFormState = {
  username: "",
  password: "",
  email: "",
  name: "",
  authCode: "",
  formType: "signIn",
};

const SignIn = ({ children }: SignInProp) => {
  // const AccessLoggedInState = () => {
  //   Auth.currentAuthenticatedUser()
  //   .then(() => {
  //     setLoggedIn(true);
  //   })
  //   .catch(() => {
  //     setLoggedIn(false);
  //   })
  // }
  const router = useRouter();
  //const [username, setUsername] = useState('');
  //const [password, setPassword] = useState('');
  const [formState, updateFormState] = useState(initialFormState);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const passwordRef = useRef(null);

  function onChange(e) {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  }

  const { formType } = formState;

  function Toggle() {
    var temp = document.getElementById("typepass");
    if (temp.type === "password") {
      temp.type = "text";
    } else {
      temp.type = "password";
    }
  }

  async function signUp() {
    try {
      const { username, email, password, name } = formState;
      await Auth.signUp({ username, password, attributes: { email, name } });
      updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
    } catch (error) {
      setError(error.toString());
      console.log("there was an error signing up", error);
    }

    // if (router.asPath === "/signin") router.push("/home");
  }
  async function confirmSignUp() {
    try {
      const { username, authCode } = formState;
      const userSignUp = await Auth.confirmSignUp(username, authCode);
      setUser(userSignUp);
      if (router.asPath === "/signin") router.push("/home");
    } catch (error) {
      setError(error.toString());
      console.log("there was an error", error);
    }
  }

  const signIn = async () => {
    try {
      const { username, password } = formState;
      const userLogin = await Auth.signIn(username, password);
      // onSignIn();
      setUser(userLogin);
      if (router.asPath === "/signin") router.push("/home");
    } catch (error) {
      setError(error.toString());
      console.log("there was an error logging in", error);
    }
  };

  //<div className="fixed inset-0 overflow-y-auto p-4 pt-[25vh]">
  return (
    <div className="bg-black opacity-100" style={{ height: "100vh" }}>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          top: "0",
          right: "0",
          overflow: "hidden",
        }}
      >
        <Image src={Background} layout="fill" />
        <Header />
      </div>

      <div className="grid justify-center content-center p-32">
        <span className="text-homepagetitle text-center text-4xl pb-8 z-10">
          Log in your CodeCodeGuide Account
        </span>
        <div className="flex justify-end p-8"></div>
        <form
          className=" relative z-20 grid bg-zinc-800 bg-opacity-60 justify-items-center content-center rounded-lg border-2 border-transparent"
          style={{ width: "60vw", height: "50vh" }}
        >
          <div className=" grid self-center items-center justify-items-center pt-4">
            {console.log("formType: ", formType)}
            {
              user ? (
                children
              ) : (
                <div className="">
                  {formType === "signIn" && (
                    <div>
                      <div className="h-14">
                        <input
                          className="bg-gray-100 border-2 border-slate-800 w-96 border-2 border-transparent rounded-lg p-1"
                          onChange={onChange}
                          placeholder="Your Username"
                        />
                        <br />
                      </div>

                      <div className="h-14">
                        <input
                          type="password"
                          ref={passwordRef}
                          className="bg-gray-100 border-2 w-96 border-2 border-transparent rounded-lg py-0.5 p-1"
                          onChange={onChange}
                          placeholder="Your Password"
                        ></input>
                      </div>

                      <div className="h-14">
                        <input
                          type="checkbox"
                          className="bg-black text-white"
                        ></input>
                        <span
                          className="pl-2 text-slate-300 h-24"
                          onClick={() => {
                            updateFormState(() => ({
                              ...formState,
                              formType: "password",
                            }));
                            setError("");
                          }}
                        >
                          show password
                        </span>
                      </div>

                      <Button
                        className="bg-navtextbottom text-white h-6 w-36 border-2 border-transparent rounded-lg flex items-center justify-center"
                        style={{ color: "white", backgroundColor: "#534F82" }}
                        onClick={() => signIn()}
                      >
                        Log in Account
                      </Button>

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

                      <div className="h-6 pt-16 select-none flex justify-self-end justify-content-end">
                        <button className="flex text-homepagetitle items-center">
                          Forget Password?
                        </button>
                        <button
                          id="SignUpButton"
                          onClick={() => {
                            updateFormState(() => ({
                              ...formState,
                              formType: "signUp",
                            }));
                            setError("");
                          }}
                          className="flex text-homepagetitle pl-4 items-center"
                        >
                          New to CodeCodeGuide?
                        </button>
                      </div>
                    </div>
                  )}
                  {formType === "signUp" && (
                    <div>
                      <div className="h-14">
                        <input
                          name="username"
                          className="bg-gray-100 border-2 w-96 border-2 border-transparent rounded-lg py-0.5 px-1"
                          onChange={onChange}
                          placeholder="username"
                        ></input>
                      </div>

                      <div className="h-14">
                        <input
                          name="password"
                          type="password"
                          className="bg-gray-100 border-2 w-96 border-2 border-transparent rounded-lg py-0.5 px-1"
                          onChange={onChange}
                          placeholder="password"
                        ></input>
                      </div>

                      <div className="h-14">
                        <input
                          name="email"
                          className="bg-gray-100 border-2 w-96 border-2 border-transparent rounded-lg py-0.5 px-1"
                          onChange={onChange}
                          placeholder="email"
                        ></input>
                      </div>

                      <div className="h-14">
                        <input
                          name="name"
                          className="bg-gray-100 border-2 w-96 border-2 border-transparent rounded-lg py-0.5 px-1"
                          onChange={onChange}
                          placeholder="nickname"
                        ></input>
                      </div>

                      <div>
                        <Button
                          style={{ color: "white", backgroundColor: "#534F82" }}
                          onClick={() => signUp()}
                          onChange={onChange}
                        >
                          Sign Up
                        </Button>
                        <Button
                          id="SignInButton"
                          style={{ color: "white", backgroundColor: "#534F82" }}
                          onClick={() => {
                            updateFormState(() => ({
                              ...formState,
                              formType: "signIn",
                            }));
                            setError("");
                          }}
                        >
                          Back to Sign In
                        </Button>
                      </div>
                    </div>
                  )}
                  {formType === "confirmSignUp" && (
                    <div>
                      <div className="grid justify-center content-center p-2">
                        <span className="text-homepagetitle text-center text-4xl pb-8 z-10">
                          Please verify your Account
                        </span>
                      </div>
                      <div className="grid content-center p-10">
                        <input
                          className=" text-xl pb-1 z-5"
                          name="authCode"
                          onChange={onChange}
                          placeholder="Confirmation code"
                        />
                      </div>
                      <div className="grid content-center p-10">
                        <div>
                          <Button
                            style={{
                              color: "white",
                              backgroundColor: "#534F82",
                            }}
                            onClick={() => {
                              confirmSignUp();
                              setError("");
                            }}
                          >
                            Confirm Sign Up
                          </Button>
                          <Button
                            id="SignInButton"
                            style={{
                              color: "white",
                              backgroundColor: "#534F82",
                            }}
                            onClick={() => {
                              updateFormState(() => ({
                                ...formState,
                                formType: "signUp",
                              }));
                              setError("");
                            }}
                          >
                            Back to Sign Up
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div>{error != null ? error : any}</div>
                </div>
              )

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
        </form>
      </div>
    </div>
  );
};

export default SignIn;

{
  /* import React from 'react'
import Image from 'next/image'
import Logo from '../../public/icon.png'
import Background from '../../public/login_background.png'

function login() {
  return (
    <div className='bg-black opacity-100' style={{height:"100vh"}}>
        <div style={{position: "absolute", width:"100vw", height: "100vh", top:"0", right:"0", overflow:"hidden"}}>
        <Image src={Background} layout="fill"/>
        </div>


        <div style={{position: "absolute", width:"100vw", height: "100vh", top:"0", right:"0", overflow:"hidden"}}>
        <Image src={background} className="opacity-30"/>
        </div> 
        <div className='flex justify-center items-center bg-navbg relative z-10 bg-opacity-80' id='navbar'> 
          <div className='inline-block w-20 h-20 px-2 flex justify-center items-center'>
            <Image src={Logo}
                  alt="logo"
                  />
          </div>
            <h1 className='z-10 inline text-4xl text-transparent bg-clip-text bg-gradient-to-b from-navtexttop via-navtextmiddle to-navtextbottom'>CodeCodeGuide</h1>
        </div>


        <div className='grid justify-center content-center p-32'>

            <span className='text-homepagetitle text-center text-4xl pb-8 z-10'>Log in your CodeCodeGuide Account</span>
            <form className=' relative z-20 grid bg-zinc-800 bg-opacity-60 justify-items-center content-center rounded-lg border-2 border-transparent' style={{width:"60vw" ,height:"50vh"}}>   
                
            
            <div className=" grid self-center items-center justify-items-center pt-4">  
                <div className='h-14'>
                <input className='bg-gray-100 border-2 border-slate-800 w-96 border-2 border-transparent rounded-lg py-0.5 px-1' placeholder='Your Email Address or Your Username'></input>
                </div>



                <div className='h-14'>
                <input type="password" className='bg-gray-100 border-2 w-96 border-2 border-transparent rounded-lg py-0.5 px-1' placeholder='Your Password'></input>
                </div>
                <div className='h-14'>
                <input type="checkbox" className='bg-black text-white'></input>
                <span className='pl-2 text-slate-300 h-24'>show password</span> 
                </div>
                    <button className='bg-navtextbottom text-white h-6 w-36 border-2 border-transparent rounded-lg flex items-center justify-center'>Log in Account</button>
            
                    
                <div className='h-6 pt-16 select-none flex justify-self-end justify-content-end'>
                    <button className='flex text-homepagetitle items-center'>Forget Password?</button>
                </div>
                <div className='h-6 pt-8 select-none flex justify-self-end justify-content-end'>
                    <button className='flex text-homepagetitle pl-4 items-center'>New to CodeCodeGuide?</button>
                </div>
                </div>
                
            </form>
        </div>

        
    </div>
  )
}

export default login */
}
