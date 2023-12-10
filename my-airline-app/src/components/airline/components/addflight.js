import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import AirlineNavbar from './anavabar';
import RoutesList from './routelist';
import { useAuth } from '../../auth/AuthContext';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';

const AddFlightForm = () => {
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
    source: null,
    destination: null,
  });

  const [confirmation, setConfirmation] = useState(null);
  const [routeList, setRouteList] = useState({ departure: [], destination: [],arrival: [], source: [] });
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch('http://localhost:8081/route/getall');
        if (response.ok) {
          const routeData = await response.json();

          const departureOptions = routeData.map(route => ({
            value: route.id,
            label: `${route.departureCity}`,
          }));
          const arrivalOptions = routeData.map(route => ({
            value: route.id,
            label: `${route.arrivalCity}`,
          }));

          setRouteList({ departure: departureOptions, arrival: arrivalOptions });
        } else {
          console.error('Failed to fetch routes.');
        }
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  const handleRouteSelection = async (selectedOption, key) => {
    try {
      if (!selectedOption) {
        console.error('Invalid route value selected.');
        return;
      }

      const response = await fetch(`http://localhost:8081/route/getone/${selectedOption.value}`);
      if (response.ok) {
        const routeDetails = await response.json();
        setSelectedRoute(routeDetails);
        setFlightData((prevData) => ({
          ...prevData,
          [key]: selectedOption,
        }));
      } else {
        console.error('Failed to fetch route details.');
      }
    } catch (error) {
      console.error('Error fetching route details:', error);
    }
  };

  const handleChange = (selectedOption, key) => {
    setFlightData((prevData) => ({
      ...prevData,
      [key]: selectedOption || null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!incrementedUserId) {
      console.error('User ID not available. Handle it accordingly.');
      return;
    }

    if (!flightData.source || !flightData.destination || !flightData.source.value || !flightData.destination.value) {
      console.error('Please select both source and destination.');
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
        setConfirmation('Failed to add flight. Please try again.');
      }
    } catch (error) {
      console.error('Error adding flight:', error);
      setConfirmation('Error adding flight. Please try again.');
    }
  };

  return (
    <div>
      <AirlineNavbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="shadow p-3 mb-5 bg-white rounded">
              <h2>Add Flight</h2>
              <Form onSubmit={handleSubmit}>
                {Object.keys(flightData).map((key) => (
                  <Form.Group key={key} controlId={key}>
                    <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}:</Form.Label>
                    {key === 'source' || key === 'destination' ? (
                      <div>
                        <Select
                          options={routeList[key]}
                          value={flightData[key]}
                          onChange={(selectedOption) => handleRouteSelection(selectedOption, key)}
                          isSearchable
                          placeholder={`Select ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                        />
                        {selectedRoute && flightData.source && flightData.destination && (
                          <p className="mt-2">
                            {key.charAt(0).toUpperCase() + key.slice(1)} details: {selectedRoute[key]}
                          </p>
                        )}
                      </div>
                    ) : (
                      <Form.Control
                        type={key === 'availableSeats' ? 'number' : 'text'}
                        name={key}
                        value={flightData[key]}
                        onChange={(e) => handleChange(e.target.value, key)}
                        required
                      />
                    )}
                  </Form.Group>
                ))}
                <Button type="submit" variant="primary">
                  Add Flight
                </Button>
              </Form>

              {confirmation && (
                <div className="mt-3 alert alert-success" role="alert">
                  {confirmation}
                </div>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <RoutesList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFlightForm;
