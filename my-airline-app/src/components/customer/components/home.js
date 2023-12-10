import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import NavbarComponent from "./navbar";
import SearchResultsPage from "./searchresult";
import Select from "react-select";

function HomeComponent() {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [routeData, setRouteData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await searchFlights();
    } catch (error) {
      console.error("Error in Fetching Flights:", error);
      setErrorMsg(
        "Error in Fetching Flights. Please check your input and try again."
      );
      setLoading(false);
    }
  };

  const searchFlights = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const formattedDate = new Date(date).toISOString().split('T')[0];
      const response = await axios.get(
        `http://localhost:8081/flight/${source.value}/${destination.value}/${formattedDate}`
      );

      console.log('Response Data:', response.data);
      setSearchResults(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch source and destination options from the database
    axios.get("http://localhost:8081/route/getall")
      .then(response => {
        setRouteData(
          response.data.map(route => ({
            value: route.arrivalCity,
            label: route.departureCity,
          }))
        );
      })
      .catch(error => {
        console.error("Error fetching route data:", error);
      });
  }, []);

  const filterOptions = (option, inputValue) => {
    if (typeof option === 'string') {
      return option.toLowerCase().includes(inputValue.toLowerCase());
    }

    return option.label.toLowerCase().includes(inputValue.toLowerCase());
  };

  return (
    <div>
      <NavbarComponent />
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <Form onSubmit={handleSubmit} className="p-4 border rounded shadow">
              <h2 className="mb-4 text-center">Search Flights</h2>

              <Form.Group controlId="arrival">
                <Form.Label>Source</Form.Label>
                <Select
                  options={routeData}
                  value={source}
                  onChange={(selectedOption) => setSource(selectedOption)}
                  isSearchable
                  filterOption={filterOptions}
                />
              </Form.Group>

              <Form.Group controlId="departure">
                <Form.Label>Destination</Form.Label>
                <Select
                  options={routeData}
                  value={destination}
                  onChange={(selectedOption) => setDestination(selectedOption)}
                  isSearchable
                  filterOption={filterOptions}
                />
              </Form.Group>

              <Form.Group controlId="date">
                <Form.Label>Travel Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="danger"
                type="submit"
                className="w-100 mt-3"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search Flights"}
              </Button>

              {errorMsg && <p className="text-danger mt-3">{errorMsg}</p>}
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Render the SearchResultsPage component with searchResults as a prop */}
      <SearchResultsPage searchResults={searchResults} />
    </div>
  );
}

export default HomeComponent;
