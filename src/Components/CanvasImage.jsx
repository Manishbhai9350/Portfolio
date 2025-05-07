import { Canvas } from "@react-three/fiber"
import Scene from "./Scene"



const CanvasImage = ({width=0,height=0,src=''}) => {
  
  const Resize = () => {
    
  }
  
  return (
    <Canvas style={{width:'100%',height:'100%'}} dpr={[2,window.devicePixelRatio]}  >
      <Scene src={src} />
    </Canvas>
  )
}

export default CanvasImage