import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

function App() {
  useEffect(() => {
    const glow1 = document.querySelector(".glow1");
    const glow2 = document.querySelector(".glow2");

    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      if (glow1) {
        glow1.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
      }

      if (glow2) {
        glow2.style.transform = `translate(${-x * 40}px, ${-y * 40}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <GalaxyBackground />
      <div className="animated-bg"></div>

      <div className="hero-bg">
        <div className="glow glow1"></div>
        <div className="glow glow2"></div>
      </div>

      <Navbar />
      <Hero />
      <Education />
      <Experience />
      <Projects />
      <Skills />
      <Contact />

      <footer>
        <p>© 2026 Abhi Makwana | M.Sc. CS & IT</p>
      </footer>
    </>
  );
}

export default App;