import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import HomeButton from './homeButton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './styles/home.scss';

const Home = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const CreateAccFunction = () => {
    navigate('/signup');
  };

  const LogInToAcc = () => {
    navigate('/login');
  };

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log(`Signed out successfully!`);
      })
      .catch((error) => {
        console.log(`Error: ${error.message}`);
      });
  };

  const scrollToElement = () => {
    const element = document.getElementById('section-about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HelmetProvider>
      <div className='home__container'>
        <Helmet>
          <title>Explorer | Home</title>
        </Helmet>

        {user ? (
          <div className='header__container'>
            <nav className='nav__container'>
              <p className='nav__container-username'>
                Welcome back, <span>{user.email || 'User'}</span> !
              </p>

              <HomeButton />

              <div className='nav__container-links'>
                <Link className='nav__container-links-tours' to='/tours'>
                  Tours
                </Link>

                <Link
                  className='nav__container-links-profile'
                  to='/user/profile'
                >
                  View Profile
                </Link>

                <Link
                  className='nav__container-links-signout'
                  onClick={userSignOut}
                >
                  Sign Out
                </Link>
              </div>
            </nav>

            <div className='hero__container'>
              <div className='hero__container-about'>
                <p className='hero__container-about-title'>
                  Start explore the world <span>with us</span> today.
                </p>

                <p className='hero__container-about-subtitle'>
                  You can choose from a lot of tours that will
                  <span> benefit </span>
                  both <span> your tastes </span> and
                  <span> your pockets</span>.
                </p>
              </div>

              <div className='hero__container-cta'>
                <button
                  onClick={scrollToElement}
                  className='hero__container-cta-btn'
                >
                  Learn More →
                </button>

                <Link to='/tours' className='hero__container-cta-btn'>
                  Check Our Tours →
                </Link>
              </div>
            </div>

            <section className='section__about' id='section-about'>
              <p className='section__about-title'>About Us</p>

              <div className='section__about-content'>
                <p className='section__about-content-item1'>
                  <span>-</span>
                  We at Explorer try to offer you, the reader, a vacation with
                  an honest price in possibly unseen places that you will
                  remember. Each available vacation package can be found on the
                  "Tours" link and will have details such as: price, duration,
                  location, etc..
                </p>

                <p className='section__about-content-item2'>
                  <span>-</span>
                  At the same time, below you will be able to see a list of
                  benefits and things included for our packages.
                </p>
              </div>
            </section>
          </div>
        ) : (
          <div>
            <HomeButton />
            <p>Create an account or log in to see our tours</p>
            <br />
            <button onClick={LogInToAcc}>Log In</button>
            <br />
            <button onClick={CreateAccFunction}>Create an Account</button>
            <br />
          </div>
        )}
      </div>
    </HelmetProvider>
  );
};

export default Home;
