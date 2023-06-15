import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { AiFillMail } from 'react-icons/ai';
import { RiLock2Fill } from 'react-icons/ri';
import './styles/signup.scss';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateTo = useNavigate();

  const signedUp = (event) => {
    event.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      alert(`Please fill all the inputs with valid data`);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigateTo('/');
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

        <form className='signup__container-form' onSubmit={signedUp}>
          <div className='signup__container-form-header'>
            <h2 className='signup__container-form-header-title'>
              Welcome Dear Friend
            </h2>

            <p className='signup__container-form-header-subtitle'>
              To Explorer
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
