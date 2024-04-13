import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Seats.css';

function SeatSelectionPage() {
  const { city, movieId, theaterId } = useParams();
  const [seats, setSeats] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [Time, setTime] = useState('10:00 AM');
  const [totalAmount, setTotalAmount] = useState();
  const [date, setDate] = useState('2022-01-01');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [uuid, setUUID] = useState('');
  const [user, setUser] = useState(null);
  const [latestBookingId, setLatestBookingId] = useState('');

  useEffect(() => {
    fetchAvailableSeats(city, movieId, theaterId);
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, [city, movieId, theaterId]);

  useEffect(() => {
    const latestId = localStorage.getItem('latestBookingId');
    if (latestId) {
      setLatestBookingId(latestId);
    }
  }, []);

  const fetchAvailableSeats = async (city, movieId, theaterId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/seats/${city}/${theaterId}/${movieId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch available seats');
      }
      const data = await response.json();
      console.log('Seat data:', data);
      setSeats(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching available seats:', error);
      setError('Error fetching available seats. Please try again later.');
    }
  };

  const handleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(selectedSeat => selectedSeat !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBookTicket = () => {
    if (localStorage.getItem('isAuthenticated')) {
      setTotalAmount(selectedSeats.length * 250 + 150);
      setShowPaymentModal(true);
    } else {
      window.location.href = '/signin'; // Redirect to sign-in page if user is not signed in
    }
  };

  const handleCancel = () => {
    setSelectedSeats([]);
  };

  const handleVerify = async () => {
    if (localStorage.getItem('isAuthenticated')) {
      try {
        const uuid = localStorage.getItem('userId');
        const response = await fetch(`http://127.0.0.1:5000/${localStorage.getItem('userId')}/bookTicket`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uuid,
            selectedSeats,
            movieId,
            theaterId,
            city,
            Time,
            date,
            totalAmount: parseFloat(totalAmount) // Convert totalAmount to a float
          }),
        });
        if (response.ok) {

          const data = await response.json();
          if (data.success) {

            localStorage.setItem('latestBookingId', data.booking_id);
            setLatestBookingId(data.booking_id);
            setShowPaymentModal(false);
             window.location.href = `/${localStorage.getItem('userId')}/${localStorage.getItem('latestBookingId')}/success`;

          } else {

            console.error('Error booking ticket:', data.message);
          }
        } else {
          console.error('Failed to book ticket:', response.status);
        }

      } catch (error) {
        console.error('Error booking ticket:', error);
      }
    }
  };


  const handleHome = () => {
    window.location.href = '/'; // Redirect to home page
  };

  return (
    <div className="container">
      <h2 className='headingTop'>SELECT SEATS</h2>
      <p className='screen'>each Seat cost: 250/-</p>
      <div className="latest-booking-id">
        Latest Booking ID: {localStorage.getItem('latestBookingId')}
      </div>
      {error && <p className="error">{error}</p>}
      <div className="seats-container">
        {seats['seating_arrangement'] && seats['booked_seats'] && seats['seating_arrangement'].map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat, seatIndex) => (
              <button
                key={`${rowIndex}-${seatIndex}`}
                className={`seat ${seats['booked_seats'].includes(seat) ? 'seatbox-booked' : 'seatbox'} ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                onClick={() => handleSeatSelection(seat)}
              >
                {seat}
              </button>
            ))}
          </div>
        ))}
        <div className='linecontainer'>
          <div className="curved-line"/>
          <p className='screen'>screen</p>
        </div>
      </div>
      <div className='ticketBooking'>
        <h3 className='heading'>Selected Tickets</h3>
        <div className='ticket-container'>
          <p className='title'>Selected Seats</p>
          <p className='value'>{selectedSeats.join(', ')}</p>
        </div>
        <div className='ticket-container'>
          <p className='title'>Price of Each Ticket</p>
          <p className='value'>{250} rs</p>
        </div>
        <div className='ticket-container'>
          <p className='title'>{selectedSeats.length} x Price</p>
          <p className='value'>{250 * selectedSeats.length} rs</p>
        </div>
        <div className='ticket-container'>
          <p className='title'> Cost</p>
          <p className='value'>{(250 * selectedSeats.length) + 150} rs</p>
        </div>
        <div>
          <button className='ticket-button' onClick={handleBookTicket}>Book Ticket</button>
          <button className='ticket-button' onClick={handleCancel}>Cancel</button>
        </div>
      </div>
      {showPaymentModal && (
        <div className="overlay">
          <div className="payment-modal">
            <h2 className='ModalHeading'>Payment</h2>
            <p className='ModalText'>150 rs is convenience fee it already included in ticket.</p>
            <p className='ModalPrice'>Total Cost: {250 * selectedSeats.length + 150} rs</p>
            <p className='ModalPrice'>Payment Method</p>
            <button className='ModalPaymentMethods'>Credit Card</button>
            <button className='ModalPaymentMethods'>Debit Card</button>
            <button className='ModalPaymentMethods'>Paytm</button>
            <div className='upiBox'>

              <input className='ModalInput' type='text' placeholder='UPI ID'/>
              <button className="btn btn-primary" onClick={handleVerify}>Verify</button>
            </div>
            <button className='ModalPaymentMethods' onClick={handleHome}>Close</button>
          </div>

        </div>
      )}
    </div>
  );
}

export default SeatSelectionPage;
