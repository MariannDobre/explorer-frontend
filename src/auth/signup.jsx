import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import video from './video/test-video.mp4';
import { AiFillMail } from 'react-icons/ai';
import { RiLock2Fill } from 'react-icons/ri';
import './styles/signup.scss';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signedUp = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(`Error: ${error.message}`);
      });
  };

  return (
    <HelmetProvider>
      <div className='signup__container'>
        <Helmet>
          <title>Explorer | SignUp</title>
        </Helmet>

        <video
          className='signup__container-bg'
          src={video}
          autoPlay
          loop
          muted
        ></video>

        <form className='signup__container-form' onSubmit={signedUp}>
          <div className='signup__container-form-header'>
            <h2 className='signup__container-form-header-title'>
              Welcome Dear Friend
            </h2>
            <p className='signup__container-form-header-subtitle'>
              To Explorer
            </p>
            <p className='signup__container-form-header-additional'>
              Create an account to continue
            </p>
          </div>

          <div className='signup__container-form-inputs'>
            <label className='signup__container-form-inputs-placeholders'>
              <AiFillMail className='signup__container-form-inputs-placeholders-icons' />
              Your E-Mail:
            </label>
            <input
              type='email'
              className='signup__container-form-inputs-email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <label className='signup__container-form-inputs-placeholders'>
              <RiLock2Fill className='signup__container-form-inputs-placeholders-icons' />
              Your Password:
            </label>
            <input
              type='password'
              className='signup__container-form-inputs-email'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <label className='signup__container-form-inputs-placeholders'>
              <RiLock2Fill className='signup__container-form-inputs-placeholders-icons' />
              Confirm Password:
            </label>
            <input
              type='password'
              className='signup__container-form-inputs-email'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className='signup__container-form-buttons'>
            <button
              className='signup__container-form-buttons-submit'
              type='submit'
            >
              Submit
            </button>

            <Link className='signup__container-form-buttons-without' to='/'>
              Continue Without Account
            </Link>
          </div>
        </form>
      </div>
    </HelmetProvider>
  );
}

export default SignUp;
