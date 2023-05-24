import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

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
          <div>
            <p>
              Logged in as <span>{authUser.email}</span>
            </p>
            <button onClick={userSignOut}>Sign Out</button>
            {/* {console.log(authUser)} */}
          </div>
        ) : (
          <p>You are signed out</p>
        )}
      </div>
    </HelmetProvider>
  );
};

export default UserProfile;
