import React, { useState } from 'react';
import './AdminMovies.css';

function AdminDashBoardMovies() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        director: '',
        rating: '',
        releaseDate: '',
        duration: '',
        theaters: [{
            id: '',
            name: '',
            startAlphabet: '',
            endAlphabet: '',
            seatsPerRow: ''
        }]
    });

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedTheaters = [...formData.theaters];
        updatedTheaters[index][name] = value;
        setFormData({
            ...formData,
            theaters: updatedTheaters
        });
    };

    const handleAddTheater = () => {
        setFormData({
            ...formData,
            theaters: [
                ...formData.theaters,
                {
                    id: '',
                    name: '',
                    startAlphabet: '',
                    endAlphabet: '',
                    seatsPerRow: ''
                }
            ]
        });
    };

    const handleRemoveTheater = (indexToRemove) => {
        setFormData({
            ...formData,
            theaters: formData.theaters.filter((theater, index) => index !== indexToRemove)
        });
    };

    const generateSeatArrangement = (startAlphabet, endAlphabet, seatsPerRow) => {
        const alphabetRange = [];
        for (let i = startAlphabet.charCodeAt(0); i <= endAlphabet.charCodeAt(0); i++) {
            alphabetRange.push(String.fromCharCode(i));
        }
        const arrangement = [];
        alphabetRange.forEach((alphabet) => {
            const row = [];
            for (let i = 1; i <= seatsPerRow; i++) {
                row.push(`${alphabet}${i}`);
            }
            arrangement.push(row);
        });
        return arrangement;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Generate seating arrangement for each theater
            const theatersWithArrangement = formData.theaters.map((theater) => ({
                ...theater,
                seating_arrangement: generateSeatArrangement(theater.startAlphabet, theater.endAlphabet, theater.seatsPerRow)
            }));

            // Construct the complete movie data
            const movieData = {
                title: formData.title,
                description: formData.description,
                director: formData.director,
                favorite_percentage: formData.rating,
                releaseDate: formData.releaseDate,
                duration: formData.duration,
                language: 'English',
                theaters: theatersWithArrangement
            };

            // Send data to the server
            const response = await fetch('http://127.0.0.1:5000//admin/AddMovies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movieData)
            });

            if (!response.ok) {
                throw new Error('Failed to add movie');
            }

            // Optional: Redirect or show a success message
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    return (
        <div className='container'>
            <h3 className='text-center'>Add Movies</h3>
            <form className='form' onSubmit={handleSubmit}>
                {/* Movie details */}
                <div className='form-group'>
                    <label>Title</label>
                    <input type='text' className='form-control' name='title' value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder='Enter Title' />
                </div>
                <div className='form-group'>
                    <label>Description</label>
                    <input type='text' className='form-control' name='description' value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder='Enter Description' />
                </div>
                <div className='form-group'>
                    <label>Director</label>
                    <input type='text' className='form-control' name='director' value={formData.director} onChange={(e) => setFormData({ ...formData, director: e.target.value })} placeholder='Enter Director' />
                </div>
                <div className='form-group'>
                    <label>Rating</label>
                    <input type='text' className='form-control' name='rating' value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} placeholder='Enter Rating' />
                </div>
                <div className='form-group'>
                    <label>Release Date</label>
                    <input type='date' className='form-control' name='releaseDate' value={formData.releaseDate} onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })} placeholder='Enter Release Date' />
                </div>
                <div className='form-group'>
                    <label>Duration</label>
                    <input type='text' className='form-control' name='duration' value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder='Enter Duration' />
                </div>

                {/* Theater details */}
                {formData.theaters.map((theater, index) => (
                    <div key={index} className='theaterbox'>
                        <div className='theater-header'>
                            <h4>Theater {index + 1}</h4>
                           
                        </div>
                        <div className='form-group'>
                            <label>Theater ID</label>
                            <input type='text' className='form-control' name='id' value={theater.id} onChange={(e) => handleChange(e, index)} placeholder='Enter Theater Id' />
                        </div>
                        <div className='column'>
                            <div className='form-group'>
                                <label>Start Alphabet</label>
                                <input type='text' className='form-control' name='startAlphabet' value={theater.startAlphabet} onChange={(e) => handleChange(e, index)} placeholder='Enter Start Alphabet' />
                            </div>
                            <div className='form-group'>
                                <label>End Alphabet</label>
                                <input type='text' className='form-control' name='endAlphabet' value={theater.endAlphabet} onChange={(e) => handleChange(e, index)} placeholder='Enter End Alphabet' />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Seats Per Row</label>
                            <input type='number' className='form-control' name='seatsPerRow' value={theater.seatsPerRow} onChange={(e) => handleChange(e, index)} placeholder='Enter Seats Per Row' />
                        </div>
                        <button type='button' className='btn btn-danger' onClick={() => handleRemoveTheater(index)}>Remove</button>
                    </div>
                ))}

                {/* Add Theater button */}
                <button type='button' className='btn btn-primary' onClick={handleAddTheater}>Add Theater</button>

                {/* Submit button */}
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
        </div>
    );
}

export default AdminDashBoardMovies;
