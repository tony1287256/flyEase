// AccordionSection.js
import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

const AccordionSection = ({ title, children, eventKey }) => (
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey={eventKey}>
      <Card.Title>{title}</Card.Title>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey={eventKey}>
      <Card.Body>{children}</Card.Body>
    </Accordion.Collapse>
  </Card>
);

export default AccordionSection;