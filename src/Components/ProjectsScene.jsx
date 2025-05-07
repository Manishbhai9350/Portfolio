import { useGSAP } from "@gsap/react";
import { CameraControls, shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useThree } from "@react-three/fiber";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { DoubleSide, Vector2 } from "three";
import { UseProjects } from "../context/projects.context";
import Fragment from '../shaders/Projects/fragment.glsl'
import Vertex from '../shaders/Projects/vertex.glsl'


const Uniforms = {
  uTime: { value: 0 },
  uMouse: { value: new Vector2(0.5, 0.5) },
  uProg: { value: 0.5 },
  uCurrentTexture: { value: null },
  uNextTexture: { value: null },
};

const ProjectsMaterial = shaderMaterial(Uniforms, Vertex, Fragment);

extend({ ProjectsMaterial });

const ProjectsScene = ({ ProjectsLength = 5 }) => {
  const { width, height } = useThree((state) => state.viewport);

  const { Projects, CurrentProject } = UseProjects();

  const Textures = useTexture(Projects.map(p => p.img));

  const MaterialRef = useRef(null)

  useEffect(() => {
    if(!MaterialRef.current) return 
    MaterialRef.current.uniforms.uCurrentTexture.value = Textures[0]
  }, [])
  

  useEffect(() => {
    if(!MaterialRef.current) return 
    MaterialRef.current.uniforms.uCurrentTexture.value = Textures[CurrentProject]      
  }, [CurrentProject])
  

  return (
    <>
      <mesh>
        <planeGeometry args={[width, height]} />
        <projectsMaterial ref={MaterialRef}  />
      </mesh>
    </>
  );
};


export default ProjectsScene;

useTexture.preload([
    "/Image_Inhancer.png",
    "/Next_Page_Transition.png",
    "/Smooth_Gallery.png",
    "/Dynamic_Counter.png",
    "/Smoth_Reveal.png",
    "/Art_Gallery.png",
    "/Horizontal_Scroll.png",
    "/Smooth_Cards.png",
    "/Distorted_Sphere.png",
    "/The_Plantes.png",
    "/3D_Image_Slider.png",
    "/3D_Can.png",
    "/Trendline.png",
])
