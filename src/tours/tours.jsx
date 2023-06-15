import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Reveal from '../utils/reveal';
import HomeButton from '../home/homeButton';
import Footer from '../components/footer/footer';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { toursImages } from '../data/toursImages';
import { MdLocationPin } from 'react-icons/md';
import { HiClock } from 'react-icons/hi';
import { GiBiceps } from 'react-icons/gi';
import { FaDollarSign } from 'react-icons/fa';
import './tours.scss';
import 'leaflet/dist/leaflet.css';

function Tours() {
  // FETCHING THE DATA FROM THE DB

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:4000/api');
      const responseData = await response.json();
      const data = responseData.data;
      // console.log('API response:', data);
      setData(data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }

  // SMOOTH SCROLLING

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

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

  // RENDER THE MAP FOR THE TOURS

  const [selectedTour, setSelectedTour] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const openMap = (tour) => {
    setSelectedTour(tour);
    setIsMapOpen(true);
  };

  const closeMap = () => {
    setSelectedTour(null);
    setIsMapOpen(false);
  };

  const myMarker = new Icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // RENDER BUY FORM

  const [buyForm, setBuyForm] = useState(false);

  const openBuyForm = (tour) => {
    setSelectedTour(tour);
    setBuyForm(true);
  };

  const closeBuyForm = () => {
    setBuyForm(false);
    setPaymentPlaced(false);
  };

  // PLACE THE PAYMENT

  const handlePayButton = () => {
    if (
      !addressRef.current.value ||
      !cityRef.current.value ||
      !stateRef.current.value ||
      !zipCodeRef.current.value ||
      !cardNumberRef.current.value ||
      !expirationDateRef.current.value ||
      !cvvRef.current.value
    ) {
      alert('Fill all inputs with valid data!');
    } else {
      setPaymentPlaced(true);
    }
  };

  const [paymentPlaced, setPaymentPlaced] = useState(false);

  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const zipCodeRef = useRef(null);
  const cardNumberRef = useRef(null);
  const expirationDateRef = useRef(null);
  const cvvRef = useRef(null);

  // SCROLL BAR PROGRESS

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <HelmetProvider>
      <div className='tours__container'>
        <Helmet>
          <title>Explorer | Tours</title>
        </Helmet>

        {!data ? (
          <p>Loading...</p>
        ) : (
          <div className='tours__content'>
            <motion.div style={{ scaleX }} className='progress-bar' />
            <div
              className={
                isScrolled
                  ? 'tours__content-nav-scrolled'
                  : 'tours__content-nav'
              }
            >
              <HomeButton />
            </div>

            <div className='tours__container-cards'>
              {data.map((tour, index) => {
                const image = toursImages[index % toursImages.length];

                return (
                  <Reveal key={index}>
                    <div className='tours__content-cards'>
                      {image && (
                        <img
                          src={image.tourImage}
                          alt='Tour'
                          className='tours__content-cards-img'
                        />
                      )}

                      <div className='tours__content-cards-body'>
                        <h3 className='tours__content-cards-body-title'>
                          {tour.name}
                        </h3>

                        <p className='tours__content-cards-body-description'>
                          {tour.description}
                        </p>

                        <p className='tours__content-cards-body-location'>
                          <MdLocationPin className='tours__content-cards-body-location-icon' />
                          {tour.location}
                        </p>

                        <p className='tours__content-cards-body-duration'>
                          <HiClock className='tours__content-cards-body-duration-icon' />
                          {tour.duration} Days
                        </p>

                        <p className='tours__content-cards-body-price'>
                          <FaDollarSign className='tours__content-cards-body-price-icon' />
                          {tour.price}
                        </p>

                        <p className='tours__content-cards-body-complexity'>
                          <GiBiceps className='tours__content-cards-body-complexity-icon' />
                          {tour.complexity}
                        </p>

                        <div className='tours__content-cards-body-cta'>
                          <button
                            className='tours__content-cards-body-cta-buy'
                            onClick={() => openBuyForm(tour)}
                          >
                            Buy
                          </button>

                          <button
                            className='tours__content-cards-body-cta-map'
                            onClick={() => openMap(tour)}
                          >
                            See on Map
                          </button>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {buyForm && (
              <div className='buyForm__overlay'>
                <div className='buyForm__overlay-container'>
                  <button
                    className='buyForm__overlay-container-button'
                    onClick={closeBuyForm}
                  >
                    Close
                  </button>

                  <div className='buyForm__overlay-container-body'>
                    <div className='buyForm__overlay-container-body-address'>
                      <label className='buyForm__overlay-container-body-address-label'>
                        Address Street/Number
                      </label>
                      <input
                        type='text'
                        ref={addressRef}
                        onChange={(e) => {
                          let value = e.target.value;
                          let formattedValue = '';

                          if (value.length > 0) {
                            formattedValue =
                              value.charAt(0).toUpperCase() + value.slice(1);
                          }

                          e.target.value = formattedValue;
                        }}
                        className='buyForm__overlay-container-body-address-input'
                      />
                    </div>

                    <div className='buyForm__overlay-container-body-location'>
                      <div className='buyForm__overlay-container-body-location-city'>
                        <label className='buyForm__overlay-container-body-location-city-label'>
                          City
                        </label>
                        <input
                          type='text'
                          ref={cityRef}
                          onChange={(e) => {
                            let value = e.target.value.trim();
                            const words = value.split(' ');

                            words[0] =
                              words[0].charAt(0).toUpperCase() +
                              words[0].slice(1).toLowerCase();

                            value = words.slice(0, 1).join(' ');

                            e.target.value = value;
                          }}
                          className='buyForm__overlay-container-body-location-city-input'
                        />
                      </div>

                      <div className='buyForm__overlay-container-body-location-state'>
                        <label className='buyForm__overlay-container-body-location-state-label'>
                          State
                        </label>
                        <input
                          type='text'
                          ref={stateRef}
                          pattern='[A-Za-z]{2}'
                          maxLength={2}
                          onChange={(e) => {
                            e.target.value = e.target.value
                              .replace(/[^A-Za-z]/g, '')
                              .toUpperCase();
                          }}
                          className='buyForm__overlay-container-body-location-state-input'
                        />
                      </div>

                      <div className='buyForm__overlay-container-body-location-zipcode'>
                        <label className='buyForm__overlay-container-body-location-zipcode-label'>
                          Zip Code
                        </label>
                        <input
                          type='number'
                          ref={zipCodeRef}
                          pattern='\d{0,6}'
                          maxLength={6}
                          onChange={(e) => {
                            const value = e.target.value;

                            if (value.length > 6) {
                              e.target.value = value.slice(0, 6);
                            }
                          }}
                          className='buyForm__overlay-container-body-location-zipcode-input'
                        />
                      </div>
                    </div>

                    <div className='buyForm__overlay-container-body-card'>
                      <label className='buyForm__overlay-container-body-card-label'>
                        Card Number
                      </label>
                      <input
                        type='text'
                        ref={cardNumberRef}
                        pattern='[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}'
                        maxLength={19}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\s/g, '');
                          let formattedValue = '';
                          let chunkLength = 4;

                          for (let i = 0; i < value.length; i += chunkLength) {
                            let chunk = value.substr(i, chunkLength);

                            if (chunk.length === chunkLength) {
                              formattedValue += chunk + ' ';
                            } else {
                              formattedValue += chunk;
                            }
                          }

                          if (!/^[0-9\s]*$/.test(formattedValue)) {
                            formattedValue = formattedValue.replace(
                              /[^0-9\s]/g,
                              ''
                            );
                          }

                          e.target.value = formattedValue.trim();
                        }}
                        className='buyForm__overlay-container-body-card-input'
                      />
                    </div>

                    <div className='buyForm__overlay-container-body-cardInfo'>
                      <div className='buyForm__overlay-container-body-cardInfo-date'>
                        <label className='buyForm__overlay-container-body-cardInfo-date-label'>
                          Expiration Date
                        </label>
                        <input
                          type='text'
                          ref={expirationDateRef}
                          maxLength={7}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');

                            if (value.length > 2) {
                              e.target.value = `${value.slice(
                                0,
                                2
                              )} / ${value.slice(2, 6)}`;
                            } else {
                              e.target.value = value;
                            }
                          }}
                          className='buyForm__overlay-container-body-cardInfo-date-input'
                        />
                      </div>

                      <div className='buyForm__overlay-container-body-cardInfo-cvv'>
                        <label className='buyForm__overlay-container-body-cardInfo-cvv-label'>
                          CVV
                        </label>
                        <input
                          type='number'
                          ref={cvvRef}
                          onChange={(e) => {
                            const value = e.target.value;

                            if (value.length > 3) {
                              e.target.value = value.slice(0, 3);
                            }
                          }}
                          className='buyForm__overlay-container-body-cardInfo-cvv-input'
                        />
                      </div>
                    </div>

                    {paymentPlaced ? (
                      <p className='buyForm__overlay-container-body-buyedText'>
                        Thank you. Your payment has been processed.
                      </p>
                    ) : (
                      <button
                        className='buyForm__overlay-container-body-button'
                        onClick={handlePayButton}
                      >
                        Pay ${selectedTour ? selectedTour.price : '0'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {isMapOpen && (
              <div className='map__overlay'>
                <button className='map__overlay-button' onClick={closeMap}>
                  Close
                </button>

                <div className='map__overlay-container'>
                  <MapContainer
                    center={
                      selectedTour
                        ? [selectedTour.tourLat, selectedTour.tourLng]
                        : [0, 0]
                    }
                    zoom={15}
                  >
                    <TileLayer
                      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {selectedTour && (
                      <Marker
                        position={[selectedTour.tourLat, selectedTour.tourLng]}
                        icon={myMarker}
                      >
                        <Popup style={{ display: 'none' }}>
                          <p
                            style={{
                              fontSize: '1.65rem',
                              fontWeight: 500,
                              letterSpacing: '0.15rem',
                              wordSpacing: '0.1rem',
                            }}
                          >
                            {selectedTour.location}
                          </p>
                        </Popup>
                      </Marker>
                    )}
                  </MapContainer>
                </div>
              </div>
            )}

            <Footer />
          </div>
        )}
      </div>
    </HelmetProvider>
  );
}

export default Tours;
