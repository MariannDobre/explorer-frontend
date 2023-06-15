import React, { useState } from 'react';
import Reveal from '../../utils/reveal';
import { MdTour, MdLocationPin } from 'react-icons/md';
import { FcApproval } from 'react-icons/fc';
import { userData } from '../../data/usersData';
import './sectionReviews.scss';

const SectionReviews = () => {
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

  return (
    <Reveal>
      <section className='section__reviews'>
        <div className='section__reviews-header'>
          <h4 className='section__reviews-header-title'>Our Reviews</h4>
          <h2 className='section__reviews-header-subtitle'>
            The Stories That Build Us<span>.</span>
          </h2>
        </div>

        <div className='section__reviews-body'>
          {userData.map((el) => (
            <div key={el.id} className='section__reviews-body-content'>
              <div className='section__reviews-body-header'>
                <img
                  src={el.profilePicture}
                  alt='User profile'
                  className='section__reviews-body-header-image'
                />

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}
                >
                  <p className='section__reviews-body-header-name'>{el.name}</p>

                  <p className='section__reviews-body-header-location'>
                    {el.location}
                  </p>

                  <p className='section__reviews-body-header-score'>
                    User rating: <span>{el.score}</span>
                  </p>

                  <button
                    onClick={() => openUserPopup(el.id)}
                    className='section__reviews-body-header-button'
                  >
                    View User
                  </button>
                </div>
              </div>

              <p className='section__reviews-body-description'>
                <span>&#10077;</span>
                {el.content}
              </p>
            </div>
          ))}
        </div>

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
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </Reveal>
  );
};

export default SectionReviews;
