import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
// import { Auth } from "aws-amplify";
import React from "react";
// import Login from "../components";
import Image from "next/image";
import Logo from "../../public/icon.png";
import background from "../../public/home-background.jpg";
import Header from "../components/header";
// import Login from "./login";

// const LoginButton = React.forwardRef(({ onClick, href }, ref) => {
//   return (
//     <a href={href} onClick={onClick} ref={ref}>Click here to Login!</a>
//   )
// })

export default function Home(props: any) {
  return (
    <div>
      <div style={{ background: "black", width: "100vw", height: "100vh" }}>
        <div
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            top: "0",
            right: "0",
            overflow: "hidden",
          }}
        >
          <Image src={background} className="opacity-30" layout="fill" />
        </div>

        <Head>
          <title>Code Code Guide</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/icon.png" />
        </Head>

        <Header />

        <div className="z-10">
          <div className="absolute grid top-0 text-center content-center self-center w-full h-screen select-none">
            <div>
              <span className="relative z-10 text-white text-4xl font-bold sm:text-2xl lg:text-3xl">
                Welcome to{" "}
              </span>
              <span className="relative z-10 text-homepagetitle text-4xl font-bold sm:text-2xl lg:text-3xl">
                CodeCodeGuide!
              </span>
            </div>
            <div className="p-8">
              <button className="relative z-10 text-white rounded-lg bg-navtextbottom  px-24 py-1.5 hover:shadow">
                <Link href="./home">Click here to start coding now</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default Home;

{
  /* 
 import React from 'react';
import Image from 'next/image';
import Logo from '../../public/icon.png';
import background from '../../public/home-background.jpg';
import Header from "./component/header";

function home() {
  return (
    <div style={{background:"black", width:"100vw", height:"100vh"}}>
      <div style={{position: "absolute", width:"100vw", height: "100vh", top:"0", right:"0", overflow:"hidden"}}>
        <Image src={background} className="opacity-30" layout='fill'/>
        </div>
        <Header/>

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

*/
}
