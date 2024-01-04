import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useLocation } from 'react-router-dom';
import AirlineNavbar from './anavabar';
import RoutesList from './routelist';



const AddFlight = () => {
  const { user } = useAuth();
  const location = useLocation();
  const userId = location.state?.userId || (user && user.userId) || localStorage.getItem('id');
  const incrementedUserId = userId ? parseInt(userId) + 1 : null;

  const [flightData, setFlightData] = useState({
    arrivalDate: '',
    availableSeats: 0,
    businessClassPrice: 0,
    code: '',
    departureDate: '',
    departureTime: '',
    economyClassPrice: 0,
    firstClassPrice: 0,
    source: '',
    destination: '',
  });

  const [confirmation, setConfirmation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!incrementedUserId) {
      console.error('User ID not available. Handle it accordingly.');
      return;
    }

    const API_URL = `http://localhost:8081/flight/add/${incrementedUserId}`;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flightData),
      });

      if (response.ok) {
        const newFlight = await response.json();
        console.log('Flight added successfully:', newFlight);
        setConfirmation(`Flight added successfully! Flight ID: ${newFlight.id}`);
      } else {
        console.error(`Failed to add flight. Status: ${response.status}`);
        console.error('Server response:', await response.json());
        setConfirmation('Failed to add flight. Please try again.');
      }
    } catch (error) {
      console.error('Error adding flight:', error);

      if (error instanceof Response) {
        console.error('Server response:', await error.json());
      }

      setConfirmation('Error adding flight. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }; 
  return (
    <div>
      <AirlineNavbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-header">
                <h2 className="mb-0">Add Flight</h2>
              </div>
              <div className="card-body">
                <form>
            <div className="mb-3">
              <label className="form-label">Arrival Date:</label>
              <input type="date" className="form-control" name="arrivalDate" value={flightData.arrivalDate} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Available Seats:</label>
              <input type="number" className="form-control" name="availableSeats" value={flightData.availableSeats} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Business Class Price:</label>
              <input type="number" className="form-control" name="businessClassPrice" value={flightData.businessClassPrice} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Flight Code:</label>
              <input type="text" className="form-control" name="code" value={flightData.code} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Departure Date:</label>
              <input type="date" className="form-control" name="departureDate" value={flightData.departureDate} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Departure Time:</label>
              <input type="text" className="form-control" name="departureTime" value={flightData.departureTime} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Economy Class Price:</label>
              <input type="number" className="form-control" name="economyClassPrice" value={flightData.economyClassPrice} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">First Class Price:</label>
              <input type="number" className="form-control" name="firstClassPrice" value={flightData.firstClassPrice} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Source:</label>
              <input type="text" className="form-control" name="source" value={flightData.source} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Destination:</label>
              <input type="text" className="form-control" name="destination" value={flightData.destination} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              
                Add Flight
              </button>
              </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <RoutesList />
          </div>
        </div>
        {/* Display confirmation message */}
        {confirmation && (
          <div className="alert alert-success mt-3" role="alert">
            {confirmation}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddFlight;