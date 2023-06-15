import React from 'react';
import { Parallax } from 'react-parallax';
import parallaxBg from '../../images/parallax-bg.jpg';
import './parallax.scss';

const SectionParallax = () => {
  return (
    <div className='parallax__container'>
      <Parallax
        strength={400}
        bgImage={parallaxBg}
        bgImageAlt='Sunset Lake'
        blur={{ min: -5, max: 15 }}
      >
        <div className='parallax__container-content'>
          <p className='parallax__container-content-text'>
            We Know That We Convinced You
          </p>
        </div>
      </Parallax>
    </div>
  );
};

export default SectionParallax;
