import { RiArrowDownLine } from "@remixicon/react";
import "./App.css";
import CanvasImage from "./Components/CanvasImage";
import Nav from "./Components/Nav";
import Projects from "./Components/Projects";
import ProjectsList from "./Components/ProjectsList";
import { Canvas } from "@react-three/fiber";
import Journey from "./Components/Journey";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Skill from "./Components/Skill";
import { UseProjects } from "./context/projects.context";


gsap.registerPlugin(ScrollTrigger,SplitText)

function App() {

  const {Skills} = UseProjects()

  const [Scroll, setScroll] = useState(0)

  const JourneyRef = useRef(null)


  const LandingHeading = useRef(null)

  useGSAP(() => {
    if(!JourneyRef.current) return 
    ScrollTrigger.create({
      trigger:JourneyRef.current,
      start:'top -50%',
      end:`+=${22000}px`,
      scrub:true,
      onUpdate:({progress}) => setScroll(progress)
    })
    ScrollTrigger.create({
      trigger:JourneyRef.current,
      start:'top top',
      end:`+=${23000}px`,
      pin:true,
    })

    const CurrentHeading = new SplitText(LandingHeading.current.querySelector('.current-heading'))
    const UpcomingHeading = new SplitText(LandingHeading.current.querySelector('.upcoming-heading'))

    

    return () => {
      ScrollTrigger.getAll().forEach(e => e.kill())
    }
  })

  return (
    <main>
      <Nav />
      <section className="page1">
        <div ref={LandingHeading} className="heading">
          <h1  className="current-heading">Developer Manish</h1>
          <h1  className="upcoming-heading">Developer Manish</h1>
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
                innovation.{" "}
              </p>
              <div className="contact-btn">
                <p>contact</p>
              </div>
            </div>
          </div>
          <div className="image">
            <CanvasImage src="/Profile.png" />
          </div>
        </div>
      </section>
      <section className="page2">
        <h1>
          Projects{" "}
          <span className="arrow-right-down">
            <RiArrowDownLine size={30} ZOffset />
          </span>{" "}
        </h1>
        {/* <Selection /> */}
        <div className="projects-section">
            <ProjectsList />
          <div className="projects">
            <Projects />
            <div className="view-project">
              <a>View <span className='arrow-right-up' ><RiArrowDownLine size={17} /></span></a>
            </div>
          </div>
        </div>
      </section>
      <section ref={JourneyRef} className="page3">
        <Canvas camera={{near:2}}>
          <Journey scroll={Scroll} ZOffset={20} />
        </Canvas>
      </section>
      <footer className="page4">
        {/* <div className="skills-con">
          <h1>Tech Skills</h1>
          <div className="skills">
            {
              Skills.length !== 0 && (
                Skills.map((skill,i) => (
                  <Skill skill={skill.skill} key={skill.skill} />
                ))
              )
            }
          </div>
        </div> */}
        <div className="contact">
          <h1>Have A Project In Mind</h1>
          <a className="talk">Let's Talk</a>
          <a href="#">developermanish@gmail.com</a>
        </div>
      </footer>
    </main>
  );
}

export default App;
