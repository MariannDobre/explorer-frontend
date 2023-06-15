import React from 'react';
import Reveal from '../../utils/reveal';
import explorers from '../../images/explorers.jpg';
import { VscMap } from 'react-icons/vsc';
import { TfiWallet } from 'react-icons/tfi';
import { BsCamera, BsCompass } from 'react-icons/bs';
import './sectionAbout.scss';

const SectionAbout = () => {
  return (
    <Reveal>
      <section className='section__about' id='section-about'>
        <div className='section__about-header'>
          <h4 className='section__about-header-title'>About Us</h4>
          <h2 className='section__about-header-subtitle'>
            Come On A Story Adventure With Us<span>.</span>
          </h2>

          <div className='section__about-header-body'>
            <div className='section__about-header-body-content'>
              <VscMap className='section__about-header-body-content-icon' />
              <p className='section__about-header-body-content-title'>
                Custom Destinations
              </p>
            </div>

            <div className='section__about-header-body-content'>
              <BsCamera className='section__about-header-body-content-icon' />
              <p className='section__about-header-body-content-title'>
                Unforgettable Moments
              </p>
            </div>

            <div className='section__about-header-body-content'>
              <BsCompass className='section__about-header-body-content-icon' />
              <p className='section__about-header-body-content-title'>
                Guide For Every Tour
              </p>
            </div>

            <div className='section__about-header-body-content'>
              <TfiWallet className='section__about-header-body-content-icon' />
              <p className='section__about-header-body-content-title'>
                Prices For Everybody
              </p>
            </div>
          </div>
        </div>

        <div className='section__about-body'>
          <img
            className='section__about-body-image'
            src={explorers}
            alt='Couple in love walking in the forest'
          />
        </div>
      </section>
    </Reveal>
  );
};

export default SectionAbout;
