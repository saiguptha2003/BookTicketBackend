import React, { useState } from 'react';
import './Cities.css';

function AdminCities() {
    const [actionType, setActionType] = useState('add');
    const [selectedCity, setSelectedCity] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newCityId, setNewCityId] = useState('');
    const [message, setMessage] = useState('');
   
    const cities = {
        'City X': [101],
        'City Y': [102],
        'City Z': [103, 104],
        'City P': [105]
    };

    const handleActionChange = (event) => {
        setActionType(event.target.value);
    };

    const handleAddOrUpdateCity = async () => {
        try {
            let url = 'http://localhost:5000/admin/AddCities';
            let body = { [newCity]: [parseInt(newCityId)] };

            if (actionType === 'update' && selectedCity) {
                url = `http://localhost:5000/admin/UpdateCity/${selectedCity}`;
                body = [parseInt(newCityId)];
            }

            // Send city data to backend
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const responseData = await response.json();
            setMessage(responseData.message);

            if (!response.ok) {
                throw new Error('Failed to add/update city');
            }

            // Optional: Redirect or show a success message
        } catch (error) {
            console.error('Error adding/updating city:', error);
        }
    };

    return (
        <div className='container'>
            <h3 className='text-center'>Admin Cities</h3>
            <div className='action-section'>
                <label>Action Type:</label>
                <div>
                    <input type="radio" id="add" name="actionType" value="add" checked={actionType === 'add'} onChange={handleActionChange} />
                    <label htmlFor="add">Add City</label>
                </div>
                <div>
                    <input type="radio" id="update" name="actionType" value="update" checked={actionType === 'update'} onChange={handleActionChange} />
                    <label htmlFor="update">Update City</label>
                </div>
            </div>
            {actionType === 'update' && (
                <div className='city-select'>
                    <label>Select City to Update:</label>
                    <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                        <option value=''>-- Select City --</option>
                        {Object.keys(cities).map((cityName) => (
                            <option key={cityName} value={cityName}>{cityName}</option>
                        ))}
                    </select>
                </div>
            )}
            
            <div className='input-section'>
                <input type='text' value={newCity} onChange={(e) => setNewCity(e.target.value)} placeholder='New City' />
                <input type='text' value={newCityId} onChange={(e) => setNewCityId(e.target.value)} placeholder='ID(s)' />
                <p className='danger'>{message}</p>
                <button onClick={handleAddOrUpdateCity}>{actionType === 'update' ? 'Update' : 'Add'} City</button>
            </div>
        </div>
    );
}

export default AdminCities;
