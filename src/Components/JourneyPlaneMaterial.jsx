import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { forwardRef } from "react";
import Vertex from '../shaders/Journey/vertex.glsl'
import Fragment from '../shaders/Journey/fragment.glsl'

const Uniforms = {
  uTime: { value: 0 },
  uIntensity:{value: 0},
  uTexture:{value:null}
};

const PlaneMat = shaderMaterial(Uniforms,Vertex,Fragment);

extend({ PlaneMat });

const JourneyPlaneMaterial = forwardRef((props, ref) => {
  return <planeMat ref={ref} {...props} />;
});

export default JourneyPlaneMaterial;
