// import "../styles/globals.css";
import Head from "next/head";
import Amplify, { Auth } from "aws-amplify";
import awsExports from "../../aws-exports";
import { Authenticator, Button } from "@aws-amplify/ui-react";
//import "../project/index.css"
import { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { TextField } from "@aws-amplify/ui-react";
// import Index from "../pages/index";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "next/image";
// import SignUp from "../../component/signup";

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
  return (
    <div className="main">
      <div style={{ color: "white", backgroundColor: "black", width: "100%" }}>
        <p className="text-6xl">
          <Logo src="/Logo.png" alt="me" width="55" height="50" />
          Code Code Guide
        </p>
      </div>
      {console.log("formType: ", formType)}
      {user ? (
        children
      ) : (
        <div className="">
          {formType === "signIn" && (
            <div>
              <h1>Log in your CodeCodeGuide account</h1>
              <input
                name="username"
                onChange={onChange}
                placeholder="username"
              />
              <br />
              <input
                name="password"
                type="password"
                onChange={onChange}
                placeholder="password"
              />
              <br />
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
              <Button onClick={() => signIn()}>Sign In</Button>
              <Button
                id="SignUpButton"
                onClick={() => {
                  updateFormState(() => ({ ...formState, formType: "signUp" }));
                  setError("");
                }}
              >
                Sign Up
              </Button>
              <Button
                onClick={() => {
                  updateFormState(() => ({
                    ...formState,
                    formType: "forgotPassword",
                  }));
                  setError("");
                }}
              >
                Forgot Password
              </Button>
            </div>
          )}
          {formType === "signUp" && (
            <div>
              <h1>
                <p className="text-5xl">Log in your CodeCodeGuide account</p>
              </h1>
              <input
                name="username"
                onChange={onChange}
                placeholder="username"
              />
              <br />
              <input
                name="password"
                type="password"
                onChange={onChange}
                placeholder="password"
              />
              <br />
              <input
                name="verifypassword"
                type="password"
                onChange={onChange}
                placeholder="verify password"
              />
              <br />
              <input name="email" onChange={onChange} placeholder="email" />
              <br />
              <input name="name" onChange={onChange} placeholder="nickname" />
              <Button onClick={() => signUp()} onChange={onChange}>
                Sign Up
              </Button>
              <Button
                id="SignInButton"
                onClick={() => {
                  updateFormState(() => ({ ...formState, formType: "signIn" }));
                  setError("");
                }}
              >
                Back to Sign In
              </Button>
            </div>
          )}
          {formType === "confirmSignUp" && (
            <div>
              <input
                name="authCode"
                onChange={onChange}
                placeholder="Confirmation code"
              />
              <Button
                onClick={() => {
                  confirmSignUp();
                  setError("");
                }}
              >
                Confirm Sign Up
              </Button>
              <Button
                onClick={() => {
                  signUp();
                  setError("");
                }}
              >
                Back To Sign Up
              </Button>
            </div>
          )}
          {formType === "forgotPassword" && (
            <div>
              <input
                name="username"
                onChange={onChange}
                placeholder="username"
              />
              <Button
                onClick={() => {
                  forgotPassword();
                  setError("");
                }}
              >
                Reset password
              </Button>
              <Button
                id="SignInButton"
                onClick={() => {
                  updateFormState(() => ({ ...formState, formType: "signIn" }));
                  setError("");
                }}
              >
                Back to Sign In
              </Button>
            </div>
          )}{" "}
          {formType === "forgotPasswordSent" && (
            <div>
              An reset email had been send to your mailbox
              <input
                name="resetCode"
                onChange={onChange}
                placeholder="confirmation code"
              />
              <input
                name="password"
                type="password"
                onChange={onChange}
                placeholder="new password"
              />
              <br />
              <input
                name="verifypassword"
                type="password"
                onChange={onChange}
                placeholder="verify new password"
              />
              <Button
                onClick={() => {
                  setError("");
                  forgotPasswordSubmit();
                }}
              >
                Reset password
              </Button>
              <Button
                id="SignInButton"
                onClick={() => {
                  updateFormState(() => ({ ...formState, formType: "signIn" }));
                  setError("");
                }}
              >
                Back to Sign In
              </Button>
            </div>
          )}
          <div>{error != null ? error : null}</div>
          <div>
            <Link href="/">
              <button>Back to home</button>
            </Link>
          </div>
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
  );
};

export default SignIn;
