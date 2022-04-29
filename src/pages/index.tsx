/**
 * @description Home which render the home page of CodeCodeGuide
 * @author Lee Yu Hin, Hui Nga Yin, Kwong Wai Hang
 * @version 1.0 (2022-04-29)
 * 
 * FUNCTION Home
 */

import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import React from "react";
import Image from "next/image";
import Logo from "../../public/icon.png";
import background from "../../public/home-background.jpg";
import Header from "../components/header";
import { useRouter } from "next/router";

/**
 * Home component
 * Handle the home page of CodeCodeGuide
 * 
 * @returns {JSX.Element} - Home component
 */
export default function Home(props: any) {
  const router = useRouter();
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
              <button className="relative z-10 text-white rounded-lg bg-navtextbottom  px-24 py-1.5 hover:shadow" onClick={() => {
                router.push("/home");
              }}>
                Click here to start coding now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}