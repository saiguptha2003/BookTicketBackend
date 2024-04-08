// Header.js
import React from 'react';

function Header({ pageTitle }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">BookTicket &nbsp;&nbsp;<span className="spanner">{pageTitle}</span></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link text-white" href="/login">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/signup">SignUp</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
