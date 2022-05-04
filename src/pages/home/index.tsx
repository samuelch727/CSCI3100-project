/**
 * @description home page after user login to their account
 * @author Lee Yu Hin, Hui Nga Yin, Kwong Wai Hang
 * @version 1.0 (29 April 22)
 * 
 * CONST initialFormState
 * FUNCTION classNames
 * FUNCTION Home(props: any)
 */

import Head from "next/head";
import { Auth } from "aws-amplify";
import { Button } from "@aws-amplify/ui-react";
import Link from "next/link";
import { ConsoleLogger } from "@aws-amplify/core";
import { useRouter } from "next/router";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { Project, ListProjectsQuery } from "../../API";
import { useEffect, useState } from "react";
import awsconfig from "../../aws-exports";
import React from "react";
import Image from "next/image";
import Background from "../../../public/login_background.png";
import Header from "../../components/header";
import { Tab } from "@headlessui/react";

/**
 * Initialize the form state
 */
const initialFormState = {
  title: "",
  language: "",
  formType: "",
};

//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Home Page Component 
 * The function get the user's login status, allow
 * logged-in user create new projects, click into the project
 * they own or shared to them
 * 
 * @returns {JSX.Element} - Home Page Component 
 */
export default function Home(props: any) {
  API.configure(awsconfig);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, updateUser] = useState(null);
  const [uname, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Check the login status of a user
     */
    async function AccessLoggedInState() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        try {
          const group =
            user.signInUserSession?.accessToken?.payload["cognito:groups"];

          if (group.includes("Admin")) {
            setAdmin(true);
            // console.log(group)
          }
        } catch {}
        updateUser(user);
        setUsername(user.username);
        console.log(user);
        setLoggedIn(true);
        // router.push("/home");
        return true;
      } catch {
        setLoggedIn(false);
        console.log("fail login");
        return false;
      }
    }

    AccessLoggedInState();
  }, []);

  const router = useRouter();

  const [project, setProject] = useState<any[]>([]);
  const [sharedProject, setSharedProject] = useState<any[]>([]);
  const [title, setTitle] = useState();
  const [language, setLanguage] = useState("");
  const [newProject, setCreateProject] = useState();
  const [deletedProject, setDeleteProject] = useState();
  const [newcode, setCreateCode] = useState();
  const [codeID, setCode] = useState();
  // variable store and change the status of the hambuger menu
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [createMenu, setCreateMenu] = useState(false);

  /**
   * Get project of the user from the database
   */
  const fetchProject = async () => {
    const project = await API.graphql(graphqlOperation(queries.listProjects));
    //@ts-ignore
    console.log("fetched project", project.data.listProjects.items);
    //@ts-ignore
    setProject(project.data.listProjects.items);
    // setProject(project.data.items)
    // return project

    const sharedProject = await API.graphql(
      graphqlOperation(queries.listProjects, {
        filter: { shareTo: { attributeExists: true } },
      })
    );
    //@ts-ignore
    console.log(sharedProject.data.listProjects.items);
    //@ts-ignore
    setSharedProject(sharedProject.data.listProjects.items);
    setLoading(false);
  };

  useEffect(() => {
    fetchProject();
  }, []); // immediate update the new Project to the home

  const [formState, updateFormState] = useState(initialFormState);
  const { formType } = formState;

  /**
   * Handle the process of creating a new project
   */
  const createProject = async () => {
    try {
      const newCode = await API.graphql(
        graphqlOperation(mutations.createCode, { input: {} })
      );
      //@ts-ignore
      setCode(newCode.data.createCode.id);
      // const codeID = newCode.id
      // setCode()
      console.log(
        "Sucessfully created code! Code id:",
        //@ts-ignore
        newCode.data.createCode.id
      );

      const projectDetails = {
        projectName: title,
        language: language,
        //@ts-ignore
        projectCodeId: newCode.data.createCode.id,
      };

      const newProject = await API.graphql(
        graphqlOperation(mutations.createProject, { input: projectDetails })
      );
      //@ts-ignore
      setCreateProject(newProject);
      //@ts-ignore
      console.log(
        "Sucessfully created with codeID:",
        //@ts-ignore
        newProject.data.createProject.projectCodeId
      );
    } catch (error) {
      //@ts-ignore
      setError(error.toString());
      console.log("there was an error creating project CodeID:", error);
    }
    fetchProject();
  };

  /**
   * Handle the process of deleting an existing project
   * @param {string} pid - The project ID of the project.
   */
  const deleteProject = async (pid: string) => {
    try {
      const deletedProject = await API.graphql(
        graphqlOperation(mutations.deleteProject, { input: { id: pid } })
      );
      //@ts-ignore
      setDeleteProject(deletedProject);
      fetchProject();
      console.log("Successfully deleted!");
    } catch (e) {
      console.log("There is error in deleting!", e);
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setLoggedIn(false);
      router.push("/");
    } catch (error) {
      console.log("error signing out ", error);
    }
  };

  return (
    <div className="bg-black opacity-100" style={{ height: "100vh" }}>
      <main>
        <div
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            top: "0",
            right: "0",
            zIndex: "0",
          }}
        >
          <Image src={Background} layout="fill" />

          <Header />

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
                <div>
                  <input
                    value={searchInput}
                    placeholder="Search here..."
                    className="text-white bg-transparent outline-none"
                    style={{ height: "4vh" }}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                    }}
                  />
                </div>
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
                  ? "grid relative z-10 ml-14 mt-14 "
                  : "grid relative z-10 ml-40 mt-14 "
              }
              style={isNavOpen ? { width: "70vw" } : { width: "80vw" }}
            >
              <div
                className={
                  isNavOpen
                    ? "pt-6 grid grid-cols-5 auto-cols-min auto-rows-min gap-4 "
                    : " pt-6 grid grid-cols-6 grid-rows-1 auto-cols-min auto-rows-min gap-4 "
                }
              >
                <div className="grid content-start justify-start ">
                  <div className="pt-8"></div>
                  <div
                    className="flex pr-4 items-center "
                    style={{ width: "80vw" }}
                  >
                    <span
                      className={
                        isNavOpen
                          ? "text-2xl text-homepagetitle font-semibold pl-3 w-fit pr-4"
                          : "text-2xl text-homepagetitle font-semibold pl-1 w-fit pr-4"
                      }
                    >
                      New Project
                    </span>
                    <button
                      className="grid content-center justify-center text-homepagetitle border border-homepagetitle rounded-lg w-6 h-6 subpixel-antialiased"
                      onClick={() => setCreateMenu(() => true)}
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
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>
                  </div>

                  <div
                    className={
                      isNavOpen
                        ? "pt-4 grid grid-cols-1 auto-cols-min auto-rows-min gap-4"
                        : "pt-4 grid grid-cols-1 auto-cols-min auto-rows-min gap-4"
                    }
                  >
                    <div
                      className={
                        createMenu
                          ? "grid content-center justify-center"
                          : "hidden grid content-center justify-center"
                      }
                    >
                      <form
                        className="border border-homepagetitle rounded-lg grid content-center justify-center"
                        style={
                          isNavOpen
                            ? { width: "69vw", height: "40vh" }
                            : { width: "79vw", height: "40vh" }
                        }
                      >
                        <div
                          style={
                            isNavOpen ? { width: "59vw" } : { width: "69vw" }
                          }
                          className="row-start-1 row-span-1 grid content-center justify-end"
                        >
                          <button
                            className="text-homepagetitle"
                            onClick={(e) => {
                              e.preventDefault();
                              setCreateMenu((prev) => false);
                            }}
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>

                        <div
                          className="row-start-2 row-span-1 grid content-center justify-center items-center h-fit"
                          style={{ width: "80vw" }}
                        >
                          <span className="text-homepagetitle w-full text-xl p-1">
                            Title:{" "}
                          </span>
                          <input
                            placeholder="Your Project Title"
                            style={{ width: "40vw", height: "5vh" }}
                            className="outline-none text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg py-2 px-4"
                            onChange={(e) => {
                              //@ts-ignore
                              setTitle(e.target.value);
                            }}
                            value={title}
                          ></input>
                        </div>

                        <div className="row-start-3 row-span-1 grid content-center justify-center items-center pt-4 h-fit">
                          <span className="text-homepagetitle w-full text-xl p-1">
                            Language:
                          </span>

                          <Tab.Group>
                            <Tab.List
                              className="flex p-1 space-x-1 bg-homepagetitle rounded-xl"
                              style={{ width: "40vw" }}
                            >
                              <Tab
                                className={({ selected }) => {
                                  selected && setLanguage("C");
                                  return classNames(
                                    "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg px-5",
                                    "focus:outline-none  ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                                    selected
                                      ? "bg-white shadow"
                                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                                  );
                                }}
                              >
                                C
                              </Tab>
                              <Tab
                                onSelect={() => setLanguage(() => "CPP")}
                                className={({ selected }) => {
                                  selected && setLanguage("CPP");
                                  return classNames(
                                    "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg px-5 outline-none",
                                    "focus:outline-none ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                                    selected
                                      ? "bg-white shadow outline-none"
                                      : "text-blue-100 hover:bg-white/[0.12] outline-none hover:text-white"
                                  );
                                }}
                              >
                                C++
                              </Tab>
                              <Tab
                                className={({ selected }) => {
                                  selected && setLanguage("PYTHON");
                                  return classNames(
                                    "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg px-5",
                                    "focus:outline-none ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                                    selected
                                      ? "bg-white shadow"
                                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                                  );
                                }}
                              >
                                Python
                              </Tab>
                              <Tab
                                className={({ selected }) => {
                                  selected && setLanguage("JAVA");
                                  return classNames(
                                    "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg px-5",
                                    "focus:outline-none ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                                    selected
                                      ? "bg-white shadow"
                                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                                  );
                                }}
                              >
                                Java
                              </Tab>
                            </Tab.List>
                          </Tab.Group>
                        </div>

                        <div className="grid content-center justify-center h-fit pt-6">
                          <button
                            className="text-white text-lg font-bold text-white flex items-center justify-center bg-homepagetitle border border-transparent rounded-lg w-fit"
                            onClick={(e) => {
                              e.preventDefault();
                              createProject();
                              setCreateMenu(false);
                            }}
                            style={{ height: "4vh", width: "14vw" }}
                          >
                            Create Project
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="grid content-center justify-center relative z-20"
                style={
                  isNavOpen
                    ? { width: "70vw", height: "60vh" }
                    : { width: "80vw", height: "60vh" }
                }
              >
                <div className="pt-8"></div>

                <span
                  className={
                    isNavOpen
                      ? "text-2xl text-homepagetitle font-semibold pl-3"
                      : "text-2xl text-homepagetitle font-semibold pl-1 pb-5"
                  }
                  style={isNavOpen ? { width: "70vw" } : { width: "80vw" }}
                >
                  My Project
                </span>

                <div className="overflow-scroll" style={{ height: "50vh" }}>
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
                  {loggedIn &&
                    !loading &&
                    project.map((item) => {
                      const projectTime = new Date();
                      projectTime.setTime(Date.parse(item.updatedAt));
                      console.log("map: ", item);
                      if (
                        searchInput === "" ||
                        item.projectName
                          .toLowerCase()
                          .includes(searchInput.toLowerCase())
                      )
                        return (
                          <div
                            className={
                              isNavOpen
                                ? "pt-6 grid grid-cols-5 auto-cols-min auto-rows-min gap-4"
                                : "pt-6 grid grid-cols-6 grid-rows-1 auto-cols-min auto-rows-min gap-4"
                            }
                          >
                            <div
                              className="flex content-start justify-start border border-homepagetitle rounded-lg"
                              style={
                                isNavOpen
                                  ? { width: "69vw", height: "6vh" }
                                  : { width: "79vw", height: "6vh" }
                              }
                            >
                              <button
                                className="py-2 px-4  text-homepagetitle flex content-center justify-between items-center"
                                style={
                                  isNavOpen
                                    ? { width: "59vw", height: "6vh" }
                                    : { width: "69vw", height: "6vh" }
                                }
                                onClick={() => {
                                  router.push(`/project/${item.id}`);
                                }}
                              >
                                <div style={{ width: "12vw" }}>
                                  <span
                                    className="pl-6 text-lg"
                                    style={{ width: "12vw" }}
                                  >
                                    {item.projectName}
                                  </span>
                                </div>
                                <span
                                  style={{ width: "12vw" }}
                                  className="grid content-center"
                                >
                                  {item.language}
                                </span>
                                <div className="grid  content-center items-center justify-items-end justify-end">
                                  <span className="pr-3">
                                    {"Last edit time: " +
                                      projectTime.getDate() +
                                      "/" +
                                      projectTime.getMonth() +
                                      " " +
                                      projectTime.getHours() +
                                      ":" +
                                      projectTime.getMinutes()}
                                  </span>
                                </div>
                                <div className="flex content-center items-center">
                                  {item.shareTo != null ? (
                                    <div>
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
                                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                      </svg>
                                    </div>
                                  ) : null}
                                </div>
                              </button>
                              <div className="pl-4 grid content-center text-homepagetitle">
                                {uname === item.owner && (
                                  <button
                                    value={item.id}
                                    onClick={(e) => {
                                      //@ts-ignore
                                      deleteProject(item.id);
                                    }}
                                    className="grid content-center"
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
                    })}
                </div>
              </div>
            </div>
          </div>

          {/* <div><Button onClick={()=>createCode()}>Create Code</Button></div> */}

          <br />

          {/* <div>
            <button onClick={props.signUp}>Help</button>
          </div> */}
        </div>
      </main>
    </div>
  );
}
