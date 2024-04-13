import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function TheatersPage() {
  const { city, movieId } = useParams(); // Get the city and movieId from URL parameters
  const [theaters, setTheaters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTheaters(city, movieId);
  }, [city, movieId]);

  const fetchTheaters = async (city, movieId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/theaters/${movieId}?city=${city}`);
      if (!response.ok) {
        throw new Error('Failed to fetch theaters');
      }
      const data = await response.json();
      setTheaters(data);
      setError(null); // Reset error state
    } catch (error) {
      console.error('Error fetching theaters:', error);
      setError('Error fetching theaters. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h2>Theaters showing the movie in {city}</h2>
      {error && <p className="error">{error}</p>}
      <div className="theaters-container">
        {theaters.map(theater => (
          <div key={theater.id} className="card">
            <h3 className="theater-name">{theater.name}</h3>
            <p className="theater-location">Location: {theater.location}</p>
            {/* Add a Link to the seat selection page */}
            <Link to={`/seats/${city}/${movieId}/${theater.id}`} className="btn btn-primary">
              Select Seat
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TheatersPage;
