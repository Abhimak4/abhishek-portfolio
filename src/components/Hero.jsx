import { useEffect, useRef } from "react";

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const card = heroRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    };

    const resetTransform = () => {
      const card = heroRef.current;
      if (!card) return;
      card.style.transform =
        "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    };

    const card = heroRef.current;
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", resetTransform);
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", resetTransform);
      }
    };
  }, []);

  return (
    <header id="hero">
      <div className="hero-card" ref={heroRef}>
        <div className="hero-shine"></div>

        <h1>Abhishek Makwana</h1>
        <h3 className="hero-tagline">Full Stack Developer & Data Engineer</h3>

        <p class="hero-description">
            I am a dedicated <strong>Full Stack Developer</strong> and <strong>Data Engineer</strong> with a <strong>Master of Science in Computer Science & Information Technology</strong> and a Post Graduate Diploma in <strong>Cloud Data Management</strong>.
            My professional identity is defined by a unique intersection of high-performance application development and data-driven infrastructure.
            I specialize in the <strong>"Security-by-Design"</strong> philosophy, ensuring that scalability and cybersecurity are engineered into the foundation of every system I build.
        </p>

        <div className="hero-btns">
          <a href="#projects" className="btn">
            View Projects
          </a>
          <a
            href="/Abhishek_Makwana_Resume.pdf"
            className="btn btn-alt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Resume
          </a>
        </div>
      </div>
    </header>
  );
}

export default Hero;