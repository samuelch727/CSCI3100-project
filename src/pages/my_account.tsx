import React from 'react'
import Image from 'next/image'
import Logo from '../../public/icon.png'
import Background from '../../public/login_background.png'
import {useState} from 'react'
import userIcon from '../../public/User_Icon.png'

function my_account() {
    const [isNavOpen, setIsNavOpen] = useState(false); 
    const [passwordShown, setPasswordShown] = useState(false)
  return (
    <div className='bg-black opacity-100' style={{height:"100vh"}}>
        <div style={{position: "absolute", width:"100vw", height: "100vh", top:"0", right:"0", overflow:"hidden", zIndex:"0"}}>
        <Image src={Background} layout="fill"/>
        </div>
        {/* <div style={{position: "absolute", width:"100vw", height: "100vh", top:"0", right:"0", overflow:"hidden"}}>
        <Image src={background} className="opacity-30"/>
        </div> */}
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
                <input placeholder='Search' className='text-white bg-transparent outline-none' style={{height:'4vh',width:'16vw'}}/>
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

            <div className='relative z-10 grid content-center justify-center ' style={{height:'82.5vh',width:'100vw'}}>
                <form className='bg-zinc-800 bg-opacity-60 grid justify-center content-center border border-transparent rounded-lg' style={{height:"60vh", width:"60vw"}}>
                    <div className=' grid content-center justify-center justify-items-center ' style={{width:'40vw', height:'60vh'}}>
                    <div className='grid content-center justify-start pl-1 pb-1' style={{width:'40vw'}}>
                        <span className='self-start text-2xl text-homepagetitle'>Account</span>
                    </div>
                    <input placeholder='Username' style={{width:'40vw',height:'4vh'}} className='outline-none text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg py-2 px-4'/>
                    <div style={{width:'40vw',height:'8vh'}} className='flex justify-between pt-2 items-center'>
                        <input placeholder='First Name' style={{width:'19.5vw',height:'4vh'}} className='outline-none text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg py-2 px-4'/>
                        <input placeholder='Last Name' style={{width:'19.5vw',height:'4vh'}} className='outline-none text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg py-2 px-4' />
                    </div>
                    <div style={{width:'40vw',height:'5vh'}} className=' pl-1 grid content-center text-start pt-2 pb-2' >
                        <span className='text-homepagetitle text-2xl '>Email</span>
                    </div>
                        <input type='email' placeholder='Email' style={{width:'40vw',height:'4vh'}} className='outline-none text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg py-2 px-4 mt-2 mb-2' />
                    <div style={{width:'40vw',height:'5vh'}} className=' pl-1 grid content-center text-start pt-4 pb-2' >
                        <span className='text-homepagetitle text-2xl '>Update Password</span>
                    </div>
                    <div style={{width:'40vw',height:'5vh'}} className='flex justify-between pt-2 content-center'>
                        <input type={passwordShown?'any':'password'} placeholder='Current Password' style={{width:'19.5vw',height:'4vh'}} className='outline-none bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg py-2 px-4 text-white'/>
                        <input type={passwordShown?'any':'password'} placeholder='New  Password' style={{width:'19.5vw',height:'4vh'}} className='outline-none text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg py-2 px-4' />
                    </div>
                    <div style={{width:'40vw',height:'5vh'}} className='pl-1 pt-2'>
                        <input type='checkbox' onClick={()=> setPasswordShown((prev) => !prev)}/>
                        <span className='pl-2 text-white opacity-70'>Show Password</span>
                    </div>
                    <div style={{width:'40vw',height:'5vh'}} className='flex justify-end gap-4 pt-4'>
                        <button className='py-1 px-6 text-white bg-homepagetitle border border-transparent rounded-lg text-lg grid content-center justify-center' style={{height:'4.5vh',width:'8vw'}}>Cancel</button>
                        <button className='py-1 px-6 text-white bg-homepagetitle border border-transparent rounded-lg text-lg grid content-center justify-center' style={{height:'4.5vh', width:'8vw'}}>Update</button>
                    </div>
                    </div>
                </form>
            </div>
        </div>    
        
    </div>
  )
}

export default my_account