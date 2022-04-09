import React from 'react'
import Image from 'next/image'
import Logo from '../../public/icon.png'
import Background from '../../public/login_background.png'

function verify_email_success() {
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
      <div className='relative z-20 text-homepagetitle grid content-center justify-center justify-items-center' style={{height:"80vh"}}>
        <span className='text-4xl'> Congratulation ! Your Account Has Been Created</span>
        <span className='text-4xl pt-2'> Let's Get Started By Loggin Into Your Account ! </span>
        <button className='my-16 bg-navtextbottom text-white text-lg border-2 border-transparent rounded-lg flex items-center justify-center' style={{height:"5vh", width:"16vw"}}>Log In</button>
      </div>
  

    
</div>
  )
}

export default verify_email_success