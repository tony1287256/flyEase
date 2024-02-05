// SearchResultsPage.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SearchResultsPage = ({ searchResults }) => {
  const navigate = useNavigate();

  const handleBookNow = (flightId) => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // If logged in, navigate to booking page with flightId; otherwise, navigate to login
    if (isLoggedIn) {
      navigate(`/customer/components/booking/${flightId}`);
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        {searchResults.length > 0 ? (
          searchResults.map((flight, index) => (
            <div key={index} className="col-md-4 mb-3">
              {/* Card Component for Flight Details */}
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Flight Details</h5>
                  <p className="card-text">
                    <strong>Flight ID:</strong> {flight.id}<br />
                    <strong>Source City:</strong> {flight.route.arrivalCity}<br />
                    <strong>Destination City:</strong> {flight.route.departureCity}<br />
                    <strong>Available Seats:</strong> {flight.availableSeats}<br />
                    <strong>Business Class Price:</strong> {flight.businessClassPrice}<br />
                    <strong>Economy Class Price:</strong> {flight.economyClassPrice}<br />
                    <strong>First Class Price:</strong> {flight.firstClassPrice}<br />
                  </p>
                  {/* "Book Now" button */}
                  <button className="btn btn-danger" onClick={() => handleBookNow(flight.id)}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            {/* Bootstrap alert for No results found */}
            <div className="alert alert-warning" role="alert">
              No results found
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;