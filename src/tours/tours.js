import React, { useState, useEffect } from 'react';
import HomeButton from '../home/homeButton';
import Footer from '../footer/footer';
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
      console.log('API response:', data);
      setData(data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }

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
                  <div key={index} className='tours__content-card'>
                    <div className='tours__content-bg'>
                      <div className='tours__content-bg-heading'>
                        <span className='tours__content-bg-heading-name'>
                          {tour.name}
                        </span>
                      </div>
                      {image && (
                        <img
                          src={image.tourImage}
                          alt='Tour'
                          className='tours__content-img'
                        />
                      )}
                    </div>

                    <div className='tours__content-card-description'>
                      <p className='tours__content-card-description-about'>
                        {tour.description}
                      </p>

                      <div className='tours__content-card-description-content'>
                        <p className='tours__content-card-description-content-item'>
                          <MdLocationPin className='tours__content-card-description-content-icon' />
                          {tour.location}
                        </p>

                        <p className='tours__content-card-description-content-item'>
                          <HiClock className='tours__content-card-description-content-icon' />
                          {tour.duration} Days
                        </p>

                        <p
                          className='tours__content-card-description-content-item'
                          style={{
                            color:
                              tour.complexity === 'Easy'
                                ? '#277d36'
                                : tour.complexity === 'Medium'
                                ? '#fcc419'
                                : '#d9480f',
                          }}
                        >
                          <GiBiceps className='tours__content-card-description-content-icon' />
                          {tour.complexity}
                        </p>

                        <p className='tours__content-card-description-content-item'>
                          <FaDollarSign className='tours__content-card-description-content-icon' />
                          {tour.price}
                        </p>
                      </div>

                      <div className='tours__content-card-description-cta'>
                        <button className='tours__content-card-description-button'>
                          Buy
                        </button>

                        <button
                          className='tours__content-card-description-button'
                          onClick={() => openMap(tour)}
                        >
                          See on Map
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {isMapOpen && (
              <div className='map__overlay'>
                <button className='map__overlay-button' onClick={closeMap}>
                  Close Map
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
