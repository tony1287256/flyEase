import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlightsPage = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('id'); // Get user ID from localStorage
    const incrementedUserId = userId ? String(Number(userId) + 1) : null; // Increment the user ID

    const fetchFlights = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/airline/getone/${incrementedUserId}`);
        const responseData = response.data;

        console.log('API Response:', responseData);

        // Extract flights from the entire response
        const fetchedFlights = responseData.flights || [];

        console.log('Fetched Flights:', fetchedFlights);

        // Check if fetchedFlights is an array before updating state
        if (Array.isArray(fetchedFlights)) {
          setFlights(fetchedFlights);
        } else {
          console.error('Invalid data structure for flights:', fetchedFlights);
        }
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div>
      <h2>All Flights</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Code</th>
            <th>Departure Time</th>
            <th>Departure Date</th>
            <th>User ID</th>
            <th>Username</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.id}</td>
              <td>{flight.name}</td>
              <td>{flight.code}</td>
              <td>{flight.departureTime}</td>
              <td>{flight.departureDate}</td>
              <td>{flight.user.id}</td>
              <td>{flight.user.username}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightsPage;
