// ExecutiveDashboard.js
import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';
import ENavbarComponent from './enavbar';

const ExecutiveDashboard = () => {
  const [expandedSections, setExpandedSections] = useState({
    totalAirlines: false,
    totalUsers: false,
    totalFeedbacks: false,
  });

  const [totalAirlines, setTotalAirlines] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [error, setError] = useState(null);
  const [showAirlinesModal, setShowAirlinesModal] = useState(false);
  const [showFeedbacksModal, setShowFeedbacksModal] = useState(false);
  const [allAirlines, setAllAirlines] = useState([]);
  const [allFeedbacks, setAllFeedbacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAirlines = await axios.get('http://localhost:8081/executive/totalairlines');
        console.log('Response Airlines:', responseAirlines.data);
        setTotalAirlines(responseAirlines.data);

        const responseUsers = await axios.get('http://localhost:8081/executive/totalusers');
        console.log('Response Users:', responseUsers.data);
        setTotalUsers(responseUsers.data);

        const responseFeedbacks = await axios.get('http://localhost:8081/executive/totalfeedbacks');
        console.log('Response Feedbacks:', responseFeedbacks.data);
        setTotalFeedbacks(responseFeedbacks.data);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleSection = (section) => {
    setExpandedSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  const handleViewAirlines = async () => {
    try {
      const response = await axios.get('http://localhost:8081/airline/getall');
      setAllAirlines(response.data);
      setShowAirlinesModal(true);
    } catch (error) {
      console.error('Error fetching all airlines:', error);
    }
  };

  const handleViewFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:8081/feedback/getall');
      setAllFeedbacks(response.data);
      setShowFeedbacksModal(true);
    } catch (error) {
      console.error('Error fetching all feedbacks:', error);
    }
  };

  return (
    <div>
      <ENavbarComponent />
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title>Total Airlines</Card.Title>
                <Button
                  variant="link"
                  onClick={() => toggleSection('totalAirlines')}
                >
                  {expandedSections.totalAirlines ? 'Collapse' : 'View'}
                </Button>
              </Card.Header>
              {expandedSections.totalAirlines && (
                <Card.Body>
                  {error ? (
                    <Alert variant="danger">{error}</Alert>
                  ) : (
                    <>
                      <p>Total Airlines: {totalAirlines}</p>
                      {/* Small button inside the expansion panel */}
                      <Button variant="primary" size="sm" className="mt-2" onClick={handleViewAirlines}>
                        View Airlines
                      </Button>
                    </>
                  )}
                </Card.Body>
              )}
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Header>
                <Card.Title>Total Users</Card.Title>
                <Button
                  variant="link"
                  onClick={() => toggleSection('totalUsers')}
                >
                  {expandedSections.totalUsers ? 'Collapse' : 'View'}
                </Button>
              </Card.Header>
              {expandedSections.totalUsers && (
                <Card.Body>
                  {error ? (
                    <Alert variant="danger">{error}</Alert>
                  ) : (
                    <>
                      <p>Total Users: {totalUsers}</p>
                      {/* Small button inside the expansion panel */}
                      <Button variant="primary" size="sm" className="mt-2">
                        View Total users
                      </Button>
                    </>
                  )}
                </Card.Body>
              )}
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Header>
                <Card.Title>Total Feedbacks</Card.Title>
                <Button
                  variant="link"
                  onClick={() => toggleSection('totalFeedbacks')}
                >
                  {expandedSections.totalFeedbacks ? 'Collapse' : 'View'}
                </Button>
              </Card.Header>
              {expandedSections.totalFeedbacks && (
                <Card.Body>
                  {error ? (
                    <Alert variant="danger">{error}</Alert>
                  ) : (
                    <>
                      <p>Total Feedbacks: {totalFeedbacks}</p>
                      {/* Small button inside the expansion panel */}
                      <Button variant="primary" size="sm" className="mt-2" onClick={handleViewFeedbacks}>
                        View Feedbacks
                      </Button>
                    </>
                  )}
                </Card.Body>
              )}
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal to display all airlines */}
      <Modal show={showAirlinesModal} onHide={() => setShowAirlinesModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>All Airlines</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {allAirlines.map((airline) => (
              <li key={airline.id}>{airline.name} - {airline.code}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAirlinesModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal to display all feedbacks */}
      <Modal show={showFeedbacksModal} onHide={() => setShowFeedbacksModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>All Feedbacks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {allFeedbacks.map((feedback) => (
              <li key={feedback.id}>{feedback.comment}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFeedbacksModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ExecutiveDashboard;
