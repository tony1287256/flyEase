import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NavbarComponent from './navbar';

const CustomerHelpPage = () => {
  return (
    <div><NavbarComponent/>
    <Container className="mt-5">
      <h2 className="text-center mb-4">Help Center</h2>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>How to Book a Flight?</Card.Title>
              <Card.Text>
              Choose your flight class: Consider the number of passengers and any applicable promo codes. 
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Refund Policy</Card.Title>
              <Card.Text>
              Return policies are an extension of the customer service retailers provide; they tend to be fairly liberal as a consequence.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Contact Us</Card.Title>
              <Card.Text>
             If you need further assistance, please contact us:
              
                <li>Email: support@example.com</li>
                <li>Phone: +123-456-7890</li>
                
               
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Frequently Asked Questions</Card.Title>
              <Card.Text>
              Before booking a flight, you will need a  flight and passenger details   like the destination you are traveling to, preferred flight class, and your personal information like full name, ID, mobile number, residential and e-mail address. 
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Additional Information</Card.Title>
              <Card.Text>
              If you are traveling abroad, passport details are the first thing you need when booking your flight. It is required to enter your passport number during the online flight booking process. Ensure you carry the original copy of your passport with you during the booking process and required during the flight's boarding process.
               
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default CustomerHelpPage;
