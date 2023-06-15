import React from 'react';
import Reveal from '../../utils/reveal';
import { Link } from 'react-router-dom';
import { BsAirplane, BsTree } from 'react-icons/bs';
import { GiBackpack } from 'react-icons/gi';
import { VscTools } from 'react-icons/vsc';
import './sectionBenefits.scss';

const SectionBenefits = () => {
  return (
    <Reveal>
      <section className='section__benefits'>
        <div className='section__benefits-header'>
          <h3 className='section__benefits-header-title'>
            Why You Should Choose Us
          </h3>
          <h2 className='section__benefits-header-subtitle'>
            Let Us Show You The Beauty Of Our World Today
          </h2>
          <Link to='/tours' className='section__benefits-header-link'>
            Choose A Tour
          </Link>
        </div>

        <div className='section__benefits-body'>
          <div className='section__benefits-body-card'>
            <div className='section__benefits-body-card-icon-bg'>
              <BsAirplane className='section__benefits-body-card-icon' />
            </div>

            <h3 className='section__benefits-body-card-title'>Free Travel</h3>

            <p className='section__benefits-body-card-content'>
              Each tour will have the flight covered, plus transportation from
              the airport to the accommodation.
            </p>
          </div>

          <div className='section__benefits-body-card'>
            <div className='section__benefits-body-card-icon-bg'>
              <GiBackpack className='section__benefits-body-card-icon' />
            </div>

            <h3 className='section__benefits-body-card-title'>Camping</h3>

            <p className='section__benefits-body-card-content'>
              In many of the tours you will have the opportunity to camp in
              nature and learn to survive with what it offers you.
            </p>
          </div>

          <div className='section__benefits-body-card'>
            <div className='section__benefits-body-card-icon-bg'>
              <BsTree className='section__benefits-body-card-icon' />
            </div>

            <h3 className='section__benefits-body-card-title'>
              Activity In Nature
            </h3>

            <p className='section__benefits-body-card-content'>
              All activities will take place outdoors, in nature. Which means
              that the joy will be twice as great.
            </p>
          </div>

          <div className='section__benefits-body-card'>
            <div className='section__benefits-body-card-icon-bg'>
              <VscTools className='section__benefits-body-card-icon' />
            </div>

            <h3 className='section__benefits-body-card-title'>
              All Necessities Covered
            </h3>

            <p className='section__benefits-body-card-content'>
              At the same time, our tours will provide you with all the utensils
              you need to enjoy it and to be able to exploit it to the maximum.
            </p>
          </div>
        </div>
      </section>
    </Reveal>
  );
};

export default SectionBenefits;
