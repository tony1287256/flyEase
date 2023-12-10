import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

const RouteAccordion = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // Fetch routes from your API
    fetch('http://localhost:8081/route/getall')
      .then((response) => response.json())
      .then((data) => setRoutes(data))
      .catch((error) => console.error('Error fetching routes:', error));
  }, []);

  return (
    <Accordion defaultActiveKey="0">
      {routes.map((route) => (
        <Card key={route.id}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={route.id.toString()}>
              {route.departureCity} to {route.arrivalCity}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={route.id.toString()}>
            <Card.Body>
              <p>
                <strong>Distance:</strong> {route.distance} km
              </p>
              <p>
                <strong>Duration:</strong> {route.duration} hours
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

export default RouteAccordion;
