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
    value: 70,
    density: {
      enable: true,
      area: 1200,
    },
  },

  color: {
    value: "#38bdf8",
  },

  size: {
    value: { min: 1, max: 2 },
  },

  opacity: {
    value: { min: 0.25, max: 0.8 },
  },

  // ❌ REMOVE always-visible lines
  links: {
    enable: false,
  },

  move: {
    enable: true,
    speed: 0.35,
    direction: "none",
    outModes: {
      default: "out",
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
  },

  modes: {
    grab: {
      distance: 160,
      links: {
        opacity: 0.6,
        color: "#38bdf8",
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