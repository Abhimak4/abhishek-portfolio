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
          color: "#0b1f3b",
        },

        fpsLimit: 60,

        particles: {
          number: {
            value: 120,
            density: {
              enable: true,
              area: 800,
            },
          },

          color: {
            value: "#00d4ff",
          },

          shape: {
            type: "circle",
          },

          size: {
            value: {
              min: 1,
              max: 3,
            },
          },

          opacity: {
            value: 0.7,
          },

          links: {
            enable: true,
            distance: 170,
            color: "#00d4ff",
            opacity: 0.6,
            width: 1.2,
          },

          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "bounce",
            },
          },
        },

        interactivity: {
          detectsOn: "window",

          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },

            onClick: {
              enable: true,
              mode: "push",
            },

            resize: {
              enable: true,
            },
          },

          modes: {
            grab: {
              distance: 220,
              links: {
                opacity: 1,
              },
            },

            push: {
              quantity: 5,
            },
          },
        },

        detectRetina: true,
      }}
    />
  );
}