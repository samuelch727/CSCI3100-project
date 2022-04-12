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
// import {Paper} from "@material-ui/core";
import React from 'react'
import Image from 'next/image'
import Background from '../../../public/login_background.png'
import Header from '../../component/header'

const initialFormState = {
  title: '', language: '', formType: ''
}

export default function Home(props:any) {
  
  API.configure(awsconfig);
  const [loggedIn,setLoggedIn] = useState(false)
  const [user, updateUser] = useState(null)
  const [uname, setUsername] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {

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
  const [isNavOpen, setIsNavOpen] = useState(false); 

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
      // const codeID = newCode.id
      // setCode()
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
      console.log('there was an error creating project CodeID:', error)
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

 // <CodeBlock language="python" width="100vw" height="90vh" />

  return (
    <div className='bg-black opacity-100' style={{height:"100vh"}}>      
      <Head>
        <title>Code Code Guide fuck you </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>        
      
        <div style={{position: "absolute", width:"100vw", height: "100vh", top:"0", right:"0", overflow:"hidden", zIndex:"0"}}>
        <Image src={Background} layout="fill"/>
        
        <Header />

        <div className='bg-zinc-700 relative z-1 flex items-center justify-between px-8' style={{height:"8vh"}}>
            <button className={'relative z-1 outline-none'} onClick={() => setIsNavOpen((prev) => !prev)}>
            <svg xmlns="http://www.w3.org/2000/svg" className={isNavOpen ?"text-gray-900":"text-white"} style={{height:'4vh'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />   
            </svg>
            </button>
            <div className='flex border border-transparent rounded-lg bg-inputboxcolor bg-opacity-20 pl-4' style={{width:'20vw'}}>
            <div style={{height:'4vh', width:'2vw'}} className=' grid content-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="text-zinc-500 pr-12"  style={{height:"3vh"}}fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            </div>
            <form>
                <input placeholder='Search' className='text-white bg-transparent outline-none' style={{height:'4vh'}}/>
            </form>
            </div>
            <div className='flex content-center items-center'>
            <button className='pr-4 outline-none'> 
                <svg xmlns="http://www.w3.org/2000/svg" className="text-white active:text-gray-900" style={{height:"5vh"}}fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <div>
            
            </div>
        </div>
        </div>





        <div className='grid grid-cols-7'>
            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div className='relative z-10 grid col-span-1 col-start-1 bg-zinc-700 grid-row-3 content-start' style={{height:'82.5vh'}}>
                <style>{`
                 .hideMenuNav{
                     display:none
                 }
                `}</style>
                <div className='row-span-1 col-start-1 border-y border-zinc-600 grid content-center justify-start' style={{height:'8vh'}}>
                    <button className='text-white text-xl font-bold flex text-white flex items-center justify-start' style={{height:'8vh'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{height:'3vh'}} className='pr-2 ml-6'viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        Home
                    </button>
                </div>
                <div className='row-span-1 col-start-1  border-y border-zinc-600 grid content-center justify-start' style={{height:'8vh'}}>
                    <button className='text-white text-xl font-bold flex text-white flex items-center justify-start' style={{height:'8vh'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{height:'3vh'}} className='pr-2 ml-6' viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                        </svg>
                        My Project
                    </button>
                </div>
                <div className='row-span-1 col-start-1  border-y border-zinc-600 grid content-center justify-start' style={{height:'8vh'}}>
                    <button className='text-white text-xl font-bold flex text-white flex items-center justify-start' style={{height:'8vh'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{height:'3vh'}} className='pr-2 ml-6' viewBox="0 0 20 20" fill="currentColor">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                        Shared Project
                    </button>
                </div>
            </div>
            </div>


            {console.log("Login Status in home:",loggedIn)}
        <div>Welcome on9 {uname}!</div>
        {console.log("formType: ", formType)}

        <div className="projectList">
          <h1><b>All Projects</b></h1>
          {
            loggedIn && project.map(item => {
              return (
                <li key={item.id}>
                  {item.projectName}{item.language}{item.updatedAt}
                  {item.shareTo!=null ? <p>{item.shareTo}</p> : <p></p>}
                  <button value={item.id} onClick={e=>deleteProject(e.target.value)}>Delete</button>
                </li>
              )
            })
          }
        </div>


          <div className={isNavOpen?'relative z-10 ml-14 mt-14':'relative z-10 ml-40 mt-14'} style={isNavOpen?{width:'70vw'}:{width:'80vw'}}>
            <span className={isNavOpen?'text-2xl text-homepagetitle font-semibold pl-3':'text-2xl text-homepagetitle font-semibold pl-1'} style={{width:'20vw'}}>Recent Project</span>
            <div className={isNavOpen?'pt-6 grid grid-cols-5 grid-rows-2 auto-cols-min auto-rows-min gap-4':'pt-6 grid grid-cols-6 grid-rows-1 auto-cols-min auto-rows-min gap-4'}>
              <div className='grid content-center justify-center'>
              {
            loggedIn && project.map(item => {
              return (
                <li key={item.id}>
                  {item.projectName}{item.language}{item.updatedAt}
                  {item.shareTo!=null ? <p>{item.shareTo}</p> : <p></p>}
                  <button value={item.id} onClick={e=>deleteProject(e.target.value)}>Delete</button>
                </li>
              )
            })
          }
              </div>
                
            </div>




                
                <div className='pt-8'></div>
                 <span className={isNavOpen?'text-2xl text-homepagetitle font-semibold pl-3':'text-2xl text-homepagetitle font-semibold pl-1'} style={{width:'20vw'}}>Recent Project</span>
                 <div className={isNavOpen?'pt-6 grid grid-cols-1 auto-cols-min auto-rows-min gap-4':'pt-6 grid grid-cols-1 auto-cols-min auto-rows-min gap-4'}>
                 <div  className='grid content-center justify-center' >
                    <button className='py-2 px-4 border border-homepagetitle rounded-lg text-homepagetitle flex content-center justify-between items-center' style={isNavOpen?{width:'69vw',height:'6vh'}:{width:'79vw',height:'6vh'}}>
                        <span className='pl-6 text-lg'> Project Name</span>
                        <div className='grid grid-cols-2 content-center items-center justify-items-end justify-end'>
                        <span className='pr-3'>last edit time</span> 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        </div>
                    </button>
                 </div>
                 <div  className='grid content-center justify-center' >
                    <button className='py-2 px-4 border border-homepagetitle rounded-lg text-homepagetitle flex content-center justify-between items-center' style={isNavOpen?{width:'69vw',height:'6vh'}:{width:'79vw',height:'6vh'}}>
                        <span className='pl-6 text-lg'> Project Name</span>
                        <div className='grid grid-cols-2 content-center items-center justify-items-end justify-end'>
                        <span className='pr-3'>last edit time</span> 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        </div>
                    </button>
                 </div>
                
                </div>
                
            </div>

            
        </div>


        {/* <div><Button onClick={()=>createCode()}>Create Code</Button></div> */}
        <div><Button onClick ={()=> {
                updateFormState(()=> ({...formState, formType: "createProject"}))
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
              { error != null ? error : <div></div> }
              </div>
          </div>
          )
        }
        
        <br/>

        <div className="sharedProjectList">
          <h1><b>Projects that Share to you</b></h1>
          {
            loggedIn && sharedProject.map(item => {
              return (
                <li key={item.id}>
                  {item.projectName}{item.language}{item.updatedAt}{item.shareTo}
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
        </div>
      </main>
    </div>
  );
};


{/* import React from 'react'
import Image from 'next/image'
import Logo from '../../public/icon.png'
import Background from '../../public/login_background.png'
import {useState} from 'react'

function Project_home() {
    const [isNavOpen, setIsNavOpen] = useState(false); 
  return (
    <div className='bg-black opacity-100' style={{height:"100vh"}}>
        <div style={{position: "absolute", width:"100vw", height: "100vh", top:"0", right:"0", overflow:"hidden", zIndex:"0"}}>
        <Image src={Background} layout="fill"/>
        </div>
        <div className='flex justify-center items-center bg-navbg relative z-10 bg-opacity-80' id='navbar'> 
          <div className='inline-block w-20 h-20 px-2 flex justify-center items-center'>
            <Image src={Logo}
                  alt="logo"
                  />
          </div>
            <h1 className='z-10 inline text-4xl text-transparent bg-clip-text bg-gradient-to-b from-navtexttop via-navtextmiddle to-navtextbottom'>CodeCodeGuide</h1>
        </div>




        
        <div className='bg-zinc-700 relative z-1 flex items-center justify-between px-8' style={{height:"8vh"}}>
            <button className={'relative z-1 outline-none'} onClick={() => setIsNavOpen((prev) => !prev)}>
            <svg xmlns="http://www.w3.org/2000/svg" className={isNavOpen ?"text-gray-900":"text-white"} style={{height:'4vh'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />   
            </svg>
            </button>
            <div className='flex border border-transparent rounded-lg bg-inputboxcolor bg-opacity-20 pl-4' style={{width:'20vw'}}>
            <div style={{height:'4vh', width:'2vw'}} className=' grid content-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="text-zinc-500 pr-12"  style={{height:"3vh"}}fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            </div>
            <form>
                <input placeholder='Search' className='text-white bg-transparent outline-none' style={{height:'4vh'}}/>
            </form>
            </div>
            <div className='flex content-center items-center'>
            <button className='pr-4 outline-none'> 
                <svg xmlns="http://www.w3.org/2000/svg" className="text-white active:text-gray-900" style={{height:"5vh"}}fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <div>
            
            </div>
        </div>
        </div>





        <div className='grid grid-cols-7'>
            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div className='relative z-10 grid col-span-1 col-start-1 bg-zinc-700 grid-row-3 content-start' style={{height:'82.5vh'}}>
                <style>{`
                 .hideMenuNav{
                     display:none
                 }
                `}</style>
                <div className='row-span-1 col-start-1 border-y border-zinc-600 grid content-center justify-start' style={{height:'8vh'}}>
                    <button className='text-white text-xl font-bold flex text-white flex items-center justify-start' style={{height:'8vh'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{height:'3vh'}} className='pr-2 ml-6'viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        Home
                    </button>
                </div>
                <div className='row-span-1 col-start-1  border-y border-zinc-600 grid content-center justify-start' style={{height:'8vh'}}>
                    <button className='text-white text-xl font-bold flex text-white flex items-center justify-start' style={{height:'8vh'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{height:'3vh'}} className='pr-2 ml-6' viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                        </svg>
                        My Project
                    </button>
                </div>
                <div className='row-span-1 col-start-1  border-y border-zinc-600 grid content-center justify-start' style={{height:'8vh'}}>
                    <button className='text-white text-xl font-bold flex text-white flex items-center justify-start' style={{height:'8vh'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{height:'3vh'}} className='pr-2 ml-6' viewBox="0 0 20 20" fill="currentColor">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                        Shared Project
                    </button>
                </div>
            </div>
            </div>





            <div className={isNavOpen?'relative z-10 ml-14 mt-14':'relative z-10 ml-40 mt-14'} style={isNavOpen?{width:'70vw'}:{width:'80vw'}}>
                <span className={isNavOpen?'text-2xl text-homepagetitle font-semibold pl-3':'text-2xl text-homepagetitle font-semibold pl-1'} style={{width:'20vw'}}>Recent Project</span>
                <div className={isNavOpen?'pt-6 grid grid-cols-5 grid-rows-2 auto-cols-min auto-rows-min gap-4':'pt-6 grid grid-cols-6 grid-rows-1 auto-cols-min auto-rows-min gap-4'}>
                <div className='grid content-center justify-center'>
                <button className='py-2 px-4 border border-homepagetitle rounded-lg text-homepagetitle grid content-center justify-center' style={{width:'12vw',height:'6vh'}}>
                        Checking Game                   
                    </button>
                </div>
                <div className='grid content-center justify-center'>
                <button className='py-2 px-4 border border-homepagetitle rounded-lg text-homepagetitle grid content-center justify-center' style={{width:'12vw',height:'6vh'}}>
                        Project 2                   
                    </button>
                </div>
                <div  className='grid content-center justify-center' >
                <button className='py-2 px-4 border border-homepagetitle rounded-lg text-homepagetitle grid content-center justify-center' style={{width:'12vw',height:'6vh'}}>
                        Project 3                    
                    </button>
                </div>
                <div className='grid content-center justify-center'>
                <button className='py-2 px-4 border border-homepagetitle rounded-lg text-homepagetitle grid content-center justify-center' style={{width:'12vw',height:'6vh'}}>
                        Project 1                    
                    </button>
                </div>
                <div className='grid content-center justify-center'>
                <button className='py-2 px-4 border border-homepagetitle rounded-lg text-homepagetitle grid content-center justify-center' style={{width:'12vw',height:'6vh'}}>
                        Project 2                   
                    </button>
                </div>
                <div  className='grid content-center justify-center' >
                <button className='py-2 px-4 border border-homepagetitle rounded-lg text-homepagetitle grid content-center justify-center' style={{width:'12vw',height:'6vh'}}>
                        Project 3                    
                    </button>
                </div>
                
                </div>




                
                <div className='pt-8'></div>
                 <span className={isNavOpen?'text-2xl text-homepagetitle font-semibold pl-3':'text-2xl text-homepagetitle font-semibold pl-1'} style={{width:'20vw'}}>Recent Project</span>
                 <div className={isNavOpen?'pt-6 grid grid-cols-1 auto-cols-min auto-rows-min gap-4':'pt-6 grid grid-cols-1 auto-cols-min auto-rows-min gap-4'}>
                 <div  className='grid content-center justify-center' >
                    <button className='py-2 px-4 border border-homepagetitle rounded-lg text-homepagetitle flex content-center justify-between items-center' style={isNavOpen?{width:'69vw',height:'6vh'}:{width:'79vw',height:'6vh'}}>
                        <span className='pl-6 text-lg'> Project Name</span>
                        <div className='grid grid-cols-2 content-center items-center justify-items-end justify-end'>
                        <span className='pr-3'>last edit time</span> 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        </div>
                    </button>
                 </div>
                 <div  className='grid content-center justify-center' >
                    <button className='py-2 px-4 border border-homepagetitle rounded-lg text-homepagetitle flex content-center justify-between items-center' style={isNavOpen?{width:'69vw',height:'6vh'}:{width:'79vw',height:'6vh'}}>
                        <span className='pl-6 text-lg'> Project Name</span>
                        <div className='grid grid-cols-2 content-center items-center justify-items-end justify-end'>
                        <span className='pr-3'>last edit time</span> 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        </div>
                    </button>
                 </div>
                
                </div>
                
            </div>

            
        </div>
    </div>
  )
}

export default Project_home */}

