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
import Logo from "../../../public/Logo.png";
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
  verifypassword: "",
  email: "",
  name: "",
  authCode: "",
  formType: "signIn",
  resetCode: "",
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
  const [passwordShown, setPasswordShown] = useState(false);
  const passwordRef = useRef(null);

  function onChange(e) {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  }

  const { formType } = formState;

  async function signUp() {
    const { username, email, password, name, verifypassword } = formState;
    if (password !== verifypassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email, name: username },
      });
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

  const forgotPassword = async () => {
    const { username } = formState;
    if (!username || username === "") {
      setError("Username is required");
      return;
    }
    try {
      await Auth.forgotPassword(username);
      updateFormState(() => ({ ...formState, formType: "forgotPasswordSent" }));
    } catch (error) {
      setError(error.toString());
      console.log("there was an error", error);
    }
  };

  const forgotPasswordSubmit = async () => {
    console.log("clicked forgot password submit");
    const { username, resetCode, password, verifypassword } = formState;
    if (password !== verifypassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await Auth.forgotPasswordSubmit(username, resetCode, password);
      updateFormState(() => ({ ...formState, formType: "signIn" }));
    } catch (error) {
      setError(error.toString());
      console.log("there was an error", error);
    }
  };

  //<div className="fixed inset-0 overflow-y-auto p-4 pt-[25vh]">
  // return (
  //   <div className="bg-black opacity-100" style={{ height: "100vh" }}>
  //     <div
  //       style={{
  //         position: "absolute",
  //         width: "100vw",
  //         height: "100vh",
  //         top: "0",
  //         right: "0",
  //         overflow: "hidden",
  //       }}
  //     >
  //       <Image src={Background} layout="fill" />
  //       <Header />
  //     </div>

  //     <div className="grid justify-center content-center p-32">
  //       <span className="text-homepagetitle text-center text-4xl pb-8 z-10">
  //         Log in your CodeCodeGuide Account
  //       </span>
  //       <div className="flex justify-end p-8"></div>
  //       <form
  //         className=" relative z-20 grid bg-zinc-800 bg-opacity-60 justify-items-center content-center rounded-lg border-2 border-transparent"
  //         style={{ width: "60vw", height: "50vh" }}
  //       >
  //         <div className=" grid self-center items-center justify-items-center pt-4">
  //           {console.log("formType: ", formType)}
  //           {
  //             user ? (
  //               children
  //             ) : (
  //               <div className="">
  //                 {formType === "signIn" && (
  //                   <div>
  //                     <div className="h-14">
  //                       <input
  //                         className="bg-gray-100 border-2 border-slate-800 w-96 border-2 border-transparent rounded-lg p-1"
  //                         onChange={onChange}
  //                         placeholder="Your Username"
  //                       />
  //                       <br />
  //                     </div>

  //                     <div className="h-14">
  //                       <input
  //                         type="password"
  //                         ref={passwordRef}
  //                         className="bg-gray-100 border-2 w-96 border-2 border-transparent rounded-lg py-0.5 p-1"
  //                         onChange={onChange}
  //                         placeholder="Your Password"
  //                       ></input>
  //                     </div>

  //                     <div className="h-14">
  //                       <input
  //                         type="checkbox"
  //                         className="bg-black text-white"
  //                       ></input>
  //                       <span
  //                         className="pl-2 text-slate-300 h-24"
  //                         onClick={() => {
  //                           updateFormState(() => ({
  //                             ...formState,
  //                             formType: "password",
  //                           }));
  //                           setError("");
  //                         }}
  //                       >
  //                         show password
  //                       </span>
  //                     </div>

  //                     <button
  //                       className="bg-navtextbottom text-white h-6 w-36 border-2 border-transparent rounded-lg flex items-center justify-center"
  //                       style={{ color: "white", backgroundColor: "#534F82" }}
  //                       onClick={() => signIn()}
  //                     >
  //                       Log in Account
  //                     </button>

  //                     {/* <TextField
  //               id = 'username'
  //               label = 'Username'
  //               value = {username}
  //               onChange = {e => setUsername(e.target.value)}
  //               />
  //               <TextField
  //                 id = 'password'
  //                 label = 'Password'
  //                 type = 'password'
  //                 value = {password}
  //                 onChange = {e => setPassword(e.target.value)}
  //               /> */}

  //                     <div className="h-6 pt-16 select-none flex justify-self-end justify-content-end">
  //                       <button className="bg-navtextbottom text-white h-6 w-36 border-2 border-transparent rounded-lg flex items-center justify-center">
  //                         Forget Password?
  //                       </button>
  //                       <button
  //                         id="SignUpButton"
  //                         onClick={() => {
  //                           updateFormState(() => ({
  //                             ...formState,
  //                             formType: "signUp",
  //                           }));
  //                           setError("");
  //                         }}
  //                         className="bg-navtextbottom text-white h-6 w-36 border-2 border-transparent rounded-lg flex items-center justify-center"
  //                       >
  //                         New to CodeCodeGuide?
  //                       </button>
  //                     </div>
  //                   </div>
  //                 )}
  //                 {formType === "signUp" && (
  //                   <div
  //                     className="bg-black opacity-100"
  //                     style={{ height: "100vh" }}
  //                   >
  //                     <div
  //                       style={{
  //                         position: "absolute",
  //                         width: "100vw",
  //                         height: "100vh",
  //                         top: "0",
  //                         right: "0",
  //                         overflow: "hidden",
  //                         zIndex: "0",
  //                       }}
  //                     >
  //                       <Image src={Background} layout="fill" />
  //                     </div>
  //                     {/* <div style={{position: "absolute", width:"100vw", height: "100vh", top:"0", right:"0", overflow:"hidden"}}>
  //                   <Image src={background} className="opacity-30"/>
  //                   </div> */}
  //                     <div
  //                       className="flex justify-center items-center bg-navbg relative z-10 bg-opacity-80"
  //                       id="navbar"
  //                     >
  //                       <div className="inline-block w-20 h-20 px-2 flex justify-center items-center">
  //                         <Image src={Logo} alt="logo" />
  //                       </div>
  //                       <h1 className="z-10 inline text-4xl text-transparent bg-clip-text bg-gradient-to-b from-navtexttop via-navtextmiddle to-navtextbottom">
  //                         CodeCodeGuide
  //                       </h1>
  //                     </div>

  //                     <div className="relative z-20 flex justify-end p-8">
  //                       <button className="text-white bg-homepagetitle border-2 border-transparent rounded-lg px-4 py-2 text-center">
  //                         Log In
  //                       </button>
  //                     </div>

  //                     <div className="relative z-20 grid content-center justify-start pl-48">
  //                       <span className="text-homepagetitle text-2xl font-semibold">
  //                         Create Your CodeCodeGuide Account
  //                       </span>
  //                     </div>

  //                     <div className="relative z-20 pt-8 grid content-center justify-center">
  //                       <form
  //                         className="grid bg-zinc-800 bg-opacity-60 justify-center content-center border border-transparent rounded-lg"
  //                         style={{ height: "55vh", width: "70vw" }}
  //                       >
  //                         <div
  //                           className="grid justify-center content-center justify-items-center"
  //                           style={{ height: "55vh", width: "55vw" }}
  //                         >
  //                           <div
  //                             style={{ width: "55vw" }}
  //                             className="flex justify-between"
  //                           >
  //                             <input
  //                               placeholder="First Name"
  //                               className="text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg px-2 py-1 md:text-sm"
  //                               style={{ width: "25vw" }}
  //                             />
  //                             <input
  //                               placeholder="Last Name"
  //                               className="text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg px-2 py-1 md:text-sm"
  //                               style={{ width: "25vw" }}
  //                             />
  //                           </div>
  //                           <div className="pt-8">
  //                             <input
  //                               placeholder="Your Email Address"
  //                               className="text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg px-2 mx-6 py-1 md:text-xs"
  //                               style={{ width: "55vw" }}
  //                             />
  //                           </div>
  //                           <div className="pt-8">
  //                             <input
  //                               placeholder="User Name"
  //                               className="text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg px-2 mx-6 py-1 md:text-xs"
  //                               style={{ width: "55vw" }}
  //                             />
  //                           </div>
  //                           <div className="pt-8">
  //                             <input
  //                               type="password"
  //                               placeholder="Password"
  //                               className="text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg  px-2 mx-6 py-1 md:text-xs"
  //                               style={{ width: "55vw" }}
  //                             />
  //                           </div>
  //                           <div className="pt-8">
  //                             <input
  //                               type="password"
  //                               placeholder="Confirm Password"
  //                               className="text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg px-2 mx-6 py-1 md:text-xs"
  //                               style={{ width: "55vw" }}
  //                             />
  //                           </div>
  //                           <div className="justify-items-start justify-self-start mx-7 pt-3">
  //                             <input type="checkbox" />
  //                             <span className="text-white pl-2">
  //                               Show Password
  //                             </span>
  //                           </div>
  //                           <div className="pt-6">
  //                             <button className="text-white bg-homepagetitle border border-transparent rounded-lg px-6 py-2">
  //                               Create Account
  //                             </button>
  //                           </div>
  //                         </div>
  //                       </form>
  //                     </div>
  //                   </div>
  //                 )}
  //                 {formType === "confirmSignUp" && (
  //                   <div>
  //                     <div className="grid justify-center content-center p-2">
  //                       <span className="text-homepagetitle text-center text-4xl pb-8 z-10">
  //                         Please verify your Account
  //                       </span>
  //                     </div>
  //                     <div className="grid content-center p-10">
  //                       <input
  //                         className=" text-xl pb-1 z-5"
  //                         name="authCode"
  //                         onChange={onChange}
  //                         placeholder="Confirmation code"
  //                       />
  //                     </div>
  //                     <div className="grid content-center p-10">
  //                       <div>
  //                         <button
  //                           className="bg-navtextbottom text-white h-6 w-36 border-2 border-transparent rounded-lg flex items-center justify-center"
  //                           style={{
  //                             color: "white",
  //                             backgroundColor: "#534F82",
  //                           }}
  //                           onClick={() => {
  //                             confirmSignUp();
  //                             setError("");
  //                           }}
  //                         >
  //                           Confirm Sign Up
  //                         </button>
  //                         <button
  //                           id="SignInButton"
  //                           style={{
  //                             color: "white",
  //                             backgroundColor: "#534F82",
  //                           }}
  //                           className="bg-navtextbottom text-white h-6 w-36 border-2 border-transparent rounded-lg flex items-center justify-center"
  //                           onClick={() => {
  //                             updateFormState(() => ({
  //                               ...formState,
  //                               formType: "signUp",
  //                             }));
  //                             setError("");
  //                           }}
  //                         >
  //                           Back to Sign Up
  //                         </button>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 )}
  //                 <div className="text-rose-400 py-2">
  //                   {error !== "" ? "Error: " + error : null}
  //                 </div>
  //               </div>
  //             )

  //             /* <TextField
  //      id = 'username'
  //      label = 'Username'
  //       value = {username}
  //      onChange = {e => setUsername(e.target.value)}
  //     />
  //     <TextField
  //       id = 'password'
  //      label = 'Password'
  //       value = {password}
  //       onChange = {e => setPassword(e.target.value)}

  //     /> */
  //             /* <Button id = 'SignInButton' onClick ={()=>signIn()}>Sign In</Button> */
  //             /* <Button id = 'SignUpButton' onClick ={()=> updateFormState(()=> ({
  //       ...formState, formType: "signUp"
  //       }))}>Sign Up</Button> */
  //           }
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );
  return (
    <div>
      {user ? (
        children
      ) : (
        <div className="bg-black opacity-100" style={{ height: "100vh" }}>
          <div
            style={{
              position: "absolute",
              width: "100vw",
              height: "100vh",
              top: "0",
              right: "0",
              overflow: "hidden",
              zIndex: "0",
            }}
          >
            <Image src={Background} layout="fill" />
          </div>
          {/* <div style={{position: "absolute", width:"100vw", height: "100vh", top:"0", right:"0", overflow:"hidden"}}>
        <Image src={background} className="opacity-30"/>
        </div> */}
          <div
            className="flex justify-center items-center bg-navbg relative z-10 bg-opacity-80"
            id="navbar"
          >
            <div className="inline-block w-20 h-20 px-2 flex justify-center items-center">
              <Image src={Logo} alt="logo" />
            </div>
            <h1 className="z-10 inline text-4xl text-transparent bg-clip-text bg-gradient-to-b from-navtexttop via-navtextmiddle to-navtextbottom">
              CodeCodeGuide
            </h1>
          </div>
          {formType === "forgotPasswordSent" && (
            <div>
              <div className="relative z-20 grid content-center justify-center pt-14">
                <span className="text-homepagetitle text-2xl">
                  We have sent the confirmation code to your Email !
                </span>
              </div>

              <div className="relative z-20 pt-8 grid content-center justify-center">
                <form
                  className="grid bg-zinc-800 bg-opacity-60 justify-center content-center border border-transparent rounded-lg"
                  style={{ height: "45vh", width: "60vw" }}
                >
                  <div className=" pt-2 pb-5 px-5">
                    <input
                      placeholder="Confirmation Code"
                      className="bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg py-2 px-4"
                      style={{ width: "40vw", height: "5vh" }}
                      name="resetCode"
                      onChange={onChange}
                    />
                  </div>
                  <div className="p-5">
                    <input
                      placeholder="New Password"
                      className="bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg py-2 px-4"
                      style={{ width: "40vw", height: "5vh" }}
                      name="password"
                      type="password"
                      onChange={onChange}
                    />
                  </div>
                  <div className="p-5">
                    <input
                      placeholder="Re-Enter New Password"
                      className="bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg py-2 px-4"
                      style={{ width: "40vw", height: "5vh" }}
                      name="password"
                      type="password"
                      onChange={onChange}
                    />
                  </div>
                  {/* <div className="grid justify-items-center grid-cols-4 pt-6 gap-4"> */}
                  <div className="pt-6 ml-4">
                    <button
                      className="text-white bg-homepagetitle border border-transparent rounded-lg px-6 py-2 mr-4 basic-1/2"
                      onClick={(e) => {
                        e.preventDefault();
                        setError("");
                        forgotPasswordSubmit();
                      }}
                    >
                      Reset
                    </button>
                    <button
                      className="text-white bg-homepagetitle border border-transparent rounded-lg px-6 py-2 basic-1/2"
                      onClick={() => {
                        setError("");
                        updateFormState(() => ({
                          ...formState,
                          formType: "signIn",
                        }));
                      }}
                    >
                      Back to Sign In
                    </button>
                  </div>
                  {/* </div> */}
                </form>
              </div>
            </div>
          )}
          {formType === "confirmSignUp" && (
            <div>
              <div className="relative z-20 pt-8 grid content-center justify-center">
                <form
                  className="grid bg-zinc-800 bg-opacity-60 justify-center content-center border border-transparent rounded-lg"
                  style={{ height: "40vh", width: "60vw" }}
                >
                  <div style={{ width: "40vw" }}>
                    <span className="text-xl text-homepagetitle font-bold">
                      Now Everything Is Almost Done!
                      <br /> We Have Sent A Verification Code To Your Email
                    </span>
                  </div>
                  <div className="flex justify-between pt-8">
                    <span className="text-gray-400">
                      Please Input Your Verification Code Here
                    </span>
                    {/* <button className="text-sm text-buttoncolor underline">
                      Re-send Verification Code
                    </button> */}
                  </div>
                  <div className="pt-2">
                    <input
                      placeholder="Verification Code"
                      className="bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg py-0.5 px-2"
                      style={{ width: "40vw", height: "5.5vh" }}
                      name="authCode"
                      onChange={onChange}
                    ></input>
                  </div>
                  <div className="pt-8 grid justify-items-center">
                    <button
                      className="text-white bg-homepagetitle border border-transparent rounded-lg"
                      style={{ width: "40vw", height: "4.5vh" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setError("");
                        confirmSignUp();
                      }}
                    >
                      Verify
                    </button>
                  </div>
                </form>
                <div className="text-right pt-2">
                  <span className="text-gray-300 text-xs font-thin">
                    clicking "Verify" means user accept our service agreement
                  </span>
                </div>
              </div>
            </div>
          )}
          {formType === "forgotPassword" && (
            <div>
              <div className="relative z-20 text-center text-2xl pt-24 select-none">
                <span className="text-white">Enter Your </span>
                <span className="text-homepagetitle">Email </span>
                <span className="text-white">
                  {" "}
                  And We Will Send You A Link To Reset Your Password
                </span>
              </div>
              <div className="relative z-20 pt-8 grid content-center justify-center">
                <form
                  className="grid bg-zinc-800 bg-opacity-60 justify-center content-center border border-transparent rounded-lg"
                  style={{ height: "35vh", width: "60vw" }}
                >
                  <div>
                    <input
                      placeholder="Your Username"
                      className="bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg py-0.5 px-2"
                      style={{ width: "40vw", height: "5.5vh" }}
                      name="username"
                      onChange={onChange}
                    ></input>
                  </div>
                  <div className="pt-6">
                    <button
                      className="text-white bg-homepagetitle border border-transparent rounded-lg px-6 py-2 mr-4 basic-1/2"
                      onClick={(e) => {
                        e.preventDefault();
                        setError("");
                        forgotPassword();
                      }}
                    >
                      Reset password
                    </button>
                    <button
                      className="text-white bg-homepagetitle border border-transparent rounded-lg px-6 py-2 basic-1/2"
                      onClick={() => {
                        setError("");
                        updateFormState(() => ({
                          ...formState,
                          formType: "signIn",
                        }));
                      }}
                    >
                      Back to Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {formType === "signIn" && (
            <div className="grid justify-center content-center p-32">
              <span className="text-homepagetitle text-center text-4xl pb-8 z-10">
                Log in your CodeCodeGuide Account
              </span>
              <form
                className=" relative z-20 grid bg-zinc-800 bg-opacity-60 justify-items-center content-center rounded-lg border-2 border-transparent"
                style={{ width: "60vw", height: "50vh" }}
              >
                <div className=" grid self-center items-center justify-items-center pt-4">
                  <div className="h-14 pb-16">
                    <input
                      className="bg-inputboxcolor bg-opacity-10 border border-transparent w-96 rounded-lg py-0.5 px-2"
                      placeholder="Your Username"
                      name="username"
                      onChange={onChange}
                    ></input>
                  </div>
                  <div className="h-14">
                    <input
                      type="password"
                      className="bg-inputboxcolor bg-opacity-10 w-96 border-transparent rounded-lg py-0.5 px-2"
                      placeholder="Your Password"
                      name="password"
                      onChange={onChange}
                    ></input>
                  </div>
                  <div className="h-14 justify-self-start">
                    <input type="checkbox"></input>
                    <span className="pl-2 text-slate-300 h-24">
                      show password
                    </span>
                  </div>
                  <div className="text-red-500 justify-items-start justify-self-start mx-7 pt-3">
                    {error !== "" ? "Error: " + error : null}
                  </div>
                  <button
                    className="bg-navtextbottom text-white h-6 w-36 border-2 border-transparent rounded-lg flex items-center justify-center"
                    onClick={(e) => {
                      e.preventDefault();
                      signIn();
                    }}
                  >
                    Log in Account
                  </button>

                  <div className="h-6 pt-16 select-none flex justify-self-end justify-content-end">
                    <button
                      className="flex text-homepagetitle items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        setError("");
                        updateFormState(() => ({
                          ...formState,
                          formType: "forgotPassword",
                        }));
                      }}
                    >
                      Forget Password?
                    </button>
                  </div>
                  <div className="h-6 pt-8 select-none flex justify-self-end justify-content-end">
                    <button
                      className="flex text-homepagetitle pl-4 items-center"
                      onClick={() => {
                        setError("");
                        updateFormState(() => ({
                          ...formState,
                          formType: "signUp",
                        }));
                      }}
                    >
                      New to CodeCodeGuide?
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {formType === "signUp" && (
            <div className="">
              <div className="grid justify-center content-center w-screen pt-32">
                <span className="text-homepagetitle text-center text-4xl pb-8 z-10">
                  Create Your CodeCodeGuide Account
                </span>
              </div>
              <div className="relative z-20 grid content-center justify-center">
                <form
                  className="grid bg-zinc-800 bg-opacity-60 justify-center content-center border border-transparent rounded-lg"
                  style={{ height: "55vh", width: "70vw" }}
                >
                  <div
                    className="grid justify-center content-center justify-items-center"
                    style={{ height: "55vh", width: "55vw" }}
                  >
                    <div>
                      <input
                        placeholder="Your Email Address"
                        className="outline-none text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg px-2 mx-6 py-1 md:text-xs"
                        style={{ width: "55vw", height: "4vh" }}
                        name="email"
                        onChange={onChange}
                      />
                    </div>
                    <div className="pt-8">
                      <input
                        placeholder="User Name"
                        className="outline-none text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg px-2 mx-6 py-1 md:text-xs"
                        style={{ width: "55vw", height: "4vh" }}
                        name="username"
                        onChange={onChange}
                      />
                    </div>
                    <div className="pt-8">
                      <input
                        type={passwordShown ? "any" : "password"}
                        placeholder="Password"
                        className="outline-none text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg  px-2 mx-6 py-1 md:text-xs"
                        style={{ width: "55vw", height: "4vh" }}
                        name="password"
                        onChange={onChange}
                      />
                    </div>
                    <div className="pt-8">
                      <input
                        type={passwordShown ? "any" : "password"}
                        placeholder="Confirm Password"
                        className="outline-none text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg px-2 mx-6 py-1 md:text-xs"
                        style={{ width: "55vw", height: "4vh" }}
                        name="verifypassword"
                        onChange={onChange}
                      />
                    </div>
                    <div className="justify-items-start justify-self-start mx-7 pt-3">
                      <input
                        type="checkbox"
                        onClick={() => setPasswordShown((prev) => !prev)}
                      />
                      <span className="text-white pl-2">Show Password</span>
                    </div>
                    <div className="text-red-500 justify-items-start justify-self-start mx-7 pt-3">
                      {error !== "" ? "Error: " + error : null}
                    </div>
                    <div className="pt-6">
                      <button
                        className="text-white bg-homepagetitle border border-transparent rounded-lg px-6 py-2 mr-4"
                        onClick={(e) => {
                          e.preventDefault();
                          signUp();
                        }}
                      >
                        Create Account
                      </button>
                      <button
                        className="text-white bg-homepagetitle border border-transparent rounded-lg px-6 py-2"
                        onClick={() => {
                          setError("");
                          updateFormState(() => ({
                            ...formState,
                            formType: "signIn",
                          }));
                        }}
                      >
                        Back to Sign In
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
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
  );
};

export default login */
}
