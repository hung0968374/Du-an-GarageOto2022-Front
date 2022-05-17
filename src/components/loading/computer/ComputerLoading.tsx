import { motion } from 'framer-motion';
import React from 'react';

const pcVariants = {
  hidden: {
    transform: 'none',
  },
  visible: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.8,
    },
  },
};

const childrenPCVariants = {
  hidden: {
    backgroundColor: '#243B55',
  },
  visible: {
    backgroundColor: ['#243B55', '#ffffff', '#243B55'],
  },
};

function duration(number: number) {
  switch (number) {
    case 1:
      return 5;
    case 2:
      return 4;
    case 3:
      return 3;
    case 4:
      return 2;
    case 5:
      return 1;
  }
}

export const ComputerLoading = () => {
  return (
    <>
      <div className="loading-pc ">
        <motion.div
          variants={pcVariants}
          className="loading-box"
          initial="hidden"
          animate="visible"
        >
          {[1, 2, 3, 4, 5].map((el) => {
            return (
              <motion.div
                variants={childrenPCVariants}
                key={el}
                transition={{
                  duration: duration(el),
                  repeat: Infinity,
                  repeatDelay: el * 0.8,
                  ease: 'easeIn',
                }}
                className={`loading-pin ${el === 1 && 'rounded-l-xl'} ${
                  el === 5 && 'rounded-r-xl'
                }`}
              ></motion.div>
            );
          })}
        </motion.div>
        <div className="circle "></div>
      </div>
      <p className="loading-text">Loading...</p>
    </>
  );
};
