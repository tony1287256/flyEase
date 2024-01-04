// AirlineNavbar.js
import React, { useState } from 'react';
import { Container, Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

function AirlineNavbar({ func }) {
  const [qStr, setQStr] = useState('');
  const navigate = useNavigate();
  const [param] = useSearchParams();

  const handleAddRoutesClick = () => {
    // Redirect to the add routes page or perform other actions
    navigate('/airline/components/route');
  };

  const handleRouteSliderClick = () => {
    // Redirect to the Route Slider page or perform other actions
    navigate('/airline/components/routeaccordino');
  };
  const handleShowRouteClick = () => {
    // Redirect to the Route Slider page or perform other actions
    navigate('/airline/components/showroutes');
  };

  return (
    <div className="mb-4">
      <Navbar bg="primary" variant="dark" style={{ marginLeft: '4px', marginRight: '5px' }}>
        <Container>
          <Navbar.Brand href="#home">FlyEase</Navbar.Brand>

          <Nav className="mr-auto">
            <Nav.Link onClick={() => navigate('/airline/components/Adashboard')}>
              <Button variant="outline-light">Home 🏠</Button>
            </Nav.Link>

            <Nav.Link onClick={() => navigate('/airline/components/flightadd')}>
              <Button variant="outline-light">Add Flight</Button>
            </Nav.Link>
            {/* <Nav.Link onClick={() => navigate('/airline/components/addflight')}>
              <Button variant="outline-light">Add flight</Button>
            </Nav.Link> */}
            <Nav.Link onClick={() => navigate('/airline/components/addingseats')}>
              <Button variant="outline-light">Add seats</Button>
            </Nav.Link>
            <NavDropdown title="Routes" id="dropdown-basic-button">
              <NavDropdown.Item onClick={handleAddRoutesClick}>Add Routes</NavDropdown.Item>
              {/* <NavDropdown.Item onClick={handleRouteSliderClick}>Delete route</NavDropdown.Item> */}
              <NavDropdown.Item onClick={handleShowRouteClick}>Show all routes route</NavDropdown.Item>
              {/* Add more dropdown items as needed */}
              {/* Add more dropdown items as needed */}
            </NavDropdown>
          </Nav>

          <Nav className="ml-auto">
            <Nav.Link onClick={() => navigate('/airline/components/airlinehelp')}>
              <Button variant="outline-light">Help 🙋🏻‍♂️</Button>
            </Nav.Link>
           
          </Nav>
        </Container>

        <Navbar.Collapse className="justify-content-end">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              func(qStr);
            }}>
            <Row >
            <Col xs="auto">
             
            </Col>
          </Row>
        </Form>
       
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {
              localStorage.getItem('isLoggedIn')?
              <React.Fragment>
              <Navbar.Text >
              signed in as :<span style={{color: "white"}}> 
              {localStorage.getItem('username')} 
              </span>
            </Navbar.Text>
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-danger btn-sm ml-4"variant="outline-light" onClick={()=>{
              localStorage.clear();
              navigate('/auth/login?msg=you have logged out..')
            }}>Logout</button>
            </React.Fragment>
            : 
            <button className="btn btn-danger" variant="outline-light" onClick={()=>navigate('/auth/login')}>Login</button>
            }
            
  
          </Navbar.Collapse>
           
        </Navbar>
        </div>
    );
  }
export default AirlineNavbar;
