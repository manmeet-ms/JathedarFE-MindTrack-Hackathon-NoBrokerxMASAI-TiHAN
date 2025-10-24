import React, { useEffect, useRef } from 'react';
import * as HALO from 'halo';
// import HALO from 'vanta/dist/vanta.halo.min'; // Adjust path if necessary
// import HALO from '../../node_modules/vanta/dist/vanta.halo.min.js'; // Adjust path if necessary

const HaloEffectChronos = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = HALO({
        el: vantaRef.current,
        THREE: THREE, // Pass THREE.js instance
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        // Customize Halo effect parameters here
      });
    }
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return <div ref={vantaRef} style={{ width: '100vw', height: '100vh' }}></div>;
};

export default HaloEffectChronos;
