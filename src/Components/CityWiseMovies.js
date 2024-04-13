import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CityWiseMovies() {
  const { city } = useParams(); // Get the city from URL parameters
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies(city); // Pass the city obtained from URL parameters
  }, [city]);

  const fetchMovies = async (city) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/movies/${city}`);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      setMovies(data);
      setError(null); // Reset error state
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Error fetching movies. Please try again later.');
    }
  };

  const handleMovieClick = (movieId) => {
    window.location.href = `/movies/${city}/${movieId}`;
  };

  return (
    <div className="container">
      <h2>Movies in {city}</h2>
      <div className="row">
        {error && <p>{error}</p>}
        {movies.map(movie => (
          <div key={movie.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={`/image.png`} className="card-img-top" alt={movie.title} />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-text">Languages: {movie.language}</p>
                  <p className="card-text">Director: {movie.director}</p>
                </div>
                <button type="button" className="btn btn-primary" onClick={() => handleMovieClick(movie.id)}>View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CityWiseMovies;
