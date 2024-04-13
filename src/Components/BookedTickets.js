import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

function BookedTickets() {
  const [bookedTickets, setBookedTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch booked tickets data from the backend
    fetchBookedTickets();
  }, []);

  const fetchBookedTickets = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`http://127.0.0.1:5000/getBookedTickets/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch booked tickets');
      }
      const data = await response.json();
      setBookedTickets(data.booked_tickets);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching booked tickets:', error);
      setError('Error fetching booked tickets. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2>Booked Tickets</h2>
      <div>
        {bookedTickets.map(ticket => (
          <div className="ticket" key={ticket._id}>
            <div className='left'>
              <h3>Ticket ID: {ticket._id}</h3>
              <p>Movie: {ticket.movie_name}</p>
              <p>Theater: {ticket.theater_name}</p>
              <p>Seats: {ticket.seats.join(', ')}</p>
              <p>Time: {ticket.time}</p>
              <p>Date:{ticket.date}</p>
              <p>Total Amount: {ticket.totalPrice}rs</p>
            </div>
            <div className='right'>
              <QRCode value={ticket._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookedTickets;
