import { useThree } from "@react-three/fiber";
import {useTexture} from '@react-three/drei'
import React from "react";

const Scene = ({src=''}) => {
    const {width,height} = useThree(state => state.viewport)
    const Image = useTexture(src)
  return (
    <mesh>
      <planeGeometry args={[width*.95,height*.95]} />
      <meshBasicMaterial map={Image}  />
    </mesh>
  );
};

export default Scene;

useTexture.preload('/Profile.png')
