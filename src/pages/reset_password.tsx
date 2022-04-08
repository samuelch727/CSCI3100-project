import React from 'react'
import Image from 'next/image'
import Logo from '../../public/icon.png'
import Background from '../../public/login_background.png'

function reset_success() {
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

        <div className='relative z-20 flex justify-end p-8'> 
            <div className='pr-4'>
                <button className='text-white bg-homepagetitle border-2 border-transparent rounded-lg px-5 py-2 text-center'>Log In</button>
            </div>
            <div>
                <button className='text-white bg-homepagetitle border-2 border-transparent rounded-lg px-4 py-2 text-center'>Sign Up</button>
            </div>
        </div>

        <div className='relative z-20 grid content-center justify-center pt-14'>
            <span className='text-homepagetitle text-2xl'>We have sent the confirmation code to your Email !</span>
        </div>

        <div className='relative z-20 pt-8 grid content-center justify-center'>
            <form className='grid bg-zinc-800 bg-opacity-60 justify-center content-center border border-transparent rounded-lg' style={{height:"45vh", width:"60vw"}}>
                <div className=' pt-2 pb-5 px-5'>
                <input placeholder="Confirmation Code" className='bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg py-2 px-4' style={{width:"40vw", height:"5vh"}}/>
                </div>
                <div className='p-5'>
                <input placeholder="New Password" className='bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg py-2 px-4' style={{width:"40vw", height:"5vh"}}/>
                </div>
                <div className='p-5'>
                <input placeholder="Re-Enter New Password" className='bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg py-2 px-4' style={{width:"40vw", height:"5vh"}}/>
                </div>
                <div className='grid justify-items-center pt-6'>
                <button className='py-1 px-6 text-white bg-homepagetitle border border-transparent rounded-lg text-lg '>Reset</button>
                </div>
            </form>
        </div>
            

        
    </div>
  )
}

export default reset_success