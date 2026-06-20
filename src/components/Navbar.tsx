import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

export let smoother = {
  paused: (state: boolean) => {
    document.body.style.overflowY = state ? "hidden" : "auto";
  },
  scrollTop: (val: number) => {
    window.scrollTo({ top: val });
  },
  scrollTo: (target: any, smooth?: boolean) => {
    const elem = document.querySelector(target);
    if (elem) {
      elem.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
    }
  }
};

const Navbar = () => {
  useEffect(() => {
    document.body.style.overflowY = "hidden"; // Initially hide overflow until loading finishes

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section) {
            smoother.scrollTo(section, true);
          }
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });
  }, []);
  return (
    <>
      <div className="header">
        <a href={import.meta.env.BASE_URL + "#"} className="navbar-title" data-cursor="disable" aria-label="Haneesh Gowda">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="21" cy="21" r="20" fill="url(#logoGrad)" stroke="rgba(139,63,200,0.4)" strokeWidth="1"/>
            <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle"
              fontFamily="'Inter', sans-serif" fontSize="15" fontWeight="700"
              fill="white" letterSpacing="1">
              HG
            </text>
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="42" y2="42" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1a0533"/>
                <stop offset="100%" stopColor="#3d0f6e"/>
              </linearGradient>
            </defs>
          </svg>
        </a>
        <a
          href="mailto:haneesh7gowda@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          haneesh7gowda@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
