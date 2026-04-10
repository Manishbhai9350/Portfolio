import * as THREE from "three";
import Fragment2 from "../shaders/Projects/fragment2.glsl";
import { useGSAP } from "@gsap/react";
import { CameraControls, shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { UseProjects } from "../context/projects.context";
import Fragment from "../shaders/Projects/fragment.glsl";
import Vertex from "../shaders/Projects/vertex.glsl";
import UseWindow from "../Hooks/useWindow";

const Uniforms = {
  uTime: 0,
  uMouse: new THREE.Vector2(0.5, 0.5),
  uMouseIntensity: 0,
  uAspect: 1,
  uProg: 0.5,
  uFromText: null,
  uToText: null,
  UGridCells: 20,
};
const ProjectsMaterial = shaderMaterial(
  Uniforms,
  Vertex,
  Fragment2,
  // Fragment,
);

extend({ ProjectsMaterial });

const ProjectsScene = ({ ProjectsLength = 5 }) => {
  const { Width } = UseWindow();
  const { width, height } = useThree((state) => state.viewport);

  const {
    Projects,
    CurrentProject,
    UCurrentTextureIdx,
    setUCurrentTextureIdx,
    UPrevTextureIdx,
    setUPrevTextureIdx,
  } = UseProjects();

  const Textures = useTexture(Projects.map((p) => p.img));

  const MaterialRef = useRef(null);
  const UProg = useRef(0);

  useEffect(() => {
    if (!MaterialRef.current) return;
    console.log(MaterialRef.current);
    MaterialRef.current.uniforms.uFromText.value = Textures[0];
  }, [Textures]);

  useGSAP(
    () => {
      if (!MaterialRef.current) return;

      gsap.killTweensOf(UProg);

      MaterialRef.current.uniforms.uFromText.value = Textures[UPrevTextureIdx];
      MaterialRef.current.uniforms.uToText.value = Textures[UCurrentTextureIdx];

      gsap.set(UProg, { current: 0 });
      MaterialRef.current.uniforms.uProg.value = UProg.current;

      gsap.to(UProg, {
        current: 1.1,
        duration: 0.7,
        ease: "linear",
        onComplete() {
          gsap.set(UProg, { current: 0 });
          setUPrevTextureIdx(UCurrentTextureIdx);
        },
        onUpdate: () => {
          MaterialRef.current.uniforms.uProg.value = UProg.current;
        },
      });
    },
    { dependencies: [UCurrentTextureIdx] },
  );

  useEffect(() => {
    if (Width < 800) {
      MaterialRef.current.uniforms.UGridCells.value = 10;
    } else if (Width > 1700) {
      MaterialRef.current.uniforms.UGridCells.value = 40;
    } else {
      MaterialRef.current.uniforms.UGridCells.value = 20;
    }
  }, [Width]);

  useEffect(() => {
    if (!MaterialRef.current) return;
    MaterialRef.current.uniforms.uAspect.value = width / height;
  }, [width, height]);

  useFrame((state) => {
    if (!MaterialRef.current) return;
    MaterialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
  });

  const handlePointerMove = (e) => {
    if (!MaterialRef.current) return;

    // uv is already 0 → 1 on plane
    const uv = e.uv;

    if (!uv) return;

    MaterialRef.current.uniforms.uMouse.value.set(uv.x, uv.y);
    MaterialRef.current.uniforms.uMouseIntensity.value = 1;
  };

  const handlePointerLeave = () => {
    if (!MaterialRef.current) return;
    MaterialRef.current.uniforms.uMouseIntensity.value = 0;
  };

  return (
    <mesh onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <planeGeometry args={[width, height]} />
      <projectsMaterial ref={MaterialRef} />
    </mesh>
  );
};

export default ProjectsScene;

useTexture.preload([
  "/Image_Inhancer.png",
  "/Next_Page_Transition.png",
  "/Smooth_Gallery.jpg",
  "/Dynamic_Counter.png",
  "/Art_Gallery.png",
  "/Distorted_Sphere.png",
  "/The_Plantes.jpg",
  "/3D_Image_Slider.png",
  "/3D_Can.png",
  "/Trendline.png",
]);
