import React from 'react'
import Image from 'next/image'
import Logo from '../../public/icon.png'

function home() {
  return (
    <div>
        <div className='flex justify-center items-center bg-navbg'> 
          <div className='inline-block w-20 h-20 px-1 flex justify-center items-center'>
            <Image src={Logo}
                  alt="logo"/>
          </div>
            <h1 className='inline text-4xl text-transparent bg-clip-text bg-gradient-to-b from-navtexttop via-navtextmiddle to-navtextbottom'>CodeCodeGuide</h1>
        </div>
    </div>
  )
}

export default home