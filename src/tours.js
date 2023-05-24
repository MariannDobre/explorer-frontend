import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function Tours() {
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

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>Explorer | Tours</title>
        </Helmet>
        {!data ? (
          <p>Loading...</p>
        ) : (
          <div>
            {data.map((tour, index) => (
              <p key={index}>{tour.name}</p>
            ))}
          </div>
        )}
      </div>
    </HelmetProvider>
  );
}

export default Tours;
