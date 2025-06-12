import { RiArrowDownLine } from "@remixicon/react";
import "./App.css";
import Nav from "./Components/Nav";
import { useState, useRef, lazy, Suspense } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { UseProjects } from "./context/projects.context";
import Skills from './Components/Skills'

// Lazy-loaded components
const Projects = lazy(() => import("./Components/Projects"));
const ProjectsList = lazy(() => import("./Components/ProjectsList"));
// const Journey = lazy(() => import("./Components/Journey"));
import Journey from './Components/Journey'
import { Canvas } from "@react-three/fiber";

gsap.registerPlugin(ScrollTrigger, SplitText);

function Experience() {
  const [Scroll, setScroll] = useState(0);
  const JourneyRef = useRef(null);
  const Heading = useRef(null);

  const ProjectViewCurrent = useRef(null);

  const { CurrentProject, Projects: MyProjects, IsSiteLoaded } = UseProjects();

  const HeadingText = "Developer Manish";
  const Description = `I'm Manish, a Fullstack + Creative Developer passionate about
                building modern, performant web experiences. From scalable
                backend systems to immersive frontend interactions, I bring
                ideas to life with code — blending logic, design, and
                innovation.`;

                

  useGSAP(() => {
    if(!IsSiteLoaded) return
    const HeadingSpans = gsap.utils.toArray(".heading .heading-text span");
    const SecondHeadingSpans = gsap.utils.toArray(".content .second-heading")
    const DescriptionSpans = gsap.utils.toArray(".description-spans-con span")

    const TL = gsap.timeline()

    TL.to(HeadingSpans,{
      display:'inline-block',
      position:'relative',
      y:0,
      stagger:.01
    }).to(SecondHeadingSpans,{
      opacity:1,
      stagger:.06,
      duration:.6
    }).to(DescriptionSpans,{
      opacity:1,
      stagger:.001,
    }).to('.hire-me-btn',{
      opacity:1
    },'<').to('.profile-image',{
      clipPath:'polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)'
    },'<').to('.nav-con',{
      opacity:1
    })

  }, [IsSiteLoaded]);


  useGSAP(() => {
    const HeadingSpans = gsap.utils.toArray(".heading .heading-text span");
    const SecondHeadingSpans = gsap.utils.toArray(".content .second-heading")
    const DescriptionSpans = gsap.utils.toArray(".description-spans-con span")

    gsap.set(HeadingSpans,{
      display:'inline-block',
      position:'relative',
      y:'150%',
    })
    
    gsap.set(SecondHeadingSpans,{
      opacity:0
    })
    
    gsap.set(DescriptionSpans,{
      opacity:0
    })
    gsap.set('.profile-image',{
      clipPath:'polygon(0% 0%, 0% 0%, 100% 0%, 100% 0%)'
    })
    gsap.set('.nav-con',{
      opacity:0
    })
    gsap.set('.hire-me-btn',{
      opacity:0
    })
    

  }, []);



  useGSAP(() => {
    if (!JourneyRef.current || !IsSiteLoaded) return;
    ScrollTrigger.create({
      trigger: JourneyRef.current,
      start: "top -50%",
      end: `+=22000px`,
      scrub: true,
      onUpdate: ({ progress }) => setScroll(progress),
    });

    ScrollTrigger.create({
      trigger: JourneyRef.current,
      start: "top top",
      end: `+=23000px`,
      pin: true,
    });
    return () => {
      ScrollTrigger.getAll().forEach((e) => e.kill());
    };
  }, [IsSiteLoaded]);

  return (
    <main>
      <div className="nav-con">
        <Nav />
      </div>
      <section className="page1">
        <div className="heading">
          <h1 style={{overflow:'hidden',marginBottom:20}} ref={Heading} className="heading-text">
            {HeadingText.split("").map((E, I) => (
              <span key={I + E + I / 5}>{E == " " ? " " : E}</span>
            ))}
          </h1>
        </div>
        <div className="about">
          <div className="content">
            <h2 className="second-heading">
              {"Fullstack".split("").map((E, I) => (
                <span key={I + E + I / 5}>{E == " " ? " " : E}</span>
              ))}{" "}
              <span className="plus"></span>
              {"Creative Developer".split("").map((E, I) => (
                <span key={I + E + I / 5}>{E == " " ? " " : E}</span>
              ))}
            </h2>
            <div className="description">
              <p className="description-spans-con">
                {Description.split("").map((E, I) => (
                  <span key={I + E + I / 5}>{E == " " ? " " : E}</span>
                ))}
              </p>
              <div className="contact-btn hire-me-btn">
                <a target="_blank" href="mailto:developermanish93@gmail.com">
                  Hire Me
                </a>
              </div>
            </div>
          </div>
          <div className="image profile-image">
            <img src="/Profile.jpg" />
          </div>
        </div>
      </section>


      <section className="page2">
        <h1>
          Works
          <span className="arrow-right-down">
            <RiArrowDownLine size={30} />
          </span>
        </h1>
        <div className="projects-section">
          <Suspense>
            <ProjectsList />
          </Suspense>
          <div className="projects">
            <Suspense>
              <Projects />
            </Suspense>
            <div className="view-project">
              <a
                target="_blank"
                ref={ProjectViewCurrent}
                href={MyProjects[CurrentProject].live || ""}
              >
                View
                <span className="arrow-right-up">
                  <RiArrowDownLine size={17} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      
      <Skills />

      <section ref={JourneyRef} className="page3">
        <Canvas camera={{ near: 2 }}>
          <Suspense>
            <Journey scroll={Scroll} offset={20} />
          </Suspense>
        </Canvas>
      </section>

      <footer className="page4">
        <div className="contact">
          <h1>Have A Project In Mind</h1>
          <a
            target="_blank"
            href="mailto:developermanish93@gmail.com"
            className="talk"
          >
            Let's Talk <span className="line"></span>
          </a>
          <a target="_blank" href="mailto:developermanish93@gmail.com">
            developermanish93@gmail.com
          </a>
        </div>
      </footer>
    </main>
  );
}

export default Experience;
