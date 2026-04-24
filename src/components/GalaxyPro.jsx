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
      value: 80,
      density: {
        enable: true,
        area: 1100,
      },
    },

    color: {
      value: "#00d4ff",
    },

    size: {
      value: { min: 1, max: 2.5 },
    },

    opacity: {
      value: 0.6,
    },

    links: {
      enable: true,
      distance: 150,
      color: "#38bdf8",
      opacity: 0.42,
      width: 1,
    },

    move: {
      enable: true,
      speed: 0.45,
      outModes: {
        default: "out", // 🔥 important for production stability
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
    },

    modes: {
      grab: {
        distance: 185,
        links: {
          opacity: 0.85,
        },
      },

      push: {
        quantity: 2,
      },
    },
  },

  detectRetina: true,
}}
    />
  );
}