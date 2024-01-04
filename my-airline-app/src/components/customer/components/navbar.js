import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

function NavbarComponent({ func }) {
  const [qStr, setQStr] = useState("");
  const navigate = useNavigate();
  const [param] = useSearchParams();

  return (
    <div className="mb-4">
      <Navbar bg="danger" data-bs-theme="blue" style={{ marginLeft: "4px", marginRight: "5px" }}>
        <Container>
          <Navbar.Brand href="#home">FlyEase</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => navigate('/')}>
              <Button variant="outline-light">
                <i className="bi bi-house-door"></i> Home 🏠
              </Button>
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/customer/components/previous')}>
              <Button variant="outline-light">
                <i className="bi bi-clock-history"></i> Previous Bookings
              </Button>
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/customer/components/promo')}>
              <Button variant="outline-light">
                <i className="bi bi-gift"></i> Offers
              </Button>
            </Nav.Link>
          </Nav>

          <Nav className="ml-auto">
            <Nav.Link onClick={() => navigate('/customer/components/customerhelp')}>
              <Button variant="outline-light">
                <i className="bi bi-question-circle"></i> Help 🙋🏻‍♂️
              </Button>
            </Nav.Link>
          </Nav>
        </Container>

        <Navbar.Collapse className="justify-content-end">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              func(qStr);
            }}
          >
            <Row>
              <Col xs="auto"></Col>
            </Row>
          </Form>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {localStorage.getItem('isLoggedIn') ? (
            <React.Fragment>
              <Navbar.Text>
                signed in as :<span style={{ color: "white" }}>{localStorage.getItem('username')}</span>
              </Navbar.Text>
              &nbsp;&nbsp;&nbsp;
              <button
                className="btn btn-danger btn-sm ml-4"
                variant="outline-light"
                onClick={() => {
                  localStorage.clear();
                  navigate('/auth/login?msg=you have logged out..');
                }}
              >
                <i className="bi bi-box-arrow-right"></i> Logout
              </button>
            </React.Fragment>
          ) : (
            <button className="btn btn-danger" variant="outline-light" onClick={() => navigate('/auth/login')}>
              <i className="bi bi-box-arrow-in-right"></i> Login
            </button>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
