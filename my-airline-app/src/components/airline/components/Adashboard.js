import React, { useState, useEffect } from 'react';
import AirlineNavbar from './anavabar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AirlineDashboard = () => {
  const [flights, setFlights] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalFlights, setTotalFlights] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalPassengers, setTotalPassengers] = useState(0);

  const location = useLocation();
  const userId = location.state?.userId || localStorage.getItem('id');
  const incrementedUserId = userId ? parseInt(userId) + 1 : null;

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const response = await axios.get(`http://localhost:8081/flight/${formattedDate}`);
        const data = await response.data;
        setFlights(data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    const fetchStatistics = async () => {
      try {
        const flightsResponse = await axios.get(`http://localhost:8081/airline/statistics/flights/${incrementedUserId}`);
        setTotalFlights(flightsResponse.data);

        const incomeResponse = await axios.get(`http://localhost:8081/airline/statistics/income/${incrementedUserId}`);
        setTotalIncome(incomeResponse.data);

        const passengersResponse = await axios.get(`http://localhost:8081/airline/statistics/passengers/${incrementedUserId}`);
        setTotalPassengers(passengersResponse.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchFlights();
    fetchStatistics();

    console.log('Current userId:', userId);

  }, [selectedDate, userId]);

  const handleDeleteFlight = async (fid) => {
    try {
      await axios.delete(`http://localhost:8081/flight/delete/${fid}`);
      setFlights((prevFlights) => prevFlights.filter((flight) => flight.id !== fid));
    } catch (error) {
      console.error('Error deleting flight:', error);
    }
  };

  return (
    <div>
      <AirlineNavbar />
      <div className="container mt-5">
        <h2 className="mb-4">Airline Dashboard</h2>

        {/* Display statistics */}
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Total Flights</h5>
                <p className="card-text">{totalFlights}</p>
                <Link to="/airline/components/allflights" className="btn btn-sm btn-primary">
                  Details
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Total Income</h5>
                <p className="card-text">₹{totalIncome}</p>
                <button className="btn btn-sm btn-primary">Details</button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Total Passengers</h5>
                <p className="card-text">{totalPassengers}</p>
                <button className="btn btn-sm btn-primary">Details</button>
              </div>
            </div>
          </div>
        </div>

        {/* Date Picker */}
        <div className="mb-3">
          <label className="mr-2">Select Date:</label>
          <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
        </div>

        {/* View Flights */}
        <div className="card">
          <div className="card-header" id="viewFlightsHeading">
            <h2 className="mb-0">
              <button
                className="btn btn-link"
                type="button"
                data-toggle="collapse"
                data-target="#viewFlightsCollapse"
                aria-expanded="true"
                aria-controls="viewFlightsCollapse"
              >
                View Flights
              </button>
            </h2>
          </div>

          <div
            id="viewFlightsCollapse"
            className="collapse show"
            aria-labelledby="viewFlightsHeading"
            data-parent="#dashboardAccordion"
          >
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Code</th>
                    <th>Departure Time</th>
                    <th>Departure Date</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {flights.map((flight) => (
                    <tr key={flight.id}>
                      <td>{flight.id}</td>
                      <td>{flight.code}</td>
                      <td>{flight.departureTime}</td>
                      <td>{flight.departureDate}</td>
                      <td>{flight.route.departureCity}</td>
                      <td>{flight.route.arrivalCity}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteFlight(flight.id)}
                        >
                          Delete
                        </button>
                        <Link to={{ pathname: '/updateFlights', state: { flightId: flight.id } }} className="btn btn-primary">
                          Update
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirlineDashboard;
