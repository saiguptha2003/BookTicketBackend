import React from 'react';

function TheatersPage({ location }) {
  const selectedMovie = location.state.movie;

  return (
    <div>
      <h1>Theaters for {selectedMovie.title}</h1>
      <div className="container">
        <div className="row">
          {selectedMovie.theaters.map(theater => (
            <div key={theater.id} className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{theater.name}</h5>
                  <p className="card-text">Seating Arrangement: {theater.seating_arrangement.join(', ')}</p>
                  <button className="btn btn-primary">Select</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TheatersPage;
