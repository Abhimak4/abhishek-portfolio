import { useEffect, useRef } from "react";

function GalaxyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId;
    let stars = [];
    let mouse = { x: null, y: null, active: false };
    let clickPulse = null;

    canvas.width = width;
    canvas.height = height;

    const createStars = () => {
      stars = [];
      const count = Math.floor((width * height) / 9000);

      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.6 + 0.5,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          opacity: Math.random() * 0.7 + 0.25,
        });
      }
    };

    createStars();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0 || star.x > width) star.vx *= -1;
        if (star.y < 0 || star.y > height) star.vy *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${star.opacity})`;
        ctx.fill();
      });

      if (mouse.active) {
        stars.forEach((star) => {
          const dx = mouse.x - star.x;
          const dy = mouse.y - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 160) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(star.x, star.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${1 - distance / 160})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      }

      if (clickPulse) {
        clickPulse.radius += 4;
        clickPulse.opacity -= 0.025;

        stars.forEach((star) => {
          const dx = clickPulse.x - star.x;
          const dy = clickPulse.y - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (
            distance < clickPulse.radius &&
            distance > clickPulse.radius - 70
          ) {
            ctx.beginPath();
            ctx.moveTo(clickPulse.x, clickPulse.y);
            ctx.lineTo(star.x, star.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${clickPulse.opacity})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        });

        if (clickPulse.opacity <= 0) clickPulse = null;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = null;
      mouse.y = null;
    };

    const handleClick = (e) => {
      clickPulse = {
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        opacity: 1,
      };
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      createStars();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="galaxy-canvas" />;
}

export default GalaxyBackground;