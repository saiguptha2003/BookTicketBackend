import React from 'react';
import './Header.css';
function Header({ pageTitle, cities, selectedCity, onSelectCity, isAuthenticated }) {
  function onSignOut() {
    localStorage.clear();
  }
  function handleBookedTickets(){
    window.location.href = `${localStorage.getItem('userId')}/bookedtickets`;
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">BookTicket &nbsp;&nbsp;<span className="spanner">{pageTitle}</span></a>
        {/* City Dropdown */}
        <select className={'list'} aria-label=".form-select-sm example" value={selectedCity} onChange={onSelectCity}>
          <option>Select City</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
   
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {localStorage.getItem('isAuthenticated') ? (
              <>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/" onClick={onSignOut}>Sign Out</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" onClick={handleBookedTickets}>Booked Tickets</a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/signin">SignIn</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/signup">SignUp</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
