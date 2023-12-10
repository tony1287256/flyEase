// ConfirmationPage.js

import React from "react";
import { useLocation } from "react-router-dom";

const ConfirmationPage = () => {
  const location = useLocation();
  const bookingDetails = location.state;

  if (!bookingDetails || !bookingDetails.customer) {
    return <div>No booking details found</div>;
  }

  const { customer, date, flight, price, seat, totalPrice } = bookingDetails;

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2 className="mb-4 text-center">Booking Confirmation</h2>
          <div>
            <h4>Customer Details:</h4>
            <p>
              <strong>Name:</strong> {customer.name}<br />
              <strong>Age:</strong> {customer.age || 'N/A'}<br />
              <strong>Gender:</strong> {customer.gender || 'N/A'}<br />
              <strong>Email:</strong> {customer.email || 'N/A'}<br />
            </p>
          </div>
          <div>
            <h4>Flight Details:</h4>
            <p>
              <strong>Flight Code:</strong> {flight.code || 'N/A'}<br />
              <strong>Departure Date:</strong> {flight.departureDate || 'N/A'}<br />
              <strong>Departure Time:</strong> {flight.departureTime || 'N/A'}<br />
            </p>
          </div>
          <div>
            <h4>Seat Details:</h4>
            <p>
              <strong>Seat Number:</strong> {seat.seatNo || 'N/A'}<br />
              <strong>Seat Class:</strong> {seat.seatclass || 'N/A'}<br />
              <strong>Seat Status:</strong> {seat.status || 'N/A'}<br />
            </p>
          </div>
          <div>
            <h4>Booking Details:</h4>
            <p>
              <strong>Booking Date:</strong> {date || 'N/A'}<br />
              <strong>Booking Price:</strong> {price || 'N/A'}<br />
              <strong>Total Price:</strong> {totalPrice || 'N/A'}<br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
