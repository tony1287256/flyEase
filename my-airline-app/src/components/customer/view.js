import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import {   CardBody, CardSubtitle, CardText, CardTitle, Nav } from "react-bootstrap";
import CustomerDashboard from "./components/dashboard";

const AllFlights = () => {
    const [param]=useSearchParams();
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    // Fetch all flights on component mount
    axios.get('http://localhost:8081/flight/all'+param.get('fid'))
      .then(response => setFlights(response.data))
      .catch(error => console.error('Error in Fetching Flights:', error));
  }, []);

  
    return(
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
          
          </div>
          <div className="col-md-9">
            <div className="row">
              {flights.map((f, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <Card
                    style={{
                      width: "18rem",
                      height: "12rem",
                    }}
                  >
                    {/* <img alt="Sample" src="https://picsum.photos/300/200" /> */}
                    <CardBody>
                      <CardTitle tag="h5">{f.name}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Price: INR. {f.economyClassPrice}
                      </CardSubtitle>
                      <CardText>{f.firstClassPrice}</CardText>
                      <Button>Book</Button>
                    </CardBody>
                  </Card>
                  <Nav.Link> </Nav.Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}

export default AllFlights;
