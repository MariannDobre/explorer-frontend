import React, { useEffect, useState } from 'react';
import { ReactComponent as SvgIllustration } from '../svgs/couple.svg';
import { useInView } from 'react-intersection-observer';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import HomeButton from './homeButton';
import Footer from '../footer/footer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { FaHandPointRight } from 'react-icons/fa';
import { BsQuestionLg, BsExclamationLg } from 'react-icons/bs';
import { MdTour, MdLocationPin } from 'react-icons/md';
import { FcApproval } from 'react-icons/fc';
import { HiClock } from 'react-icons/hi';
import { GiBiceps } from 'react-icons/gi';
import { FaDollarSign } from 'react-icons/fa';
import parallaxBg from '../images/parallax-bg.jpg';
import { userData } from '../data/usersData';
import './styles/home.scss';

const Home = () => {
  // CREATE ACC AND LOG INTO ACC
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

  // SMOOTH SCROLLING

  const scrollToElement = () => {
    const element = document.getElementById('section-about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // NAV BG-COLOR ON SCROLL

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // VIEW THE USER/VIEW THE MODAL/POPUP

  const [viewUser, setViewUser] = useState(false);
  const [userId, setUserId] = useState(null);

  const openUserPopup = (userId) => {
    setUserId(userId);
    setViewUser(true);
  };

  const closeUserPopup = () => {
    setViewUser(false);
  };

  // TRIGGER THE ANIMATION

  const { ref: sectionAbout, inView: isAboutVisible } = useInView();
  const { ref: sectionReview, inView: isReviewVisible } = useInView();
  const { ref: sectionShowcase, inView: isShowcaseVisible } = useInView();
  const { ref: footer, inView: isFooterVisible } = useInView();

  return (
    <HelmetProvider>
      <div className='home__container'>
        <svg
          viewBox='0 0 70 170'
          width='900'
          height='450'
          xmlns='http://www.w3.org/2000/svg'
          className='home__container-svg-1'
        >
          <path
            fill='#36cea1'
            d='M105.5,-154.5C140.5,-162.25,175.25,-141.75,186.75,-111.25C198.25,-80.75,186,-40.5,184.5,-1.5C183,37.5,188,75,180,111C172,147,148.5,181.5,115.5,192C82.5,202.5,40.5,190,4.25,185.5C-31,181,-66,179.75,-83.5,154.5C-101,129.25,-102.75,97.5,-121.25,68.75C-139.75,40,-175,20,-174.5,0.25C-174,-19.5,-138,-39.25,-121.25,-70.75C-104.5,-102.25,-106.75,-145.5,-89.75,-148C-72.75,-150.5,-36.25,-112.25,-0.5,-111.25C35.25,-110.25,70.25,-146.5,105.5,-154.5Z'
            transform='translate(40 160)'
          />
        </svg>

        <svg
          viewBox='0 0 57.5 60'
          width='1200'
          height='600'
          xmlns='http://www.w3.org/2000/svg'
          className='home__container-svg-2'
        >
          <path
            fill='#36cea1'
            d='M83.2,-70.4C102.4,-61.6,120.4,-48.8,128.2,-31.5C135.9,-14.1,133.4,7.8,123.6,25.9C113.7,44,96.6,57.3,77.4,64.5C58.2,71.7,36.8,72.8,18.2,67.8C-0.4,62.7,-16.3,51.6,-31.4,40.2C-46.5,28.8,-60.9,17.1,-69.8,1.7C-78.7,-13.7,-82.2,-32.7,-74.4,-47.9C-66.6,-63.1,-47.4,-74.5,-28.1,-81.7C-8.9,-88.9,10.4,-91.9,28.8,-86.8C47.2,-81.7,63.7,-68.5,83.2,-70.4Z'
            transform='translate(-35 100)'
          />
        </svg>

        <svg
          viewBox='0 0 60 110'
          width='1100'
          height='600'
          xmlns='http://www.w3.org/2000/svg'
          className='home__container-svg-3'
        >
          <path
            fill='#36cea1'
            d='M80.4,-69.2C101.5,-59.2,122.5,-44.6,131.5,-22.7C140.5,-0.9,137.5,27.4,121.4,43.7C105.3,60,76.1,64.4,49.7,66.1C23.4,67.8,0,66.9,-24.6,61.7C-49.1,56.5,-78.6,47,-86.7,32.4C-94.8,17.8,-81.6,-1.9,-66.7,-21.7C-51.9,-41.4,-35.4,-61.3,-16.1,-69.4C3.2,-77.5,26.3,-73.9,44.4,-65.1C62.5,-56.3,75.6,-42.2,80.4,-24.4C85.3,-6.6,81.9,14,73,35.4C64.1,56.8,49.7,80.3,30.1,86.7C10.5,93,-13.9,82.4,-34.3,70.4C-54.7,58.5,-71.2,45.1,-80.3,25.9C-89.4,6.8,-91.2,-18.1,-82.1,-34.7C-73,-51.3,-53,-59.2,-35.6,-65.7C-18.1,-72.2,-3.1,-77.2,15.6,-79.3C34.3,-81.3,68.5,-80.3,80.4,-69.2Z'
            transform='translate(20 105)'
          />
        </svg>

        <Helmet>
          <title>Explorer | Home</title>
        </Helmet>

        {user ? (
          <div className='header__container'>
            <nav
              className={
                isScrolled ? 'nav__container-scrolled' : 'nav__container'
              }
            >
              <p className='nav__container-username'>
                Welcome back, <span>{user.email || 'User'}</span>!
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

            <section
              ref={sectionAbout}
              className={`section__about ${isAboutVisible ? 'fade-in' : ''}`}
              id='section-about'
            >
              <p
                ref={sectionAbout}
                className={`section__about-title ${
                  isAboutVisible ? 'slide-right' : ''
                }`}
              >
                About Us
              </p>

              <div
                ref={sectionAbout}
                className={`section__about-content ${
                  isAboutVisible ? 'slide-right-small' : ''
                }`}
              >
                <div className='section__about-content-container'>
                  <div className='section__about-content-items'>
                    <div className='section__about-icon-container'>
                      <div className='section__about-icon-bg'>
                        <BsQuestionLg />
                      </div>
                    </div>

                    <p className='section__about-content-items-title'>
                      We at Explorer try to offer you, the reader, a vacation
                      with an honest price in possibly unseen places that you
                      will remember. Each available vacation package can be
                      found on the "Tours" link and will have details such as:
                      <span>price, duration, location, </span>etc..
                    </p>
                  </div>

                  <div className='section__about-content-items'>
                    <div className='section__about-icon-container'>
                      <div className='section__about-icon-bg'>
                        <BsExclamationLg />
                      </div>
                    </div>

                    <p className='section__about-content-items-title'>
                      At the same time, below you will be able to find a list of
                      benefits and things included in our packages that apply
                      throughout the duration and for all packages without any
                      exception.
                    </p>
                  </div>
                </div>

                <ul className='section__about-list-container'>
                  <li className='section__about-list-container-item'>
                    <FaHandPointRight className='section__about-list-container-item-icon' />
                    Advantageous price for all pockets
                  </li>

                  <li className='section__about-list-container-item'>
                    <FaHandPointRight className='section__about-list-container-item-icon' />
                    Food will be included in the price
                  </li>

                  <li className='section__about-list-container-item'>
                    <FaHandPointRight className='section__about-list-container-item-icon' />
                    Accommodation and equipment included
                  </li>

                  <li className='section__about-list-container-item'>
                    <FaHandPointRight className='section__about-list-container-item-icon' />
                    Quiet and fabulous locations
                  </li>

                  <li className='section__about-list-container-item'>
                    <FaHandPointRight className='section__about-list-container-item-icon' />
                    Transport will not be included in the price
                  </li>

                  <li className='section__about-list-container-item'>
                    <FaHandPointRight className='section__about-list-container-item-icon' />
                    A lot of fun with good people
                  </li>
                </ul>
              </div>
            </section>

            <section
              ref={sectionReview}
              className={`section__reviews ${isReviewVisible ? 'fade-in' : ''}`}
            >
              <p
                ref={sectionReview}
                className={`section__reviews-title ${
                  isReviewVisible ? 'slide-left' : ''
                }`}
              >
                Our Recommendations
              </p>

              <div
                ref={sectionReview}
                className={`section__reviews-content ${
                  isReviewVisible ? 'slide-left-small' : ''
                }`}
              >
                {userData.map((el) => (
                  <div key={el.id} className='card__container'>
                    <div className='card__container-header'>
                      <img
                        className='card__container-header-img'
                        src={el.profilePicture}
                        alt='User profile'
                      />

                      <div className='card__container-header-details'>
                        <p className='card__container-header-name'>{el.name}</p>
                        <p className='card__container-header-location'>
                          {el.location}
                        </p>
                      </div>
                    </div>

                    <article className='card__container-content'>
                      <p className='card__container-content-text'>
                        <span>&#10077;</span>
                        {el.content}
                      </p>
                    </article>

                    <aside className='card__container-score'>
                      <p className='card__container-score-subtitle'>
                        User rating: <span>{el.score}</span>
                      </p>

                      <button
                        onClick={() => openUserPopup(el.id)}
                        className='card__container-score-button'
                      >
                        View User
                      </button>
                    </aside>
                  </div>
                ))}
              </div>
            </section>

            {viewUser && (
              <div className='overlay fade-in'>
                <div className='overlay__container'>
                  {userData.map((el) => {
                    if (el.id === userId) {
                      return (
                        <div key={el.id} className='overlay__content'>
                          <div className='overlay__content-header'>
                            <img
                              className='overlay__content-img'
                              src={el.profilePicture}
                              alt='User profile'
                            />

                            <div className='overlay__content-details'>
                              <p className='overlay__content-details-name'>
                                Name: <span>{el.name}</span>
                              </p>

                              <p className='overlay__content-details-location'>
                                Location: <span>{el.location}</span>
                              </p>

                              <p className='overlay__content-details-rating'>
                                Total rating awarded:
                                <span className='span__rating'>
                                  {Number(el.score) >= 5
                                    ? el.ratingMax
                                    : el.ratingMin}
                                </span>
                              </p>

                              <p className='overlay__content-details-vacations'>
                                Holidays purchased: <span>{el.vacations}</span>
                              </p>

                              <p className='overlay__content-details-membership'>
                                <FcApproval className='overlay__content-details-membership-icon' />
                                {el.membership}
                              </p>
                            </div>
                          </div>

                          <h3 className='overlay__content-favorite'>
                            User Favorite Holidays
                          </h3>

                          <div className='overlay__content-main'>
                            <div className='overlay__content-card'>
                              <p className='overlay__content-card-tour'>
                                <MdTour className='overlay__content-card-icon' />
                                {el.favoriteTour1}
                              </p>

                              <p className='overlay__content-card-location'>
                                <MdLocationPin className='overlay__content-card-icon' />
                                {el.tourLocation1}
                              </p>
                            </div>

                            <div className='overlay__content-card'>
                              <p className='overlay__content-card-tour'>
                                <MdTour className='overlay__content-card-icon' />
                                {el.favoriteTour2}
                              </p>

                              <p className='overlay__content-card-location'>
                                <MdLocationPin className='overlay__content-card-icon' />
                                {el.tourLocation2}
                              </p>
                            </div>

                            <div className='overlay__content-card'>
                              <p className='overlay__content-card-tour'>
                                <MdTour className='overlay__content-card-icon' />
                                {el.favoriteTour3}
                              </p>

                              <p className='overlay__content-card-location'>
                                <MdLocationPin className='overlay__content-card-icon' />
                                {el.tourLocation3}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}

                  <button className='overlay__button' onClick={closeUserPopup}>
                    Close Modal
                  </button>
                </div>
              </div>
            )}

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

            <section
              ref={sectionShowcase}
              className={`section__showcase ${
                isShowcaseVisible ? 'fade-in' : ''
              }`}
            >
              <div
                ref={sectionShowcase}
                className={`section__showcase-intro ${
                  isShowcaseVisible ? 'slide-right' : ''
                }`}
              >
                <p className='section__showcase-intro-title'>
                  Come With Us And Enjoy
                </p>

                <SvgIllustration
                  className={`section__showcase-svg ${
                    isShowcaseVisible ? 'slide-right' : ''
                  }`}
                />
              </div>

              <div
                ref={sectionShowcase}
                className={`section__showcase-content ${
                  isShowcaseVisible ? 'slide-right' : ''
                }`}
              >
                <p className='section__showcase-content-title'>
                  Our New Ultimate Tour
                </p>

                <div className='section__showcase-content-card'>
                  <div className='section__showcase-content-heading'>
                    <div className='section__showcase-content-heading-title'>
                      <span>The Ocean Explorer</span>
                    </div>

                    <img
                      src='https://images.unsplash.com/photo-1554254464-7046778097bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80'
                      alt='Tour'
                      className='section__showcase-content-heading-img'
                    />
                  </div>

                  <div className='section__showcase-content-description'>
                    <p className='section__showcase-content-description-title'>
                      Take part in the most spectacular cruise you've ever had!
                    </p>

                    <div className='section__showcase-content-description-about'>
                      <p className='section__showcase-content-description-about-item'>
                        <MdLocationPin className='section__showcase-content-description-about-icon' />
                        Caribbean
                      </p>

                      <p className='section__showcase-content-description-about-item'>
                        <HiClock className='section__showcase-content-description-about-icon' />
                        10 Days
                      </p>

                      <p
                        className='section__showcase-content-description-about-item'
                        style={{
                          color: '#277d36',
                        }}
                      >
                        <GiBiceps className='section__showcase-content-description-about-icon' />
                        Easy
                      </p>

                      <p className='section__showcase-content-description-about-item'>
                        <FaDollarSign className='section__showcase-content-description-about-icon' />
                        4582
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <footer
              ref={footer}
              className={`${isFooterVisible ? 'fade-in' : ''}`}
            >
              <Footer />
            </footer>
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
