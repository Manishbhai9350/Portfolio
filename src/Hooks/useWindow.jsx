import { useEffect, useState } from "react"



const useWindow = () => {
    const [Width, setWidth] = useState(window.innerWidth)
    const [Height, setHeight] = useState(window.innerHeight)
    
    const Resize = () => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    }
    
    useEffect(() => {
        window.addEventListener('resize',Resize)
      return () => {
        window.removeEventListener('resize',Resize)
      }
    }, [])
    
  return {Width,Height}
}

export default useWindow