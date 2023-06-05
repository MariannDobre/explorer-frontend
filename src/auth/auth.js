import React, { useState, useEffect } from 'react';
import { ReactComponent as SvgIllustration } from '../svgs/road.svg';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './styles/profile.scss';

const UserProfile = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listener();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log(`Signed out successfully!`);
      })
      .catch((error) => {
        console.log(`Error: ${error.message}`);
      });
  };

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>Explorer | Profile</title>
        </Helmet>
        {authUser ? (
          <div className='profile__container-logged'>
            <SvgIllustration className='profile__container-logged-svg' />

            <div>
              <p className='profile__container-logged-name'>
                Logged in as <span>{authUser.email}</span>
              </p>

              <p className='profile__container-logged-created'>
                Created at <span>{authUser.metadata.creationTime}</span>
              </p>
            </div>
            {/* {console.log(authUser)} */}

            <div className='profile__container-logged-cta'>
              <Link to='/' className='profile__container-logged-cta-goback'>
                Back to Home
              </Link>
              <button
                onClick={userSignOut}
                className='profile__container-logged-cta-signout'
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>You are signed out</p>
            <p>Log into your account</p>
            <Link to='/login'>Here</Link>
          </div>
        )}
      </div>
    </HelmetProvider>
  );
};

export default UserProfile;
