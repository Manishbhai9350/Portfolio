import { useRef, useLayoutEffect, useEffect } from "react";
import { UseProjects } from "../context/projects.context";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ProjectsList = () => {
  const { Projects, setCurrentProject, CurrentProject, setUCurrentTextureIdx } = UseProjects();

  const refs = useRef([]);
  const ListCon = useRef(null);

  useGSAP(() => {
    function Animate() {
      gsap.set(refs.current[CurrentProject],{
        opacity:1,
        width:0
      })
      gsap.to(refs.current[CurrentProject],{
        width:'100%',
        duration:5,
        ease:'linear',
        onComplete:() => {
          gsap.to(refs.current[CurrentProject],{
            opacity:0
          })
          ChangeProject((CurrentProject+1)%Projects.length)
        }
      })
    }

    Animate()

    // return () => gsap.killTweensOf(refs.current);;
  }, [CurrentProject]);


  function ChangeProject(i){
    if(i == CurrentProject) return;
    gsap.killTweensOf(refs.current)
    let copy = [...refs.current]
    copy.splice(i,1)
    gsap.to(copy,{
      opacity:0
    })
    setUCurrentTextureIdx(i)
    setCurrentProject(i)
  }

  return (
    <div ref={ListCon} className="projects-list">
      {Projects.map((Project, i) => (
        <p
        onClick={e => ChangeProject(i)}
        className="project-list-item" key={Project.name}>
          {Project.name}
          <span 
            ref={(el) => {
              if (el) refs.current[i] = el;
            }}
            className="line"
          ></span>
        </p>
      ))}
    </div>
  );
};

export default ProjectsList;
