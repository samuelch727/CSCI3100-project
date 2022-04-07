import React from 'react'
import Image from 'next/image'
import Logo from '../../public/icon.png'
import Background from '../../public/login_background.png'

function login() {
  return (
    <div className='bg-black opacity-100' style={{height:"100vh"}}>
        <div style={{position: "absolute", width:"100vw", height: "100vh", top:"0", right:"0", overflow:"hidden"}}>
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

export default login