import React from 'react'
import Image from 'next/image'
import Logo from '../../public/icon.png'
import Background from '../../public/login_background.png'

function verify_email() {
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
    <div className='grid content-center ' style={{height:"80vh"}}>
   <div className='relative z-20 grid content-center justify-center self-center'>
       <span className='text-homepagetitle text-3xl'>Verifying Your Email</span>
   </div>
    <div className='relative z-20 pt-8 grid content-center justify-center'>
        <form className='grid bg-zinc-800 bg-opacity-60 justify-center content-center border border-transparent rounded-lg' style={{height:"35vh", width:"60vw"}}>
            <div style={{width:"40vw"}}>
                <span className='text-xl text-homepagetitle font-bold'>Now Everything Is Almost Done!<br /> We Have Sent A Verification Code To Your Email</span>
            </div>
            <div className='flex justify-between pt-8'>
                <span className='text-white'>Please Input Your Verification Code Here</span>
                <button className='text-sm text-buttoncolor underline'>Re-send Verification Code</button>
            </div>
            <div className='pt-2'>
            <input placeholder="Verification Code" className='bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg py-0.5 px-2' style={{width:"40vw", height:"5.5vh"}}></input>
            </div>
            <div className='pt-8 grid justify-items-center'>
            <button className='text-white bg-homepagetitle border border-transparent rounded-lg' style={{width:"40vw", height:"4.5vh"}}>Reset Password</button>
            </div>
        </form>
    </div>
    </div>


    
</div>
  )
}

export default verify_email