import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import awsconfig from "../../../aws-exports";
import { API, graphqlOperation } from "aws-amplify";
import Image from "next/image";
import Logo from "../../../../public/icon.png";
import Background from "../../../../public/login_background.png";
import { useRouter } from "next/router";

export default function User(props: any) {
  API.configure(awsconfig);
  const [user, updateUser] = useState(null);
  const [uname, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  // const [pw, setPassword] = useState(null)
  const [verifyPassword, setVerifyPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [admin, setAdmin] = useState(false);
  const router = useRouter();

  async function changePw() {
    if (newPassword !== verifyPassword) {
      setError("Passwords do not match");
      return;
    }
    Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.changePassword(user, oldPassword, newPassword);
      })
      .then((data) => {
        setSuccess(true);
        console.log(data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  }

  useEffect(() => {
    async function AccessLoggedInState() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const group =
          user.signInUserSession.accessToken.payload["cognito:groups"];

        if (group.includes("Admin")) {
          setAdmin(true);
          // console.log(group)
        }
        setLoggedIn(true);
        console.log(user);
        return true;
      } catch {
        setLoggedIn(false);
        return false;
      }
    }

    AccessLoggedInState();
  }, []);

  // return (
  //   <div>
  //     Hello {user}!<br />
  //     Username: {uname}<br />
  //     Email: {email}<br />
  //     Password: {oldPassword}<br />
  //     <div>
  //       <input value={oldPassword} type="password" placeholder="Enter Your Old Password" onChange={e=> setOldPassword(e.target.value)} />
  //       <input type="password" placeholder="Enter New Password" value = {newPassword}onChange={e=> setNewPassword(e.target.value)} /><br />
  //       {newPassword}<br />
  //       <button onClick={()=>changePw()}>Change</button>
  //     </div>
  //   </div>
  // )
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

      <div
        className="bg-zinc-700 relative z-1 flex items-center justify-between px-8"
        style={{ height: "8vh" }}
      >
        <button
          className={"relative z-1 outline-none"}
          onClick={() => setIsNavOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={isNavOpen ? "text-gray-900" : "text-white"}
            style={{ height: "4vh" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className="flex border border-transparent rounded-lg bg-inputboxcolor bg-opacity-20 pl-4"
          style={{ width: "20vw" }}
        >
          <div
            style={{ height: "4vh", width: "2vw" }}
            className=" grid content-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-zinc-500 pr-12"
              style={{ height: "3vh" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <form>
            <input
              placeholder="Search"
              className="text-white bg-transparent outline-none"
              style={{ height: "4vh", width: "16vw" }}
            />
          </form>
        </div>
        <div className="flex content-center items-center">
          <button
            className="pr-4 outline-none"
            onClick={() => {
              router.push("/home/user");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-white active:text-gray-900"
              style={{ height: "5vh" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <div></div>
        </div>
      </div>

      <div className="grid grid-cols-7">
        <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
          <div
            className="relative z-10 grid col-span-1 col-start-1 bg-zinc-700 grid-row-3 content-start"
            style={{ height: "82.5vh" }}
          >
            <style>{`
           .hideMenuNav{
               display:none
           }
          `}</style>
            <div
              className="row-span-1 col-start-1 border-y border-zinc-600 grid content-center justify-start"
              style={{ height: "8vh" }}
            >
              <button
                className="text-white text-xl font-bold flex text-white flex items-center justify-start"
                style={{ height: "8vh" }}
                onClick={() => {
                  router.push("/home");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ height: "3vh" }}
                  className="pr-2 ml-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Home
              </button>
            </div>
            <div
              className="row-span-1 col-start-1  border-y border-zinc-600 grid content-center justify-start"
              style={{ height: "8vh" }}
            >
              <button
                className="text-white text-xl font-bold flex text-white flex items-center justify-start"
                style={{ height: "8vh" }}
                onClick={() => {
                  router.push("/home/shared");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ height: "3vh" }}
                  className="pr-2 ml-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Shared Project
              </button>
            </div>
            {admin && (
              <div
                className="row-span-1 col-start-1  border-y border-zinc-600 grid content-center justify-start"
                style={{ height: "8vh" }}
              >
                <button
                  className="text-white text-xl font-bold flex text-white flex items-center justify-start"
                  style={{ height: "8vh" }}
                  onClick={() => {
                    router.push("/home/admin");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="pr-2 ml-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    style={{ height: "3vh" }}
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  Manage User
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          className={
            isNavOpen
              ? "relative z-10 grid content-center justify-center col-start-3 col-span-6 justify-items-center"
              : "relative z-10 grid content-center justify-center"
          }
          style={
            isNavOpen
              ? { height: "82.5vh", width: "60vw" }
              : { height: "82.5vh", width: "100vw" }
          }
        >
          <form
            className="grid bg-zinc-800 bg-opacity-60 justify-center content-center border border-transparent rounded-lg"
            style={{ height: "45vh", width: "60vw" }}
          >
            <div className="px-5 flex justify-between">
              <span className="text-homepagetitle text-2xl">
                Change Password
              </span>
              <button
                className="py-1 px-6 text-white bg-homepagetitle border border-transparent rounded-lg text-lg "
                onClick={(e) => {
                  e.preventDefault();
                  console.log("clicked signout");
                  Auth.signOut()
                    .then(() => {
                      console.log("signed out success");
                      router.push("/");
                    })
                    .catch((err) => {
                      console.log("singout error: ", err);
                    });
                }}
              >
                Sing out
              </button>
            </div>
            <div className="p-5">
              <input
                placeholder="Old Password"
                className="bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg py-2 px-4"
                style={{ width: "40vw", height: "5vh" }}
                type="password"
                value={oldPassword}
                onChange={(e) => {
                  e.preventDefault();
                  setOldPassword(e.target.value);
                }}
              />
            </div>
            <div className="p-5">
              <input
                placeholder="New Password"
                className="bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg py-2 px-4"
                style={{ width: "40vw", height: "5vh" }}
                type="password"
                value={newPassword}
                onChange={(e) => {
                  e.preventDefault();
                  setNewPassword(e.target.value);
                }}
              />
            </div>
            <div className="p-5">
              <input
                placeholder="Re-Enter New Password"
                className="bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg py-2 px-4"
                style={{ width: "40vw", height: "5vh" }}
                type="password"
                value={verifyPassword}
                onChange={(e) => {
                  e.preventDefault();
                  setVerifyPassword(e.target.value);
                }}
              />
            </div>
            {success ? (
              <div className="text-green-500 pl-5">
                Password changed successfully.
              </div>
            ) : null}
            <div className="text-red-500 pl-5">
              {error !== "" ? "Error: " + error : ""}
            </div>
            <div className="grid justify-items-center pt-6">
              <button
                className="py-1 px-6 text-white bg-homepagetitle border border-transparent rounded-lg text-lg "
                onClick={(e) => {
                  setSuccess(false);
                  setError("");
                  e.preventDefault();
                  changePw();
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
