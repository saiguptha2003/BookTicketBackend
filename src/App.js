// App.js
import React, { useState, useEffect } from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TheatersPage from './Components/TheatersPage';
function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  console.log(movies);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/movies');
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
    window.location.href = `/movie/${movieId}`;
  };

  return (
    <BrowserRouter>
  <Header pageTitle="Movies" />
    <div className="App">
    <Routes>
        <Route path="/movies/:id" element={<TheatersPage />} />
      </Routes>
      <div className="container">
        <div className="row">
          {error && <p>{error}</p>}
          {movies.map(movie => (
            <div key={movie.id} className="col-md-3">
              <div className="card mb-4 shadow-sm">
                <div className="card-img-overlay">
                  <div className="favorite-percentage">{movie.favorite_percentage}%</div>
                </div>
                <img src={`/image.png`} className="card-img-top" alt={movie.title} />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                
                  <p className="card-text">{movie.description}</p>
                  <div className='d-flex justify-content-between align-items-center'>
                  <p className="card-text">Languages: {movie.language}</p>
                  <p className="card-text">Director:{movie.director}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleMovieClick(movie.id)}>View</button>
                    </div>
                    <small className="text-muted">{movie.duration} mins</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
