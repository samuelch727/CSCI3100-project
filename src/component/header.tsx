import React from 'react'
import Image from 'next/image'
import Logo from '../../public/icon.png'

function header() {
  return (
    <div className='flex justify-center items-center bg-navbg relative z-10 bg-opacity-80' id='navbar'> 
    <div className='inline-block w-20 h-20 px-2 flex justify-center items-center'>
      <Image src={Logo}
            alt="logo"
            />
    </div>


      <h1 className='z-10 inline text-4xl text-transparent bg-clip-text bg-gradient-to-b from-navtexttop via-navtextmiddle to-navtextbottom'>CodeCodeGuide</h1>
  </div>

  )
}

export default header