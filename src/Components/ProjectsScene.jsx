import { useGSAP } from "@gsap/react";
import { CameraControls, shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useThree } from "@react-three/fiber";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { DoubleSide, Material, Vector2 } from "three";
import { UseProjects } from "../context/projects.context";
import Fragment from '../shaders/Projects/fragment.glsl'
import Vertex from '../shaders/Projects/vertex.glsl'
import UseWindow from '../Hooks/useWindow'


const Uniforms = {
  uTime: { value: 0 },
  uMouse: { value: new Vector2(0.5, 0.5) },
  uProg: { value: 0.5 },
  uFromText: { value: null },
  uToText: { value: null },
  UGridCells:{value:20}
};

const ProjectsMaterial = shaderMaterial(Uniforms, Vertex, Fragment);

extend({ ProjectsMaterial });

const ProjectsScene = ({ ProjectsLength = 5 }) => {
  const {Width} = UseWindow()
  const { width, height } = useThree((state) => state.viewport);

  const { Projects, CurrentProject, UCurrentTextureIdx, setUCurrentTextureIdx, UPrevTextureIdx, setUPrevTextureIdx } = UseProjects();

  const Textures = useTexture(Projects.map(p => p.img));

  const MaterialRef = useRef(null)
  const UProg = useRef(0)

  useEffect(() => {
    if(!MaterialRef.current) return 
    MaterialRef.current.uniforms.uFromText.value = Textures[0]
  }, [])
  

  useGSAP(() => {
    if(!MaterialRef.current) return 
    gsap.killTweensOf(UProg)
    MaterialRef.current.uniforms.uFromText.value = Textures[UPrevTextureIdx]      
    MaterialRef.current.uniforms.uToText.value = Textures[UCurrentTextureIdx]      
    gsap.set(UProg,{current:0})
    MaterialRef.current.uniforms.uProg.value = UProg.current
    gsap.to(UProg,{
      current:1.1,
      duration:.7,
      ease:'linear',
      onComplete(){
        gsap.set(UProg,{
          current:0
        })
        setUPrevTextureIdx(UCurrentTextureIdx)
      },
      onUpdate:() => MaterialRef.current.uniforms.uProg.value = UProg.current
    })
  }, [UCurrentTextureIdx])

  useEffect(() => {
    if(Width < 800) {
      MaterialRef.current.uniforms.UGridCells.value = 10
    } else if(Width > 1700){
      MaterialRef.current.uniforms.UGridCells.value = 40
    } else {
      MaterialRef.current.uniforms.UGridCells.value = 20
    }
    
  }, [Width])
  
  

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
    '/Image_Inhancer.png',
    '/Next_Page_Transition.png',
   '/Smooth_Gallery.jpg',
    '/Dynamic_Counter.png',
    '/Art_Gallery.png',
    '/Distorted_Sphere.png',
    '/The_Plantes.jpg',
    '/3D_Image_Slider.png' ,
    '/3D_Can.png'  ,
    '/Trendline.png' ,
])
