// RoutesList.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RoutesList = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch('http://localhost:8081/route/getall');
        if (response.ok) {
          const routeData = await response.json();
          setRoutes(routeData);
        } else {
          console.error('Failed to fetch routes.');
        }
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <div>
      <h4>Available Routes</h4>
      <ul className="list-group">
        {routes.map((route) => (
          <li key={route.id} className="list-group-item">
            {route.departureCity} to {route.arrivalCity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoutesList;
