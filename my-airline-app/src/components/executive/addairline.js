import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios from 'axios';
import ENavbarComponent from './enavbar';

const AddAirline = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAddAirline = async () => {
    try {
      const response = await axios.post('http://localhost:8081/airline/add', {
        name,
        code,
        user: {
          username,
          password,
        },
      });

      console.log('Airline added successfully:', response.data);
      // You can perform additional actions after adding the airline if needed.
    } catch (error) {
      console.error('Error adding airline:', error);
    }
  };

  return (
    <div> <ENavbarComponent/>
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Add Airline</h2>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter airline name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="code">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter airline code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="danger" type="button" onClick={handleAddAirline}>
              Add Airline
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default AddAirline;
