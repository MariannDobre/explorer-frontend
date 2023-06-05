import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home/home';
import LogIn from './auth/login';
import SignUp from './auth/signup';
import Tours from './tours/tours';
import UserProfile from './auth/auth';
import PrivateRoute from './auth/privateRoute';

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<LogIn />} />
          <Route exact path='/signup' element={<SignUp />} />

          <Route exact path='/tours' element={<PrivateRoute />}>
            <Route exact path='/tours' element={<Tours />} />
          </Route>

          <Route exact path='/user/profile' element={<PrivateRoute />}>
            <Route exact path='/user/profile' element={<UserProfile />} />
          </Route>

          <Route exact path='/api/tours' element={<Tours />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
