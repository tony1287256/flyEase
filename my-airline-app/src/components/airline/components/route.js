// FlightRoute.js
import React, { useState, useEffect } from 'react';
import AirlineNavbar from './anavabar';

const FlightRoute = () => {
  const [routeData, setRouteData] = useState({
    departureCity: '',
    arrivalCity: '',
    distance: 0,
    duration: 0,
  });

  const [routes, setRoutes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [addedRoute, setAddedRoute] = useState(null);

  const fetchRoutes = async () => {
    try {
      const response = await fetch('http://localhost:8081/route/getall');
      if (response.ok) {
        const routesData = await response.json();
        return routesData;
      } else {
        console.error('Failed to fetch routes.');
        return [];
      }
    } catch (error) {
      console.error('Error fetching routes:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchInitialRoutes = async () => {
      const initialRoutes = await fetchRoutes();
      setRoutes(initialRoutes);
    };

    fetchInitialRoutes();
  }, []);

  const handleInputChange = (e) => {
    setRouteData({ ...routeData, [e.target.name]: e.target.value });
  };

  const handleAddRoute = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/route/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routeData),
      });

      if (response.ok) {
        console.log('Route added successfully');
        const newRoutes = await fetchRoutes();
        setRoutes(newRoutes);

        // Show the pop-up with added route details
        setAddedRoute(routeData);
        setShowPopup(true);

        // Reset form fields
        setRouteData({
          departureCity: '',
          arrivalCity: '',
          distance: 0,
          duration: 0,
        });
      } else {
        console.error('Failed to add route.');
      }
    } catch (error) {
      console.error('Error adding route:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setAddedRoute(null);
  };

  return (
    <div><AirlineNavbar/>
      <div >
        
      </div>
      <div className="container mt-4">
        <h2>Add Route</h2>
        <form onSubmit={handleAddRoute}>
          <div className="mb-3">
            <label className="form-label">Departure City:</label>
            <input
              type="text"
              name="departureCity"
              value={routeData.departureCity}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Arrival City:</label>
            <input
              type="text"
              name="arrivalCity"
              value={routeData.arrivalCity}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Distance:</label>
            <input
              type="number"
              name="distance"
              value={routeData.distance}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Duration:</label>
            <input
              type="number"
              name="duration"
              value={routeData.duration}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Route
          </button>
        </form>
      </div>

      {showPopup && (
        <div
          className="modal-container"
          onClick={closePopup}
        >
          <div
            className="modal-content"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <span
              className="modal-close"
              onClick={closePopup}
            >
              &times;
            </span>
            <h3>Route Added Successfully</h3>
            <p>
              Departure City: {addedRoute.departureCity}<br />
              Arrival City: {addedRoute.arrivalCity}<br />
              Distance: {addedRoute.distance}<br />
              Duration: {addedRoute.duration}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightRoute;
