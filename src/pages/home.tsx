import React from 'react'
import Image from 'next/image'
import Logo from '../../public/icon.png'
import background from '../../public/home-background.jpg'

function home() {
  return (
    <div style={{background:"black", width:"100vw", height:"100vh"}}>
      <div style={{position: "absolute", width:"100vw", height: "100vh", top:"0", right:"0", overflow:"hidden"}}>
        <Image src={background} className="opacity-30" layout='fill'/>
        </div>
        <div className='flex justify-center items-center bg-navbg relative z-10 bg-opacity-80' id='navbar'> 
          <div className='inline-block w-20 h-20 px-2 flex justify-center items-center'>
            <Image src={Logo}
                  alt="logo"
                  />
          </div>
            <h1 className='z-10 inline text-4xl text-transparent bg-clip-text bg-gradient-to-b from-navtexttop via-navtextmiddle to-navtextbottom'>CodeCodeGuide</h1>
        </div>

        <div className='z-10'> 
          <div className='flex justify-end p-8'>
            <button className='relative z-10 text-white rounded-xl text-xl px-8 py-1.5 bg-navtextbottom'>sign up</button>
          </div>
          <div className='absolute grid top-0 text-center content-center self-center w-full h-screen select-none'>
            <div>
            <span className='relative z-10 text-white text-4xl font-bold sm:text-2xl lg:text-3xl'>Welcome to </span>
            <span className='relative z-10 text-homepagetitle text-4xl font-bold sm:text-2xl lg:text-3xl'>CodeCodeGuide!</span>
            </div>
            <div>
            <h2 className='relative z-10 text-white text-4xl font-bold sm:text-2xl lg:text-3xl'>Log in to start coding now!</h2>
            </div>
          <div className='p-8'>
            <button className='relative z-10 text-white rounded-lg bg-navtextbottom  px-24 py-1.5 hover:shadow'>Log in Account</button>
          </div>
          </div>

        </div>
    </div>

  )
}

export default home