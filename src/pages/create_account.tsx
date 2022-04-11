import React,{useState} from 'react'
import Image from 'next/image'
import Logo from '../../public/icon.png'
import Background from '../../public/login_background.png'

function create_account() {
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

        <div className='relative z-20 flex justify-end p-8'> 
                <button className='text-white bg-homepagetitle border-2 border-transparent rounded-lg px-4 py-2 text-center'>Log In</button>
        </div>

        <div className='relative z-20 grid content-center justify-items-center'>
            <span className='text-homepagetitle text-3xl font-semibold'>Create Your CodeCodeGuide Account</span>
        </div>

        <div className='relative z-20 pt-8 grid content-center justify-center'>
            <form className='grid bg-zinc-800 bg-opacity-60 justify-center content-center border border-transparent rounded-lg' style={{height:"55vh", width:"70vw"}}>
                <div className='grid justify-center content-center justify-items-center' style={{height:"55vh", width:"55vw"}}>
                <div >
                    <input placeholder='Your Email Address' className='outline-none text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg px-2 mx-6 py-1 md:text-xs' style={{width:"55vw",height:'4vh'}}/>
                </div>
                <div className='pt-8'>
                    <input placeholder='User Name' className='outline-none text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg px-2 mx-6 py-1 md:text-xs' style={{width:"55vw",height:'4vh'}}/>
                </div>
                <div className='pt-8'>
                    <input type={passwordShown?'any':"password"} placeholder='Password' className='outline-none text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg  px-2 mx-6 py-1 md:text-xs' style={{width:"55vw",height:'4vh'}}/>
                </div>
                <div className='pt-8'>
                    <input type={passwordShown?'any':"password"} placeholder='Confirm Password' className='outline-none text-white bg-inputboxcolor bg-opacity-20 border-transparent rounded-lg px-2 mx-6 py-1 md:text-xs' style={{width:"55vw",height:'4vh'}}/>
                </div>
                <div className='justify-items-start justify-self-start mx-7 pt-3'>
                    <input type="checkbox" onClick={() =>setPasswordShown((prev) => !prev)}/>
                    <span className='text-white pl-2'>Show Password</span>
                </div>
                <div className='pt-6'>
                <button className='text-white bg-homepagetitle border border-transparent rounded-lg px-6 py-2'>Create Account</button>
                </div>
                </div>
            </form>
        </div>
            

        
    </div>
  )
}

export default create_account