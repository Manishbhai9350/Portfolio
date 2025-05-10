import React, { useEffect, useState, useRef } from "react";
import Experience from "./Experience";
import { UseProjects } from "./context/projects.context";
import { Loader } from "@react-three/drei";

const App = () => {
  const { IsSiteLoaded, setIsSiteLoaded } = UseProjects();
  const [Progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    
    console.log('Arre Yaar App Yaha Kaha 🥹🥹')
    console.log('Koi Dikkat Ho To Mujhse Puch Sakte Ho 👋👋')
    console.log('Yaa Aise Hi Kuch Baat Karni Ho To 💖💖')
    console.log('Instagram Pe DM Ker Sakte Ho 😊😊')
    return () => {
      
    }
  }, [])
  

  useEffect(() => {
    if (Progress >= 100) {
      setIsSiteLoaded(true);
    }
  }, [Progress]);

  return (
    <>
      <Loader
        dataInterpolation={(e) => {
          if (Math.round(progressRef.current) !== Math.round(e)) {
            progressRef.current = e
            setProgress(e)
          }
          return `${Math.round(e)}%`
        }}
        containerStyles={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 9999,
          background: "#000", // optional for visibility
        }}
      />
      <Experience />
    </>
  );
};

export default App;
