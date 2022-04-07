import type { NextPage } from "next";
import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Project.module.css";
import { Auth, } from "aws-amplify";
import {Button} from "@aws-amplify/ui-react";
import Link from "next/link";
import { ConsoleLogger } from "@aws-amplify/core";
//import CodeBlock from "../../components/CodeBlock";
import { useRouter } from "next/router";
//import CodeControlBar from "../../components/CodeControlBar";
import { API, graphqlOperation } from "aws-amplify";
import { getProject, listProjects } from "../../graphql/queries";
import { Project, ListProjectsQuery } from "../../API";
import { useEffect, useState } from "react";
//import { useUser } from "../context/AuthContext"
import awsconfig from "../../aws-exports"
import Logo from "next/image";
// import {Paper} from "@material-ui/core";
// import GraphQLAPI from "@aws-amplify/api-graphql";
// import Login from "../login";

// const QUERY_LIST_OF_COUNTRIES = `
//   {
//     query ListProjects {
//       pid
//       pName
//     }
//   }
// `;


export default function Home(props:any) {
  
  API.configure(awsconfig);
  const [loggedIn,setLoggedIn] = useState(true)
  const [user, updateUser] = useState(null)

  useEffect(() => {

    async function AccessLoggedInState() {
      try {
          const user = await Auth.currentAuthenticatedUser();
          // console.log(user)
          updateUser(user)
          setLoggedIn(true);
          // router.push("/home");
          return true
      } catch {
        setLoggedIn(false);
        return false
      }
    }

    AccessLoggedInState()
  }, [])


  const router = useRouter();
  const { pid, pName } = router.query;
  console.log(pid);
  console.log(pName);
  //const { user } = useUser();
  
  const [project,setProject ] = useState<Project[]>([]) ;
  // const allProjects = await API.graphql(graphqlOperation(listProjects));
  // project = 10 setProject(10)
  useEffect(() => {
    
    const fetchProject = async ()  => {
      const project = await API.graphql(graphqlOperation(listProjects));
      console.log(project)
    };

    fetchProject();
  }, []);
  
  const signOut = async () => {
    try {
      await Auth.signOut();
      setLoggedIn(false);
      router.push("/")
    } catch (error) {
      console.log('error signing out ', error);
    }
  };

 // <CodeBlock language="python" width="100vw" height="90vh" />

  return (
    <div>
       
      <Head>
        <title>Code Code Guide fuck you </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        
        
        <div style={{color: "white", backgroundColor: "black", width:"100%"}}> 
          <p className="text-6xl"><Logo src="/Logo.png" alt="me" width="55" height="50" />Code Code Guide</p></div>
        {/* <nav style={{backgroundColor: "grey"}}>
            <ul>
                <li>
                    <Link href='/'>Back To Home</Link>
                </li>
            </ul>
        </nav> */}

        {console.log("Login Status in home:",loggedIn)}
        {console.log("User:",user)}

        {/* <div className="projectList">
          {
            project.map(project => {
              return <div>{project.id}{project.language}</div> 
            })
          }
        </div> */}
        <div>
          <Button onClick={()=>signOut()}>Sign Out</Button>
        </div>

          {/* <div>
            <button onClick={props.signUp}>Help</button>
          </div> */}
        
      </main>
    </div>
  );
};
