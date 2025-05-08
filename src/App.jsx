import { RiArrowDownLine } from "@remixicon/react";
import "./App.css";
import Nav from "./Components/Nav";
import { Canvas } from "@react-three/fiber";
import { useState, useRef, lazy, Suspense, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { UseProjects } from "./context/projects.context";

// Lazy-loaded components
const Projects = lazy(() => import("./Components/Projects"));
const ProjectsList = lazy(() => import("./Components/ProjectsList"));
const Journey = lazy(() => import("./Components/Journey"));

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  const { Skills } = UseProjects();
  const [Scroll, setScroll] = useState(0);
  const JourneyRef = useRef(null);
  const LandingHeading = useRef(null);


  const ProjectViewCurrent = useRef(null)
  const ProjectViewUpcoming = useRef(null)

  const {CurrentProject,Projects:MyProjects}  = UseProjects()




  useGSAP(() => {
    if (!JourneyRef.current) return;

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
  });

  

  return (
    <main>
      <Nav />

      <section className="page1">
        <div ref={LandingHeading} className="heading">
          <h1 className="current-heading">Developer Manish</h1>
          <h1 className="upcoming-heading">Developer Manish</h1>
        </div>
        <div className="about">
          <div className="content">
            <h2>
              Fullstack <span className="plus"></span> Creative Developer
            </h2>
            <div className="description">
              <p>
                I'm Manish, a Fullstack + Creative Developer passionate about
                building modern, performant web experiences. From scalable
                backend systems to immersive frontend interactions, I bring
                ideas to life with code — blending logic, design, and
                innovation.
              </p>
              <div className="contact-btn">
                <a target="_blank" href='mailto:developermanish93@gmail.com' >Hire Me</a>
              </div>
            </div>
          </div>
          <div className="image">
            <img src='/Profile.jpg' />
          </div>
        </div>
      </section>

      <section className="page2">
        <h1>
          Projects &nbsp;
          <span className="arrow-right-down">
            <RiArrowDownLine size={30} />
          </span>
        </h1>
        <div className="projects-section">
          <Suspense fallback={null}>
            <ProjectsList />
          </Suspense>
          <div className="projects">
            <Suspense fallback={null}>
              <Projects />
            </Suspense>
            <div className="view-project">
              <a target='_blank' ref={ProjectViewCurrent}  href={MyProjects[CurrentProject].live || ''}>
                View &nbsp;
                <span className="arrow-right-up">
                  <RiArrowDownLine size={17} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section ref={JourneyRef} className="page3">
        <Canvas camera={{ near: 2 }}>
          <Suspense fallback={null}>
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

export default App;
  