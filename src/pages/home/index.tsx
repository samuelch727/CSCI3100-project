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
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { Project, ListProjectsQuery } from "../../API";
import { useEffect, useState } from "react";
//import { useUser } from "../context/AuthContext"
import awsconfig from "../../aws-exports"
import Logo from "next/image";
// import {Paper} from "@material-ui/core";

const initialFormState = {
  title: '', language: '', formType: ''
}

export default function Home(props:any) {
  
  API.configure(awsconfig);
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, updateUser] = useState(null)
  const [uname, setUsername] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    checkAdmin()

    async function AccessLoggedInState() {
      try {
          const user = await Auth.currentAuthenticatedUser();
          updateUser(user);
          setUsername(user.username);
          console.log(user);
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
  // const { pid, pName } = router.query;
  // console.log(pid);
  // console.log(pName);
  //const { user } = useUser();
  
  const [ project, setProject ] = useState<any[]>([]);
  const [ sharedProject, setSharedProject ] = useState<any[]>([]);
  const [ title, setTitle ] = useState();
  const [ language, setLanguage ] = useState();
  const [ newProject, setCreateProject ] = useState();
  const [ deletedProject, setDeleteProject ] = useState();
  const [ newcode, setCreateCode ] = useState();
  const [ codeID, setCode ] = useState();
  const [ searchInput, setSearchInput ] = useState("");
  const [ admin, setAdmin] = useState(false);

  // const allProjects = await API.graphql(graphqlOperation(listProjects));
  // project = 10 setProject(10)
  useEffect(() => {
    
    const fetchProject = async ()  => {
        const project = await API.graphql(graphqlOperation(queries.listProjects));
        console.log(project)
        setProject(project.data.listProjects.items)
        // setProject(project.data.items)
        // return project

        const sharedProject = await API.graphql(graphqlOperation(queries.listProjects, {filter: {shareTo: {attributeExists: true}}}))
        console.log(sharedProject.data.listProjects.items)
        setSharedProject(sharedProject.data.listProjects.items)
    };

    fetchProject();

  }, [newProject, deletedProject]); // immediate update the new Project to the home

  const [ formState, updateFormState ] = useState(initialFormState)
  const { formType } = formState

  const createProject = async () => {
    // e.preventDefault()
    // updateFormState(()=>({...formState, [e.target.name]: e.target.value}))
    try {
      const newCode = await API.graphql(graphqlOperation(mutations.createCode, {input: {}}))
      setCode(newCode.data.createCode.id)
      console.log("Sucessfully created code! Code id:", codeID)
      
      const projectDetails = {
        projectName: title,
        language: language,
        projectCodeId: codeID
      }
  
      const newProject = await API.graphql(graphqlOperation(mutations.createProject, {input: projectDetails}))
      setCreateProject(newProject)
      console.log("Sucessfully created with codeID:", newProject.data.createProject.projectCodeId)
    } catch (error) {
      setError(error.toString());
      console.log('there was an error creating project', error)
    }
  }

  const deleteProject = async (pid: string) => {
    try {
      const deletedProject = await API.graphql(graphqlOperation(mutations.deleteProject, {input: {id: pid}}))
      setDeleteProject(deletedProject)
      console.log("Successfully deleted!")
    } catch (e) {
      console.log("There is error in deleting!", e)
    }
    
  }
  
  const signOut = async () => {
    try {
      await Auth.signOut();
      setLoggedIn(false);
      router.push("/")
    } catch (error) {
      console.log('error signing out ', error);
    }
  };

  const checkAdmin = async() => {
    const user =  await Auth.currentAuthenticatedUser();
    // console.log(user)
    const group = user.signInUserSession.accessToken.payload["cognito:groups"]
    
    if (group.includes('Admin')) {
      setAdmin(true);
      console.log(group)
    }
  }

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

        {console.log("Login Status in home:",loggedIn)}

        <div>Welcome on9 {uname}!</div>

        {
          admin ? <div><button onClick={()=>router.push("/home/admin")}>Manage User</button></div> : <div>Not Admin</div>
        }
        

        <div>
          <input value={searchInput} placeholder="Search here..." onChange={(e)=>{setSearchInput(e.target.value)}} />
          {searchInput !== "" ? 
          <div>
            {project.map(item=>{
              if (item.projectName.includes(searchInput)) {
                return (
                  <li key={item.id}>
                    <button onClick={()=>{console.log("Onclick:", item.id)}}>{item.projectName}{item.language}{item.updatedAt}{item.shareTo}</button>
                  </li>
                )
              }
            })}
          </div>: null}
        </div>

        <div>
          <button onClick={()=>router.push("/home/user")}>Go to User</button>
        </div>
        
        {console.log("formType: ", formType)}
        {/* <div><Button onClick={()=>createCode()}>Create Code</Button></div> */}
        <div><Button onClick ={()=> {
                if (formType == "") {
                  updateFormState(()=> ({...formState, formType: "createProject"}))
                } else if (formType == "createProject") {
                  updateFormState(()=> ({...formState, formType: ""}))
                }
              }}>+</Button></div>
        { formType==='createProject' && (
          <div>
            {/* <form className="createProject" onSubmit={()=>createProject()}> */}
              <h1>Enter your Project Title:</h1>
              <input id="title" name="title" placeholder="Enter project title" onChange={e=> setTitle(e.target.value)}/><br />
              <h1>Choose language:</h1>
              <button value="PYTHON" id="python" name="python" onClick={e=> setLanguage(e.target.value)}>PYTHON</button><br />
              <button value="C" id="c" name="c" onClick={e=> setLanguage(e.target.value)}>C</button><br />
              <button value="C++" id="c++" name="c++" onClick={e=> setLanguage(e.target.value)}>C++</button><br />
              <button value="JAVA" id="java" name="java" onClick={e=> setLanguage(e.target.value)}>JAVA</button><br />
              <Button onClick={()=>createProject()}>Create</Button>
              <Button className="cancelButton" onClick ={()=> {
                updateFormState(()=> ({...formState, formType: ""}))}}>Cancel</Button>
              <div>New Project to be created: <br/>
                Title: {title} <br />
                Language: {language}
              </div>
              <div>
              { error != null ? error : null }
              </div>
          </div>
          )
        }
        
        <br/>

        <div className="projectList">
          <h1><b>All Projects</b></h1>
          {
            loggedIn && project.map(item => {
              return (
                <li key={item.id}>
                  <button onClick={()=>{console.log("Onclick:", item.id)}}>
                    {item.projectName}{item.language}{item.updatedAt}
                    {item.shareTo!=null ? <p>{item.shareTo}</p> : null}
                  </button>
                  <button value={item.id} onClick={e=>deleteProject(e.target.value)}>Delete</button>
                </li>
              )
            })
          }
        </div>

        <div className="sharedProjectList">
          <h1><b>Projects that Share to you</b></h1>
          {
            loggedIn && sharedProject.map(item => {
              return (
                <li key={item.id}>
                  <button onClick={()=>{console.log("Onclick:", item.id)}}>
                  {item.projectName}{item.language}{item.updatedAt}{item.shareTo}</button>
                  <button value={item.id} onClick={e=>deleteProject(e.target.value)}>Delete</button>
                </li>
              )  
            })
          }
          
        </div>
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
