import { createContext, useContext, useState } from "react";

export const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [CurrentProject, setCurrentProject] = useState(0);
  const [UCurrentTextureIdx, setUCurrentTextureIdx] = useState(0);
  const [UPrevTextureIdx, setUPrevTextureIdx] = useState(0);
  const [Projects, setProjects] = useState([
    {
      name: "Fluid Sense",
      img: "/FluidSense.png",
      live: "https://controller-studio.onrender.com",
    },
    {
      name: "Demon Core",
      img: "/Demon_Core.png",
      live: "https://super-concha-ece48b.netlify.app",
    },
    {
      name: "Velox Automation",
      img: "/Velox.png",
      live: "https://vintage-car-experiment.onrender.com",
    },
    {
      name: "Art Gallery",
      img: "/Art_Gallery.png",
      live: "https://manishbhai9350.github.io/Art-Gallery",
    },
    {
      name: "Distorted Sphere",
      img: "/Distorted_Sphere.png",
      live: "https://distorted-sphere.onrender.com",
    },
    {
      name: "Scolling Boxes",
      img: "/The_Plantes.jpg",
      live: "https://scrolling-boxes.onrender.com",
    },
    {
      name: "3D Image Slider",
      img: "/3D_Image_Slider.png",
      live: "https://shaders-3d-slider.onrender.com",
    },
    {
      name: "3D Drink Can",
      img: "/3D_Can.png",
      live: "https://threed-can.onrender.com",
    },
    {
      name: "Modern Shop Page",
      img: "/Trendline.png",
      live: "https://manishbhai9350.github.io/Modern-Shop",
    },
    {
      name: "Modern Gallery",
      img: "/Smooth_Gallery.jpg",
      live: "https://manishbhai9350.github.io/Smooth-Modern-Gallery",
    },
  ]);
  const [Skills, setSkills] = useState({
    core: [
      {
        skill: "HTML",
        icon: "html",
      },
      {
        skill: "CSS",
        icon: "css",
      },
      {
        skill: "JAVASCRIPT",
        icon: "javascript",
      },
      {
        skill: "REACT",
        icon: "react",
      },
      {
        skill: "NEXT JS",
        icon: "nextjs",
        scale: 0.5,
      },
      {
        skill: "GSAP",
        icon: "gsap",
        scale: 0.5,
      },
      {
        skill: "THREE JS",
        icon: "threejs",
      },
      {
        skill: "NODE JS",
        icon: "nodejs",
      },
    ],
    superstack: [
      {
        skill: "TYPESCRIPT",
        icon: "typescript",
      },
      {
        skill: "FRAMER MOTION",
        icon: "framer-motion",
      },
      {
        skill: "WEBGL",
        icon: "webgl",
      },
      {
        skill: "REDUX",
        icon: "redux",
      },
      {
        skill: "VERCEL",
        icon: "vercel",
        scale: 0.5,
      },
      {
        skill: "REDIS",
        icon: "redis",
      },
      {
        skill: "MONGODB",
        icon: "mongodb",
      },
      {
        skill: "MATHEMATICS",
        icon: "math",
      },
    ],
  });
  const [IsSiteLoaded, setIsSiteLoaded] = useState(false);

  const [Journeys, setJourneys] = useState(16);

  return (
    <ProjectsContext.Provider
      value={{
        Projects,
        setProjects,
        CurrentProject,
        setCurrentProject,
        Skills,
        UCurrentTextureIdx,
        setUCurrentTextureIdx,
        UPrevTextureIdx,
        setUPrevTextureIdx,
        Journeys,
        IsSiteLoaded,
        setIsSiteLoaded,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;

export const UseProjects = () => {
  try {
    const Data = useContext(ProjectsContext);
    return Data;
  } catch (error) {
    console.error(
      "UseProjects Hook Must Be Used Within ProjectsProvider Component",
    );
  }
};
