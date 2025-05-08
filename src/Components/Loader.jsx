import { useProgress } from '@react-three/drei'
import {UseProjects} from '../context/projects.context'

const Loader = () => {
    const {Projects,setIsLoaded} = UseProjects()
    const {progress} = useProgress()
  return (
    <div style={{display:progress == 100 && 'none'}} className="loader">
        
    </div>
  )
}

export default Loader