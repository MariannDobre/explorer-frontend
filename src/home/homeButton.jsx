import React from 'react';
import { Link } from 'react-router-dom';
import { MdTravelExplore } from 'react-icons/md';
import './styles/homeButton.scss';

const HomeButton = () => {
  return (
    <Link className='home__button' to='/'>
      Explorer <MdTravelExplore />
    </Link>
  );
};

export default HomeButton;
