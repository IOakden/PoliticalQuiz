import React, { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const ParticlesComponent = (props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(() => ({

    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "attract",
        },
        onHover: {
          enable: true,
          mode: 'grab',
        },
      },
      modes: {
        attract: {
          distance: 700,
          duration: 0.5,
        },
        grab: {
          distance: 150,
        },
      },
    },
    particles: {
      color: {
        value: "#FFFFFF",
      },
      links: {
        color: "#FFFFFF",
        distance: 200,
        enable: true,
        opacity: 0.3,
        width: 3,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 200,
      },
      opacity: {
        value: 1.0,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  }), []);

  return (
    
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -5 }}>
        <div className='gradient-background'></div>
      <Particles id={props.id} init={particlesLoaded} options={options} />
    </div>
  );
};

export default ParticlesComponent;
