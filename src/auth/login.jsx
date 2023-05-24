import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  signInWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
} from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import video from './video/login-bg.mp4';
import { AiFillMail } from 'react-icons/ai';
import { RiLock2Fill } from 'react-icons/ri';
import './styles/login.scss';

function LogIn() {
  // LOGIN STATE AND FUNCTION
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validData = () => {
    return email !== '' && password !== '';
  };

  const loggedIn = (event) => {
    event.preventDefault();

    if (validData()) {
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              navigate('/');
              console.log(userCredential);
            })
            .catch((error) => {
              console.log(`Error: ${error.message}`);
            });
        })
        .catch((error) => {
          console.log(`Error setting persistence: ${error.message}`);
        });
    } else {
      alert('Introduce valid data to continue!');
    }
  };

  return (
    <HelmetProvider>
      <div className="login__container">
        <Helmet>
          <title>Explorer | LogIn</title>
        </Helmet>

        <video
          className="login__container-bg"
          src={video}
          autoPlay
          loop
          muted
        ></video>

        <form className="login__container-form" onSubmit={loggedIn}>
          <div className="login__container-form-header">
            <h2 className="login__container-form-header-title">
              Good To Have You Back
            </h2>
            <p className="login__container-form-header-subtitle">To Explorer</p>
          </div>

          <div className="login__container-form-inputs">
            <label className="login__container-form-inputs-placeholders">
              <AiFillMail className="login__container-form-inputs-placeholders-icons" />
              E-Mail:
            </label>
            <input
              type="email"
              className="login__container-form-inputs-email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <label className="login__container-form-inputs-placeholders">
              <RiLock2Fill className="login__container-form-inputs-placeholders-icons" />
              Password:
            </label>
            <input
              type="password"
              className="login__container-form-inputs-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="login__container-form-buttons">
            <button
              className="login__container-form-buttons-submit"
              type="submit"
            >
              Log Into Account
            </button>

            <Link className="login__container-form-buttons-create" to="/signup">
              Create Account
            </Link>

            <Link className="login__container-form-buttons-without" to="/">
              Continue Without Account
            </Link>
          </div>
        </form>
      </div>
    </HelmetProvider>
  );
}

export default LogIn;
