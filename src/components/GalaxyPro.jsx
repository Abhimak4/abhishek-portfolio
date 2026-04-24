import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";

export default function GalaxyPro() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        background: {
          color: "#0f172a",
        },
        particles: {
          number: {
            value: 90,
            density: {
              enable: true,
              area: 900,
            },
          },
          color: {
            value: "#38bdf8",
          },
          size: {
            value: { min: 1, max: 2.5 },
          },
          opacity: {
            value: { min: 0.3, max: 0.9 },
          },
          links: {
            enable: true,
            distance: 150,
            color: "#38bdf8",
            opacity: 0.25,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            outModes: {
              default: "bounce",
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 190,
              links: {
                opacity: 0.9,
              },
            },
            push: {
              quantity: 3,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}