import { Text } from "@react-three/drei";
import React from "react";
import useWindow from "../Hooks/useWindow";
import JourneyPlane from "./JourneyPlane";
import { useRef } from "react";
import { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

const Journey = ({ scroll = 0, ZOffset = 0 }) => {
  const { Width } = useWindow();

  let PlanesGroupRef = useRef(null);
  let TargetPositionDiffZ = useRef(0);
  let PositionZ = useRef(0);
  let TargetDeltaZ = useRef(0);
  let DeltaZ = useRef(0);
  let UZEase = useRef(0.1);
  let UZEaseID = useRef(null);

  let TotalPlanes = 5;
  let ZDiff = 30;
  let OriginalZ = ZOffset + ZDiff * (TotalPlanes - 1);
  let Planes = new Array(TotalPlanes).fill("Plane");

  useEffect(() => {
    clearInterval(UZEaseID.current);
    if (Width < 800) {
      UZEaseID.current = setTimeout(() => {
        UZEase.current = 0.3;
      }, 100);
      UZEase.current = 0.5;
    } else {
      UZEaseID.current = setTimeout(() => {
        UZEase.current = 0.1;
      }, 100);
      UZEase.current = 0.7;
    }
    return () => {
      clearInterval(UZEaseID.current);
    };
  }, [scroll]);
  useEffect(() => {
    clearInterval(UZEaseID.current);
    if (Width < 800) {
      UZEase.current = 0.5;
    }
    return () => {
      clearInterval(UZEaseID.current);
    };
  }, [Width]);

  useFrame(() => {
    if (!PlanesGroupRef.current) return;
    TargetPositionDiffZ.current = scroll * OriginalZ;
    let Diff = TargetPositionDiffZ.current - PositionZ.current;
    Diff *= 3.5;
    Diff = Math.max(-5, Math.min(Diff, 5));
    TargetDeltaZ.current = Diff;

    let DZ = DeltaZ.current;
    DZ += (TargetDeltaZ.current - DZ) * UZEase.current;
    DZ = Number(DZ.toFixed(5));
    DeltaZ.current = DZ;

    PositionZ.current +=
      (TargetPositionDiffZ.current - PositionZ.current) * 0.1;
    PlanesGroupRef.current.position.z = PositionZ.current;
  });

  return (
    <group ref={PlanesGroupRef}>
      {Planes.map((_, i) => (
        <JourneyPlane
          key={i}
          idx={i}
          ZOffset={ZOffset}
          scroll={scroll}
          last={i == Planes.length - 1}
          DeltaZ={DeltaZ}
          ZDiff={ZDiff}
        />
      ))}
    </group>
  );
};

export default Journey;
