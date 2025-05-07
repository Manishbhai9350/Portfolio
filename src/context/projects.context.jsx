import { createContext, useContext, useEffect, useState } from "react";


export const ProjectsContext = createContext()


const ProjectsProvider = ({children}) => {
    const [CurrentProject, setCurrentProject] = useState(0)
    const [UCurrentTextureIdx, setUCurrentTextureIdx] = useState(0)
    const [UPrevTextureIdx, setUPrevTextureIdx] = useState(0)
    const [Projects, setProjects] = useState([
        {
            name:'Image Inhancer',
            img:'/Image_Inhancer.png'            
        },
        {
            name:'Next JS Page Transition',
            img:'/Next_Page_Transition.png'            
        },
        {
            name:'Modern Gallery',
            img:'/Smooth_Gallery.jpg'            
        },
        {
            name:'Dynamic Counter',
            img:'/Dynamic_Counter.png'            
        },
        {
            name:'Smooth Page Reveal',
            img:'/Smoth_Reveal.png'            
        },
        {
            name:'Art Gallery',
            img:'/Art_Gallery.png'            
        },
        {
            name:'Horizontal Scroll',
            img:'/Horizontal_Scroll.jpg'            
        },
        {
            name:'Smooth Cards',
            img:'/Smooth_Cards.jpg'            
        },
        {
            name:'Distorted Sphere',
            img:'/Distorted_Sphere.png'            
        },
        {
            name:'The Planets',
            img:'/The_Plantes.jpg'            
        },
        {
            name:'3D Image Slider',
            img:'/3D_Image_Slider.png'            
        },
        {
            name:'3D Drink Can',
            img:'/3D_Can.png'            
        },
        {
            name:'Modern Shop Page',
            img:'/Trendline.png'            
        },
    ])
    const [Skills, setSkills] = useState([
        {
            skill:"HTML"
        },
        {
            skill:"CSS"
        },
        {
            skill:"JS"
        },
        {
            skill:"LENIS"
        },
        {
            skill:"TAILWIND CSS"
        },
        {
            skill:"LOCOMOTIVE"
        },
        {
            skill:"THREE JS"
        },
        {
            skill:"WEBGL"
        },
        {
            skill:"GLSL"
        },
        {
            skill:"REACT"
        },
        {
            skill:"NEXT JS"
        },
        {
            skill:"NODE JS"
        },
        {
            skill:"REACT THREE FIBER"
        },
        {
            skill:"EXPRESS JS"
        },
        {
            skill:"EJS"
        },
        {
            skill:"SOCKET IO"
        },
        {
            skill:"MONGODB"
        },
        {
            skill:"MERN"
        },
        {
            skill:"GIT & GITHUB"
        },
        {
            skill:"MATHEMATICS"
        },
    ])

    const [Journey, setJourney] = useState(18)

    return <ProjectsContext.Provider value={{Projects, setProjects,CurrentProject, setCurrentProject, Skills, UCurrentTextureIdx, setUCurrentTextureIdx, UPrevTextureIdx, setUPrevTextureIdx, Journey}} >
        {children}
    </ProjectsContext.Provider>
}

export default ProjectsProvider


export const UseProjects = () => {
    try {
        const Data = useContext(ProjectsContext)
        return Data
    } catch (error) {
        console.error('UseProjects Hook Must Be Used Within ProjectsProvider Component')
    }
}