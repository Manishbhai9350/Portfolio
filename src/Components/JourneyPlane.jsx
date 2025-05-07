import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import JourneyPlaneMaterial from './JourneyPlaneMaterial';
import useWindow from "../Hooks/useWindow";
import { useTexture } from "@react-three/drei";

const JourneyPlane = ({ idx = 0, ZDiff = 0, scroll = 0,ZOffset, last = false, DeltaZ = { current: 0 } }) => {
  const { Width} = useWindow();
  const { width, height } = useThree((v) => v.viewport);
  let aspect = 1.4;
  let PHeight = height * 0.5;
  let PWidth = PHeight * aspect;

  let OriginalZ = -idx * ZDiff - ZOffset;

  let GroupRef = useRef(null);
  let position = useRef([0, 0, 0]);
  let MatRef = useRef(null)

  const Texture = useTexture(`/Journey/J${idx+1}.jpg`)


  useEffect(() => {
    position.current[0] = width / 2 - PWidth / 2 + Math.random() * width * 0.05;
    position.current[0] *= idx % 2 === 0 ? 1 : -1;
    position.current[0] *= .4;
    if(Width < 800){
      position.current[0] = 0;
      position.current[1] = (Math.random() - .5)  * height 
    } else {
      position.current[1] = (Math.random() - 0.5) * PHeight * 0.3;
    }
    if (last) {
      position.current[0] = 0;
      position.current[1] = 0;
    }
    position.current[2] = OriginalZ;
    GroupRef.current.position.set(...position.current);
  }, [Width]);

  useEffect(() => {
    MatRef.current.uniforms.uTexture.value = Texture
  }, [])
  


  useFrame(({clock}) => {
    if(!MatRef.current) return;
    MatRef.current.uniforms.uIntensity.value = DeltaZ.current/5
    MatRef.current.uniforms.uTime.value = clock.elapsedTime
  })


  return (
    <group ref={GroupRef} position={position.current} key={idx} idx={idx}>
      <mesh>
        <planeGeometry args={[PWidth, PHeight,40,40]} />
        <JourneyPlaneMaterial  ref={MatRef} />
      </mesh>
    </group>
  );
};

export default JourneyPlane;
