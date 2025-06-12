import { createContext, useContext, useState } from "react";


export const ProjectsContext = createContext()


const ProjectsProvider = ({children}) => {
    const [CurrentProject, setCurrentProject] = useState(0)
    const [UCurrentTextureIdx, setUCurrentTextureIdx] = useState(0)
    const [UPrevTextureIdx, setUPrevTextureIdx] = useState(0)
    const [Projects, setProjects] = useState([
        {
            name:'Image Inhancer',
            img:'/Image_Inhancer.png',
            live:'https://image-inhancer.onrender.com/'    
        },
        {
            name:'Next JS Page Transition',
            img:'/Next_Page_Transition.png',
            live:'https://vercel.com/manishs-projects-3877e99a/smooth-next-page-transition/6nEeRRyD35eMEKFB7JcJsWgND7Lh'
        },
        {
            name:'Modern Gallery',
            img:'/Smooth_Gallery.jpg',
            live:'https://manishbhai9350.github.io/Smooth-Modern-Gallery/'
        },
        {
            name:'Dynamic Counter',
            img:'/Dynamic_Counter.png',
            live:'https://manishbhai9350.github.io/Dynamic-Counter/'
        },
        {
            name:'Art Gallery',
            img:'/Art_Gallery.png',
            live:'https://manishbhai9350.github.io/Art-Gallery/'          
        },
        {
            name:'Distorted Sphere',
            img:'/Distorted_Sphere.png',
            live:'https://distorted-sphere.onrender.com/'        
        },
        {
            name:'The Planets',
            img:'/The_Plantes.jpg',
            live:'https://the-planets.onrender.com/'            
        },
        {
            name:'3D Image Slider',
            img:'/3D_Image_Slider.png',
            live:'https://shaders-3d-slider.onrender.com/'            
        },
        {
            name:'3D Drink Can',
            img:'/3D_Can.png',
            live:'https://threed-can.onrender.com/'            
        },
        {
            name:'Modern Shop Page',
            img:'/Trendline.png',
            live:'https://manishbhai9350.github.io/Modern-Shop/'            
        },
    ])
    const [Skills, setSkills] = useState({
        core:[
        {
            skill:"HTML",
            icon:'html'
        },
        {
            skill:"CSS",
            icon:'css'
        },
        {
            skill:"JAVASCRIPT",
            icon:'javascript'
        },
        {
            skill:"REACT",
            icon:'react',
        },
        {
            skill:"NEXT JS",
            icon:'nextjs',
            scale:.5
        },
        {
            skill:"GSAP",
            icon:'gsap',
            scale:.5
        },
        {
            skill:"THREE JS",
            icon:'threejs',
        },
        {
            skill:"NODE JS",
            icon:'nodejs',
        },
    ],
    superstack:[
        {
            skill:"TYPESCRIPT",
            icon:'typescript'
        },
        {
            skill:"FRAMER MOTION",
            icon:'framer-motion',
        },
        {
            skill:"WEBGL",
            icon:'webgl',
        },
        {
            skill:"REDUX",
            icon:'redux',
        },
        {
            skill:"VERCEL",
            icon:'vercel',
            scale:.5
        },
        {
            skill:"REDIS",
            icon:'redis',
        },
        {
            skill:"MONGODB",
            icon:'mongodb',
        },
        {
            skill:"MATHEMATICS",
            icon:'math',
        },
    ]
    })
    const [IsSiteLoaded, setIsSiteLoaded] = useState(false)

    const [Journeys, setJourneys] = useState(16)

    return <ProjectsContext.Provider value={{Projects, setProjects,CurrentProject, setCurrentProject, Skills, UCurrentTextureIdx, setUCurrentTextureIdx, UPrevTextureIdx, setUPrevTextureIdx, Journeys, IsSiteLoaded, setIsSiteLoaded}} >
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