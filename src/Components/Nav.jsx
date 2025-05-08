import { useEffect, useRef, useState } from "react";
import useWindow from "../Hooks/useWindow";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Nav = () => {
  const [IsMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const { Width, Height } = useWindow();
  const NavItemsRef = useRef(null);

  useGSAP(() => {
    if(!NavItemsRef.current) return 
    const NavTL = gsap.timeline();
    if (IsMobileNavOpen) {
      NavTL.set(NavItemsRef.current, {
        display: "flex",
      });
      gsap.to(NavItemsRef.current, {
        opacity: 1,
        duration:.5
      });
    } else {
      const NavTL = gsap.timeline();
      gsap.to(NavItemsRef.current, {
        opacity: 0,
      });
      NavTL.set(NavItemsRef.current, {
        display: "none",
      });
    }

    return () => NavTL.kill();
  }, [IsMobileNavOpen]);

  return  Width > 650 ? (
    <nav>
      <div className="nav-1 nav-item">
        <div className="col">
          <p>Dev Manish</p>
        </div>
        <div className="col">
          <p>Web Devloper</p>
        </div>
      </div>
      <div className="nav-2 nav-item">
        <div className="col">
          <a href='' >github</a>
          <a href='' >contact</a>
        </div>
        <div className="col">
          <a href='' >linkedin</a>
          <a href='' >instagram</a>
          <a href='' >email</a>
        </div>
      </div>
      <div className="nav-3 nav-item">
        <p>India</p>
      </div>
    </nav>
  ) : (
    <nav>
      <div ref={NavItemsRef} style={{display:'none'}} className="nav-items">
        <div className="head">
          <h1>Menu</h1>
          <p onClick={e => setIsMobileNavOpen(!IsMobileNavOpen)}  className="close-btn">Close</p>
        </div>
        <div className="nav-items-child">
        <div className="items">
          <div className="links">
            <div className="link">
              <div className="line"></div>
              <h1>01</h1>
              <div className="link-text">
                Dev Manish
              </div>
            </div>
            <a href="">
            <div className="link">
              <div className="line"></div>
              <h1>02</h1>
              <div className="link-text">
                contact
              </div>
            </div>
            </a>
            <a href="">
            <div className="link">
              <div className="line"></div>
              <h1>03</h1>
              <div className="link-text">
                github
              </div>
            </div>
            </a>
            <a href="">
            <div className="link">
              <div className="line"></div>
              <h1>04</h1>
              <div className="link-text">
                linked in
              </div>
            </div>
            </a>
            <a href="">
            <div className="link">
              <div className="line"></div>
              <h1>05</h1>
              <div className="link-text">
                instagram
              </div>
            </div>
            </a>
          </div>
          <div className="about">
          <div className="based">
            <div className="dot"></div>
            <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;India</h1>
          </div>
            <h1>&copy;Web Develper</h1>
          </div>
        </div>
        </div>
      </div>
      <div className="menu-btn">
        <p onClick={e => setIsMobileNavOpen(!IsMobileNavOpen)} >Menu</p>
      </div>
    </nav>
  );
};

export default Nav;
