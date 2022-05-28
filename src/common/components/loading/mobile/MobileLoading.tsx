import { motion } from 'framer-motion';
import React from 'react';

export const MobileLoading = () => {
  return (
    <>
      <div className="flex justify-center loading-container">
        <motion.div
          className="loading-ball"
          animate={{
            y: [-50, -170, -170, -170, -170, -50],
            borderRadius: ['20%', '20%', '50%', '20%', '20%', '20%'],
            scale: [1, 1.2, 1.6, 1.5, 1.2, 1],
            rotate: [0, 90, 180, 360, 360, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            repeatDelay: 0.3,
          }}
        ></motion.div>
      </div>
      <p className="loading-text_mobile">
        Wait a sec we <br /> almost get there
      </p>
    </>
  );
};
