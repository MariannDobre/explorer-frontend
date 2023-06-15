import React from 'react';
import Reveal from '../../utils/reveal';
import { HiClock } from 'react-icons/hi';
import { GiBiceps } from 'react-icons/gi';
import { FaDollarSign } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import './sectionShowcase.scss';

const SectionShowcase = () => {
  return (
    <Reveal>
      <section className='section__showcase'>
        <div className='section__showcase-header'>
          <h4 className='section__showcase-header-title'>Our future tours</h4>
          <h2 className='section__showcase-header-subtitle'>
            Come with us on the most fabulous tours<span>.</span>
          </h2>
        </div>

        <div className='section__showcase-content'>
          <div className='section__showcase-content-card'>
            <img
              src='https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80'
              alt='Tour'
              className='section__showcase-content-card-img'
            />

            <div className='section__showcase-content-card-body'>
              <p className='section__showcase-content-card-body-title'>
                The City Wanderer
              </p>

              <p className='section__showcase-content-card-body-description'>
                Discover the beauties of London with us.
              </p>

              <p className='section__showcase-content-card-body-location'>
                <MdLocationPin className='section__showcase-content-card-body-location-icon' />
                London
              </p>

              <p className='section__showcase-content-card-body-duration'>
                <HiClock className='section__showcase-content-card-body-duration-icon' />
                3 Days
              </p>

              <p className='section__showcase-content-card-body-price'>
                <FaDollarSign className='section__showcase-content-card-body-price-icon' />
                477
              </p>

              <p className='section__showcase-content-card-body-complexity'>
                <GiBiceps className='section__showcase-content-card-body-complexity-icon' />
                Easy
              </p>

              <p className='section__showcase-content-card-body-available'>
                Available soon
              </p>
            </div>
          </div>

          <div className='section__showcase-content-card'>
            <img
              src='https://images.unsplash.com/photo-1617170788899-ef9587d6e63f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
              alt='Tour'
              className='section__showcase-content-card-img'
            />

            <div className='section__showcase-content-card-body'>
              <p className='section__showcase-content-card-body-title'>
                The Ocean Explorer
              </p>

              <p className='section__showcase-content-card-body-description'>
                Take part in the most spectacular cruise you've ever had!
              </p>

              <p className='section__showcase-content-card-body-location'>
                <MdLocationPin className='section__showcase-content-card-body-location-icon' />
                Caribbean
              </p>

              <p className='section__showcase-content-card-body-duration'>
                <HiClock className='section__showcase-content-card-body-duration-icon' />
                10 Days
              </p>

              <p className='section__showcase-content-card-body-price'>
                <FaDollarSign className='section__showcase-content-card-body-price-icon' />
                4892
              </p>

              <p className='section__showcase-content-card-body-complexity'>
                <GiBiceps className='section__showcase-content-card-body-complexity-icon' />
                Easy
              </p>

              <p className='section__showcase-content-card-body-available'>
                Available soon
              </p>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
};

export default SectionShowcase;
