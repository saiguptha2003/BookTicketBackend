import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
import '../App.css'
function BookingSuccess() {
  const { booking_id } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    // Fetch booking details using the booking_id
    // Example:
    // fetchBookingDetails(booking_id);
  }, [booking_id]);

  return (
    <div className="container">
      <h2>Booking Success</h2>
      {/* Render the GIF */}
      <img style={{
        width: '200px',
        height: '200px',
        display: 'block',
        margin: '0 auto',
      }} src={'/success.gif'} alt="Booking Success GIF" />

      <div className="row">
        <button className="home" onClick={() => window.location.href = '/'}>Go to Home</button>
      </div>
    </div>
  );
}

export default BookingSuccess;
