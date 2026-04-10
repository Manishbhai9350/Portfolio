import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import JourneyPlaneMaterial from "./JourneyPlaneMaterial";
import useWindow from "../Hooks/useWindow";
import { useTexture } from "@react-three/drei";

const JourneyPlane = ({
  idx = 0,
  ZDiff = 0,
  scroll = 0,
  offset = 0,
  last = false,
  DeltaZ = { current: 0 },
}) => {
  const { Width } = useWindow();
  const { width, height } = useThree((v) => v.viewport);

  const aspect = 1.4;
  const PHeight = height * 0.5;
  const PWidth = PHeight * aspect;
  const OriginalZ = -idx * ZDiff - offset;

  const GroupRef = useRef();
  const MatRef = useRef();

  // ✅ texture loads once, component no longer remounts
  const texture = useTexture(`/Journey/J${idx + 1}.jpg`);

  // 🟢 Generate random position ONLY ONCE (important)
  useEffect(() => {
    const pos = [0, 0, 0];

    // Horizontal placement
    pos[0] = width / 2 - PWidth / 2 + Math.random() * width * 0.05;
    pos[0] *= idx % 2 === 0 ? 1 : -1;
    pos[0] *= 0.4;

    // Vertical placement
    if (Width < 800) {
      pos[0] = 0;
      pos[1] = (Math.random() - 0.5) * height;
    } else {
      pos[1] = (Math.random() - 0.5) * PHeight * 0.3;
    }

    // Last plane centered
    if (last) {
      pos[0] = 0;
      pos[1] = 0;
    }

    pos[2] = OriginalZ;

    GroupRef.current.position.set(...pos);
  }, []); // 🚨 run once only

  // 🟢 assign texture when ready
  useEffect(() => {
    if (MatRef.current && texture) {
      MatRef.current.uniforms.uTexture.value = texture;
    }
  }, [texture]);

  // 🎬 animation uniforms
  useFrame(({ clock }) => {
    if (!MatRef.current) return;

    MatRef.current.uniforms.uIntensity.value = DeltaZ.current / 5;
    MatRef.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <group ref={GroupRef}>
      <mesh>
        <planeGeometry args={[PWidth, PHeight, 40, 40]} />
        <JourneyPlaneMaterial ref={MatRef} />
      </mesh>
    </group>
  );
};

export default JourneyPlane;