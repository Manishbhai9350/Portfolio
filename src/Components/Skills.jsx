import { useGSAP } from "@gsap/react";
import { UseProjects } from "../context/projects.context";
import gsap from "gsap";
import { useRef } from "react";

const Skills = () => {
  const { Skills: skills } = UseProjects();

  return (
    <section className="skills">
      <h1 className="">Skills</h1>
      <div className="skills-con">
        <div className="core">
          <h2>CORE</h2>
          <div className="skills-section">
            {skills.core.map(({ skill, icon, scale = 1 }, i) => {
              return (
                <div key={i} className="skill-box">
                  <div className="logo">
                    <img
                      style={{ scale }}
                      alt={skill}
                      src={`/skills/${icon}.svg`}
                    />
                  </div>
                  <p className="skill-title">{skill}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="additional">
          <h2>Superstack</h2>
          <div className="skills-section">
            {skills.superstack.map(({ skill, icon, scale = 1 }, i) => {
              return (
                <div key={i} className="skill-box">
                  <div className="logo">
                    <img
                      style={{ scale }}
                      alt={skill}
                      src={`/skills/${icon}.svg`}
                    />
                  </div>
                  <p className="skill-title">{skill}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
