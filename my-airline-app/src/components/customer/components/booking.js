// BookingPage.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarComponent from "./navbar";
import SeatAvailability from "../seatavalibility";
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingPage = () => {
  const { fid } = useParams();
  const navigate = useNavigate();

  const [passengers, setPassengers] = useState([
    { name: "", age: 0, gender: "", seatNumber: "" },
  ]);

  const [availableSeats, setAvailableSeats] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const fetchAvailableSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/getavaliable/${fid}`);
        console.log("API Response for Available Seats:", response.data);

        if (Array.isArray(response.data)) {
          const seatNumbers = response.data.map(seat => seat.toString());
          setAvailableSeats(seatNumbers);
        } else {
          console.error("Invalid seat data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching available seats:", error);
      }
    };

    fetchAvailableSeats();
  }, [fid]);

  const handleInputChange = (index, key, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][key] = value;
    setPassengers(updatedPassengers);
  };

  const handleAddPassenger = () => {
    setPassengers([...passengers, { name: "", age: 0, gender: "", seatNumber: "" }]);
  };

  const handleRemovePassenger = (index) => {
    const updatedPassengers = [...passengers];
    updatedPassengers.splice(index, 1);
    setPassengers(updatedPassengers);
  };

  const handleBookNow = async () => {
    try {
      // Add +1 to the user id
      const userId = parseInt(localStorage.getItem("id"), 10) + 1;

      const response = await axios.post(`http://localhost:8081/customerflight/book/${userId}/${fid}`, passengers);
      console.log("Response Data", response.data);

      // Extract additional data from the response
      const { bookedTickets, totalPrice } = response.data;

      // Set the booking details state
      setBookingDetails({ bookedTickets, totalPrice });

      // Open confirmation modal
      setShowConfirmationModal(true);
    } catch (error) {
      console.error("Booking Error:", error);
    }
  };

  const handleConfirmationModalClose = () => {
    // Close confirmation modal
    setShowConfirmationModal(false);

    // Navigate to payment gateway or any other page
    navigate("/customer/components/promo");
  };

  return (
    <div>
      <NavbarComponent />
      <div className="container my-4">
        <div className="row">
          <div className="col-md-8">
            <h2 className="mb-4 text-center">Booking Page</h2>
            {passengers.map((passenger, index) => (
              <div key={index} className="mb-3">
                <h4>Passenger {index + 1}</h4>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={passenger.name}
                      onChange={(e) => handleInputChange(index, "name", e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Age</label>
                    <input
                      type="number"
                      className="form-control"
                      value={passenger.age}
                      onChange={(e) => handleInputChange(index, "age", e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Gender</label>
                    <select
                      className="form-control"
                      value={passenger.gender}
                      onChange={(e) => handleInputChange(index, "gender", e.target.value)}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label>Seat Number</label>
                    <select
                      className="form-control"
                      value={passenger.seatNumber}
                      onChange={(e) => handleInputChange(index, "seatNumber", e.target.value)}
                    >
                      <option value="" disabled>Select Seat</option>
                      {availableSeats.map((seat, seatIndex) => (
                        <option key={seatIndex} value={seat}>
                          {seat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button type="button" className="btn btn-danger" onClick={() => handleRemovePassenger(index)}>
                  Remove Passenger
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-success" onClick={handleAddPassenger}>
              Add Passenger
            </button>
            <div className="text-center mt-3">
              <button type="button" className="btn btn-primary" onClick={handleBookNow}>
                Book Now
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <SeatAvailability fid={fid} />
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Booking Confirmed!</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleConfirmationModalClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <p>Your booking has been confirmed.</p>
                {bookingDetails && (
                  <div>
                    <h4 className="mb-3">Booking Details:</h4>
                    <p>
                      <strong>Total Price:</strong> {bookingDetails.totalPrice || 'N/A'}<br />
                      {bookingDetails.bookedTickets && bookingDetails.bookedTickets.length > 0 && (
                        <div>
                          <strong>Passenger Details:</strong><br />
                          {bookingDetails.bookedTickets.map((passenger, passengerIndex) => (
                            <div key={passengerIndex} className="border p-3 mb-3">
                              <p>
                                <strong>Name:</strong> {passenger.name || 'N/A'}<br />
                                <strong>Age:</strong> {passenger.age || 'N/A'}<br />
                                <strong>Seat Number:</strong> {passenger.seat && passenger.seat.seatNo || 'N/A'}<br />
                              </p>
                            </div>
                          ))}
                          {/* Display common flight details once */}
                          {bookingDetails.bookedTickets.length > 0 && (
                            <div>
                              <strong>Flight Details:</strong><br />
                              <p>
                                <strong>Airline:</strong> {bookingDetails.bookedTickets[0].flight.airline.name || 'N/A'}<br />
                                <strong>Flight Code:</strong> {bookingDetails.bookedTickets[0].flight.code || 'N/A'}<br />
                                <strong>Departure Date:</strong> {bookingDetails.bookedTickets[0].flight.departureDate || 'N/A'}<br />
                                <strong>Departure Time:</strong> {bookingDetails.bookedTickets[0].flight.departureTime || 'N/A'}<br />
                                <strong>Departure City:</strong> {bookingDetails.bookedTickets[0].flight.route.departureCity || 'N/A'}<br />
                                <strong>Arrival City:</strong> {bookingDetails.bookedTickets[0].flight.route.arrivalCity || 'N/A'}<br />
                                {/* Add other relevant flight details */}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </p>
                  </div>
                )}
                <p className="mt-3">Proceed to the payment gateway to complete the transaction.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleConfirmationModalClose}>Proceed to Payment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
