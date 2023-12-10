import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ENavbarComponent from './enavbar';

const GetAllAirlines = () => {
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const response = await axios.get('http://localhost:8081/airline/getall');
        setAirlines(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching airlines:', error);
        setLoading(false);
      }
    };

    fetchAirlines();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div><ENavbarComponent/>
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Airlines</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <ul className="list-group">
          {airlines.map((airline) => (
            <li key={airline.id} className="list-group-item">
              <strong>{airline.name}</strong> - {airline.code}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default GetAllAirlines;
