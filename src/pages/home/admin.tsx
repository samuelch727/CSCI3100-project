import { Auth, API } from "aws-amplify";
import { setDefaultResultOrder } from "dns";
import { useEffect, useState } from "react";
import awsconfig from "../../aws-exports";
import { deleteUser } from "../../graphql/mutations";
import Logo from "../../../public/Logo.png";
import Background from "../../../public/login_background.png";
import Image from "next/image";
import { UserGroupIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

export default function Admin(props: any) {
  API.configure(awsconfig);
  // const [user, updateUser] = useState(null)
  const [uname, setUsername] = useState(null);
  // const [pw, setPassword] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [userList, setUserList] = useState([]);
  const [searchUserInput, setSearchUser] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [createProject, setCreateProject] = useState(false);
  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function AccessLoggedInState() {
      // if user is admin?
      try {
        const user = await Auth.currentAuthenticatedUser();
        // updateUser(user);
        setUsername(user.username);
        setLoggedIn(true);
        console.log(user);
        const group =
          user.signInUserSession.accessToken.payload["cognito:groups"];

        if (group.includes("Admin")) {
          setAdmin(true);
          // console.log(group)
        } else {
          router.push("/home");
        }
      } catch (err) {
        router.push("/home");
        setLoggedIn(false);
      }
    }

    AccessLoggedInState();
    listUser();
  }, []);

  // list user in admin page
  //@ts-ignore
  let nextToken;

  async function listUser() {
    let apiName = "AdminQueries";
    let path = "/listUsers";
    let myInit = {
      queryStringParameters: {
        //@ts-ignore
        token: nextToken,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };

    let getAdmin = {
      queryStringParameters: {
        groupname: "Admin",
        //@ts-ignore
        token: nextToken,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };

    const { NextToken2, ...rest2 } = await API.get(
      apiName,
      "/listUsersInGroup",
      getAdmin
    );
    //@ts-ignore
    rest2.Users.map((value) => {
      //@ts-ignore
      if (!adminList.includes(value.Username)) adminList.push(value.Username);
    });
    const { NextToken, ...rest } = await API.get(apiName, path, myInit);
    nextToken = NextToken;
    console.log(rest.Users);
    setUserList(rest.Users);
    // setAdmin(rest2.Users);
    console.log(adminList);
    // console.log(userList)
    setLoading(false);
  }

  // add user to admin grp by search bar
  async function addToGroup(uname: String) {
    let apiName = "AdminQueries";
    let path = "/addUserToGroup";
    let myInit = {
      body: {
        username: uname,
        groupname: "Admin",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };
    API.post(apiName, path, myInit)
      .then(() => {
        console.log("Success add user", uname, "to Admin Group");
        //@ts-ignore
        setAdminList([...adminList, uname]);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
    return;
  }

  // delete user by admin
  async function deleteUser(uname: String, index: number) {
    let apiName = "AdminQueries";
    let path = "/disableUser";
    let myInit = {
      body: {
        username: uname,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };
    await API.post(apiName, path, myInit)
      .then(() => {
        console.log("Success delete user", uname);
        setUserList(userList.filter((_, i) => i !== index));
      })
      .catch((err) => {
        console.log("error: ", err);
      });
    return;
  }

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
                    style={{ height: "3vh" }}
                    className="pr-2 ml-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
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
              ? "relative z-10 ml-14 mt-14 overflow-scroll"
              : "relative z-10 ml-40 mt-14 overflow-scroll"
          }
          style={
            isNavOpen
              ? { width: "70vw", height: "75vh" }
              : { width: "80vw", height: "75vh" }
          }
        >
          <div className="pt-8"></div>
          <div
            className={
              isNavOpen
                ? "relative z-10 mt-14 overflow-scroll flex pl-2 pr-4  justify-between  "
                : "relative z-10 mt-14 overflow-scroll flex pl-2 pr-4  justify-between  "
            }
          >
            <span
              className={
                isNavOpen
                  ? "text-2xl text-homepagetitle font-semibold pl-3 w-fit pr-4"
                  : "text-2xl text-homepagetitle font-semibold pl-1 w-fit pr-4"
              }
            >
              Manage User
            </span>
            <input
              placeholder="Search"
              className="bg-inputboxcolor text-white bg-opacity-30 border border-gray-500  rounded-lg pl-2 outline-none h-fit"
              value={searchUserInput}
              onChange={(e) => {
                setSearchUser(e.target.value);
              }}
            />
          </div>
          <div
            className={
              isNavOpen
                ? "pt-4 grid grid-cols-1 auto-cols-min auto-rows-min gap-4"
                : "pt-4 grid grid-cols-1 auto-cols-min auto-rows-min gap-4"
            }
          >
            <div className="grid content-center justify-center">
              {loading && (
                <>
                  <div
                    className="animate-pulse py-2 px-4 border border-homepagetitle bg-homepagetitle rounded-lg text-homepagetitle flex content-center justify-between items-center my-2"
                    style={
                      isNavOpen
                        ? { width: "69vw", height: "6vh" }
                        : { width: "79vw", height: "6vh" }
                    }
                  ></div>
                  <div
                    className="animate-pulse py-2 px-4 border border-homepagetitle bg-homepagetitle rounded-lg text-homepagetitle flex content-center justify-between items-center my-2"
                    style={
                      isNavOpen
                        ? { width: "69vw", height: "6vh" }
                        : { width: "79vw", height: "6vh" }
                    }
                  ></div>
                  <div
                    className="animate-pulse py-2 px-4 border border-homepagetitle bg-homepagetitle rounded-lg text-homepagetitle flex content-center justify-between items-center my-2"
                    style={
                      isNavOpen
                        ? { width: "69vw", height: "6vh" }
                        : { width: "79vw", height: "6vh" }
                    }
                  ></div>
                  <div
                    className="animate-pulse py-2 px-4 border border-homepagetitle bg-homepagetitle rounded-lg text-homepagetitle flex content-center justify-between items-center my-2"
                    style={
                      isNavOpen
                        ? { width: "69vw", height: "6vh" }
                        : { width: "79vw", height: "6vh" }
                    }
                  ></div>
                </>
              )}
              {!loading &&
                userList.map((user, index) => {
                  //@ts-ignore
                  if (!user.Enabled) return;
                  if (
                    searchUserInput === "" ||
                    //@ts-ignore
                    user.Username.includes(searchUserInput)
                  ) {
                    return (
                      <div
                        className="py-2 px-4 border border-homepagetitle rounded-lg text-homepagetitle flex content-center justify-between items-center my-2"
                        key={index}
                        style={
                          isNavOpen
                            ? { width: "69vw", height: "6vh" }
                            : { width: "79vw", height: "6vh" }
                        }
                      >
                        <span className="pl-6 text-lg">
                          {
                            //@ts-ignore
                            user.Username
                          }
                        </span>
                        <div className="flex items-center justify-items-end justify-end">
                          {//@ts-ignore
                          adminList.includes(user.Username) ? (
                            <div className=" w-fit relative z-20 mr-4 text-gray-300">
                              Admin
                            </div>
                          ) : (
                            <button
                              className="relative z-20 underline hover:text-navtexttop mr-4"
                              //@ts-ignore
                              value={user.Username}
                              //@ts-ignore
                              onClick={(e) => addToGroup(e.target.value)}
                            >
                              Promote to Admin
                            </button>
                          )}
                          <div className="flex content-center ">
                            {//@ts-ignore
                            adminList.includes(user.Username) ? null : (
                              <button
                                className="relative z-20 pr-2 hover:text-navtexttop"
                                //@ts-ignore
                                value={user.Username}
                                //@ts-ignore
                                onClick={(e) =>
                                  deleteUser(user.Username, index)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
