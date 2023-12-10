// ShowRoutes.js
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Modal, Form, Pagination } from 'react-bootstrap';
import AirlineNavbar from './anavabar';

const ShowRoutes = () => {
  const API_URL = 'http://localhost:8081/route/getall';

  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [routesPerPage] = useState(1); // Set to 1 to display one item per page
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    departureCity: '',
    arrivalCity: '',
    distance: 0,
    duration: 0,
  });

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedRouteId(null);
  };

  const handleShowUpdateModal = (routeId) => {
    setSelectedRouteId(routeId);
    setShowUpdateModal(true);
  };

  const handleUpdateInputChange = (fieldName, value) => {
    setUpdateFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleDeleteRoute = async (routeId) => {
    try {
      const response = await fetch(`http://localhost:8081/route/delete/${routeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Route with ID ${routeId} deleted successfully`);
        setRoutes((prevRoutes) => prevRoutes.filter((route) => route.id !== routeId));
      } else {
        console.error(`Failed to delete route with ID ${routeId}`);
      }
    } catch (error) {
      console.error('Error deleting route:', error);
    }
  };

  const handleUpdateRoute = async (routeId) => {
    console.log(`Updating route with ID ${routeId}`);
    handleShowUpdateModal(routeId);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          setRoutes(data);
        } else {
          console.error('Failed to fetch routes.');
        }
      } catch (error) {
        console.error('Error fetching routes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [API_URL]);

  const indexOfLastRoute = currentPage * routesPerPage;
  const indexOfFirstRoute = indexOfLastRoute - routesPerPage;
  const currentRoutes = routes.slice(indexOfFirstRoute, indexOfLastRoute);

  return (
    <div>
      <AirlineNavbar />
      <div className="container mt-4">
        <h2 className="mb-4 text-center">All Routes</h2>

        {loading && <p className="text-center">Loading...</p>}

        {!loading && routes.length === 0 && <p className="text-center">No routes available.</p>}

        {!loading && routes.length > 0 && (
          <>
            {currentRoutes.map((route) => (
              <div key={route.id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>
                      {route.departureCity} to {route.arrivalCity}
                    </Card.Title>
                    <Card.Text>
                      <strong>Distance:</strong> {route.distance} km, <strong>Duration:</strong> {route.duration} hours
                    </Card.Text>

                    <div className="d-flex justify-content-between">
                      <Button variant="danger" onClick={() => handleDeleteRoute(route.id)}>
                        Delete
                      </Button>
                      <Button variant="info" onClick={() => handleUpdateRoute(route.id)}>
                        Update
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}

            {/* Pagination */}
            <nav className="text-center mt-4">
              <Pagination>
                {Array.from({ length: Math.ceil(routes.length / routesPerPage) }).map((_, index) => (
                  <Pagination.Item
                    key={index}
                    active={currentPage === index + 1}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </nav>
          </>
        )}

        <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Route</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="departureCity">
                <Form.Label>Departure City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Departure City"
                  value={updateFormData.departureCity}
                  onChange={(e) => handleUpdateInputChange('departureCity', e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="arrivalCity">
                <Form.Label>Arrival City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Arrival City"
                  value={updateFormData.arrivalCity}
                  onChange={(e) => handleUpdateInputChange('arrivalCity', e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="distance">
                <Form.Label>Distance (km)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Distance"
                  value={updateFormData.distance}
                  onChange={(e) => handleUpdateInputChange('distance', e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="duration">
                <Form.Label>Duration (hours)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Duration"
                  value={updateFormData.duration}
                  onChange={(e) => handleUpdateInputChange('duration', e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdateModal}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleUpdateRoute(selectedRouteId)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ShowRoutes;
