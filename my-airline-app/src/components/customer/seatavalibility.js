import React, { useState, useEffect } from "react";
import axios from "axios";

const SeatAvailability = ({ fid }) => {
  const [availableSeats, setAvailableSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/getavaliable/${fid}`);
        const seatData = response.data;

        if (Array.isArray(seatData)) {
          const uniqueSeatData = Array.from(new Set(seatData));
          const seatNumbers = uniqueSeatData.map(seat => seat);
          setAvailableSeats(seatNumbers);
        } else {
          console.error("Invalid seat data format:", seatData);
        }
      } catch (error) {
        console.error("Error fetching seat availability:", error);
      }
    };

    fetchAvailability();
  }, [fid]);

  const handleSeatClick = (seatNumber) => {
    if (!bookedSeats.includes(seatNumber)) {
      setBookedSeats([...bookedSeats, seatNumber]);
    }
  };

  return (
    <div style={{ marginBottom: "50px" }}>
      <h4>Seat Availability</h4>
      <p>Available Seats: {availableSeats.length}</p>
      <div>
        <p>Visible Seat Status:</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {availableSeats.map((seatNumber, index) => (
            <button
              key={`${seatNumber}-${index}`}
              style={{
                width: "calc(50% - 80px)",
                height: "50px",
                margin: "0 0 10px 0",
                backgroundColor: bookedSeats.includes(seatNumber) || availableSeats.indexOf(seatNumber) === -1
                  ? 'red' // Change color for previously booked seats or seats not in the dropdown
                  : 'green',
                color: "#fff",
                borderRadius: "5px",
                cursor: bookedSeats.includes(seatNumber) || availableSeats.indexOf(seatNumber) === -1
                  ? 'not-allowed' // Disable click for previously booked seats or seats not in the dropdown
                  : 'pointer',
              }}
              onClick={() => handleSeatClick(seatNumber)}
            >
              {seatNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatAvailability;
