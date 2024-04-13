import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TheatersPage from './Components/TheatersPage';
import Movies from './Components/Movies';
import Header from './Components/Header';
import { useState } from 'react';
import CityWiseMovies from './Components/CityWiseMovies';
import SeatSelectionPage from './Components/SeatSelectionPage';
import BookingSuccess from './Components/BookingSuccess';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import BookedTickets from './Components/BookedTickets';
import AdminLogin from './Components/AdminLogin';
import AdminDashBoard from './Components/AdminDashBoard';
import AdminDashBoardMovies from './Components/AdminDashBoardMovies';
import AdminCities from './Components/AdminCities';
function App() {
  const [selectedCity, setSelectedCity] = useState(''); 
  const cities = ['City X', 'City Y', 'City Z', 'City P']; 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const onSelectCity = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    window.location.href = `/movies/${city}`;
  };
  const handleSignIn = () => {
    setIsAuthenticated(true);
  };
  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    // Optionally, perform other sign-out related tasks
  };
  return (
    <BrowserRouter>
      <Header
        pageTitle="Movies"
        cities={cities}
        selectedCity={selectedCity}
        onSelectCity={onSelectCity}
        isAuthenticated={isAuthenticated}
        onSignOut={handleSignOut} // Pass sign out handler function to Header
      />
      
      
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/signin" element={<Signin isAuthenticated={isAuthenticated} onSignIn={handleSignIn} />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:city" element={<CityWiseMovies />} />
        <Route path="/movies/:city/:movieId" element={<TheatersPage />} />
        <Route path="/seats/:city/:movieId/:theaterId" element={<SeatSelectionPage />} />
        <Route path="/:uuid/:booking_id/success" element={<BookingSuccess />} />
        <Route path="/:uuid/bookedtickets" element={<BookedTickets />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/admin/adminDashboard" element={<AdminDashBoard/>} />
        <Route path="/admin/AdminDashboard/Movies" element={<AdminDashBoardMovies/>} />
        <Route path="/admin/AdminDashboard/Cities" element={<AdminCities/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
