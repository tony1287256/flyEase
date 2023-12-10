// ExecutiveDashboard.js
import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Accordion, Alert } from 'react-bootstrap';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAirlines = await axios.get('http://localhost:8081/executive/totalairlines');
        setTotalAirlines(responseAirlines.data);

        const responseUsers = await axios.get('http://localhost:8081/executive/totalusers');
        setTotalUsers(responseUsers.data);

        const responseFeedbacks = await axios.get('http://localhost:8081/executive/totalfeedbacks');
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
              <Accordion.Collapse eventKey="totalAirlines">
                <Card.Body>
                  {error ? (
                    <Alert variant="danger">{error}</Alert>
                  ) : (
                    <>
                      <p>Total Airlines: {totalAirlines}</p>
                      {/* Small button inside the expansion panel */}
                      <Button variant="primary" size="sm" className="mt-2">
                        Small Button
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Accordion.Collapse>
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
              <Accordion.Collapse eventKey="totalUsers">
                <Card.Body>
                  {error ? (
                    <Alert variant="danger">{error}</Alert>
                  ) : (
                    <p>Total Users: {totalUsers}</p>
                  )}
                </Card.Body>
              </Accordion.Collapse>
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
              <Accordion.Collapse eventKey="totalFeedbacks">
                <Card.Body>
                  {error ? (
                    <Alert variant="danger">{error}</Alert>
                  ) : (
                    <p>Total Feedbacks: {totalFeedbacks}</p>
                  )}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ExecutiveDashboard;
