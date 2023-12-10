import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import NavbarComponent from "./navbar";

const OffersPage = () => {
  const offers = [
    { title: "Special Discount", description: "Get 20% off on selected flights. Limited time offer!" },
    { title: "Premium Package", description: "Upgrade to our premium package and enjoy exclusive perks." },
    { title: "Weekend Getaway", description: "Book a weekend trip now and save with our weekend specials." },
    { title: "Frequent Flyer Rewards", description: "Join our loyalty program and earn rewards for every flight." },
    { title: "Business Class Bonanza", description: "Experience luxury with our business class seats. Book now!" },
    { title: "Last-Minute Deals", description: "Grab our last-minute flight deals. Don't miss out on big savings!" },
  ];

  return (
    <div><NavbarComponent />
    <Container>
      
      <h2 className="my-4 text-center">Exclusive Offers</h2>
      <Row className="justify-content-center">
        {offers.map((offer, index) => (
          <Col key={index} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title className="text-center">{offer.title}</Card.Title>
                <Card.Text>{offer.description}</Card.Text>
                <Button variant="primary" className="w-100">
                  Claim Offer
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
};

export default OffersPage;
