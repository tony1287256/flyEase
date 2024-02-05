import React, { useState, useEffect } from "react";
import axios from "axios";

const SeatAvailability = ({ fid }) => {
  const [availableSeats, setAvailableSeats] = useState([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/getall/${fid}`);
        console.log("Complete API Response:", response); // Log the complete API response
        const seatData = response.data;

        if (Array.isArray(seatData)) {
          console.log("Original seat data:", seatData); // Log the original seat data
          
          // Remove duplicate seat numbers
          const uniqueSeatData = Array.from(new Set(seatData));
          console.log("Unique seat data:", uniqueSeatData); // Log the unique seat data

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

  return (
    <div style={{ marginBottom: "50px" }}>
      <h4>Seat Availability</h4>
      <p>Available Seats: {availableSeats.length}</p>
      <div>
        <p>Visible Seat Status:</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {availableSeats.map((seatNumber, index) => (
            <button
              key={`${seatNumber}-${index}`} // Ensure uniqueness by adding an index
              style={{
                width: "calc(50% - 80px)", // Adjusted width for two columns with gap
                height: "50px", // Adjusted height for a box shape
                margin: "0 0 10px 0",
                backgroundColor: 'green', // Modify the colors as needed
                color: "#fff",
                borderRadius: "5px", // Adjusted border radius for a rounded corner
                cursor: 'pointer',
              }}
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
