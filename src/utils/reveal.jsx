import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';

const Reveal = ({ children, width = 'fit-content' }) => {
  const containerAnimation = useRef(null);
  const isInView = useInView(containerAnimation, { once: false });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);

  return (
    <div
      ref={containerAnimation}
      className={{ position: 'relative', width, overflow: 'hidden' }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -175 },
          visible: { opacity: 1, y: 0 },
        }}
        initial='hidden'
        animate={mainControls}
        transition={{ duration: 1.25, delay: 0.4 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

Reveal.propTypes = {
  children: PropTypes.element.isRequired,
  width: PropTypes.oneOf(['fit-content', '100%']),
};

export default Reveal;
