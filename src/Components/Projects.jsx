import { Canvas } from '@react-three/fiber'
import {lazy, Suspense} from 'react'
const ProjectsScene = lazy( () => import('./ProjectsScene'))
const Projects = () => {
    
  return (
    <Canvas >
      <Suspense>
        <ProjectsScene />
      </Suspense>
    </Canvas>
  )
}

export default Projects