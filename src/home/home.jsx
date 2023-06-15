import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SectionAbout from '../components/sectionAbout/sectionAbout';
import SectionBenefits from '../components/sectionBenefits/sectionBenefits';
import SectionReviews from '../components/sectionReviews/sectionReviews';
import SectionShowcase from '../components/sectionShowcase/sectionShowcase';
import SectionParallax from '../components/sectionParallax/parallax';
import HomeButton from './homeButton';
import Footer from '../components/footer/footer';
import {
  heroTitleVariants,
  heroSubtitleVariants,
  heroButtonVariants1,
  heroButtonVariants2,
} from '../utils/heroVariants';
import { HiMenu } from 'react-icons/hi';
import { animationStart, navigationVariant } from '../utils/navVariants';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
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

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

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

  // NAV RESPONSIVE STATE

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // SCROLL BAR PROGRESS

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <HelmetProvider>
      <div className='home__container'>
        <Helmet>
          <title>Explorer | Home</title>
        </Helmet>

        {user ? (
          <div className='header__container'>
            <motion.div style={{ scaleX }} className='progress-bar' />

            <motion.nav
              initial='hidden'
              animate='visible'
              transition={{ duration: 0.6, delay: animationStart }}
              className={
                isScrolled ? 'nav__container-scrolled ' : 'nav__container'
              }
            >
              <motion.div
                initial='hidden'
                animate='visible'
                variants={navigationVariant}
                transition={{
                  ease: 'easeIn',
                  type: 'tween',
                  staggerChildren: 0.15,
                  duration: 0.6,
                  delayChildren: animationStart + 0.6,
                }}
              >
                <motion.p
                  className='nav__container-username'
                  variants={navigationVariant}
                >
                  Welcome back, <span>{user.email || 'User'}</span>!
                </motion.p>
              </motion.div>

              <motion.div
                initial='hidden'
                animate='visible'
                variants={navigationVariant}
                transition={{
                  ease: 'easeIn',
                  type: 'tween',
                  staggerChildren: 0.15,
                  duration: 0.6,
                  delayChildren: animationStart + 0.85,
                }}
              >
                <motion.div variants={navigationVariant}>
                  <HomeButton />
                </motion.div>
              </motion.div>

              <motion.div
                initial='hidden'
                animate='visible'
                variants={navigationVariant}
                transition={{
                  ease: 'easeIn',
                  type: 'tween',
                  staggerChildren: 0.15,
                  duration: 0.6,
                  delayChildren: animationStart + 1.1,
                }}
                className='nav__container-menu'
              >
                <motion.div variants={navigationVariant}>
                  <button
                    className='nav__container-menu-button'
                    onClick={toggleMenu}
                  >
                    <HiMenu />
                  </button>
                </motion.div>
              </motion.div>

              <motion.div
                initial='hidden'
                animate='visible'
                variants={navigationVariant}
                transition={{
                  ease: 'easeIn',
                  type: 'tween',
                  staggerChildren: 0.25,
                  duration: 0.6,
                  delayChildren: animationStart + 1.35,
                }}
                className={`nav__container-links ${
                  menuVisible ? 'active fade-in' : ''
                }`}
              >
                <motion.span variants={navigationVariant}>
                  <Link className='nav__container-links-tours' to='/tours'>
                    Tours
                  </Link>
                </motion.span>

                <motion.span variants={navigationVariant}>
                  <Link
                    className='nav__container-links-profile'
                    to='/user/profile'
                  >
                    View Profile
                  </Link>
                </motion.span>

                <motion.span variants={navigationVariant}>
                  <Link
                    className='nav__container-links-signout'
                    onClick={userSignOut}
                  >
                    Sign Out
                  </Link>
                </motion.span>
              </motion.div>
            </motion.nav>

            <div className='hero__container'>
              <div className='hero__container-about'>
                <motion.p
                  className='hero__container-about-title'
                  initial='hidden'
                  animate='visible'
                  variants={heroTitleVariants}
                >
                  Start explore the world <span>with us</span> today.
                </motion.p>

                <motion.p
                  className='hero__container-about-subtitle'
                  initial='hidden'
                  animate='visible'
                  variants={heroSubtitleVariants}
                >
                  You can choose from a lot of tours that will
                  <span> benefit </span>
                  both <span> your tastes </span> and
                  <span> your pockets</span>.
                </motion.p>
              </div>

              <div className='hero__container-cta'>
                <motion.button
                  onClick={scrollToElement}
                  className='hero__container-cta-button'
                  initial='hidden'
                  animate='visible'
                  variants={heroButtonVariants1}
                >
                  Learn More →
                </motion.button>

                <motion.span
                  className='hero__container-cta-button'
                  initial='hidden'
                  animate='visible'
                  variants={heroButtonVariants2}
                >
                  <Link
                    to='/tours'
                    style={{
                      textDecoration: 'none',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    Check Our Tours →
                  </Link>
                </motion.span>
              </div>
            </div>

            <SectionAbout />

            <SectionBenefits />

            <SectionReviews />

            <SectionParallax />

            <SectionShowcase />

            <Footer />
          </div>
        ) : (
          <div className='notloggedin__container'>
            <motion.div style={{ scaleX }} className='progress-bar' />

            <nav
              className={
                isScrolled ? 'nav__container-scrolled' : 'nav__container'
              }
            >
              <HomeButton />

              <p className='nav__container-username'>
                Create an account or log in to see our tours!
              </p>
            </nav>

            <div className='hero__container'>
              <div
                className='hero__container-about'
                style={{ marginBottom: '42rem' }}
              >
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
            </div>

            <section className='section__note'>
              <p className='section__note-title'>
                <span>NOTE:</span> If you are not logged in or you don't have an
                account yet, you can make one for free and check out our tours
                if you are interested.
              </p>

              <div className='section__note-cta'>
                <button
                  className='section__note-cta-login'
                  onClick={LogInToAcc}
                >
                  Log In
                </button>

                <button
                  className='section__note-cta-create'
                  onClick={CreateAccFunction}
                >
                  Create an Account
                </button>
              </div>
            </section>

            <SectionAbout />

            <SectionBenefits />

            <SectionReviews />

            <Footer />
          </div>
        )}
      </div>
    </HelmetProvider>
  );
};

export default Home;
