import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const SeatAddition = () => {
  const [seatData, setSeatData] = useState([]);
  const [newSeat, setNewSeat] = useState({ seatNo: '', seatClass: '' });
  const [flightId, setFlightId] = useState('');

  const handleAddSeat = () => {
    setSeatData((prevData) => [...prevData, newSeat]);
    setNewSeat({ seatNo: '', seatClass: '' });
  };

  const handleRemoveSeat = (index) => {
    setSeatData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleAddSeats = async () => {
    try {
      const response = await axios.post(`http://localhost:8081/seats/add/${flightId}`, seatData);
      console.log('Seats added successfully:', response.data);
      // Handle success as needed
    } catch (error) {
      console.error('Error adding seats:', error);
      // Handle error as needed
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Seats</h3>
      <div className="mb-3">
        <label htmlFor="flightId" className="form-label">
          Flight ID:
        </label>
        <input
          type="text"
          id="flightId"
          className="form-control"
          value={flightId}
          onChange={(e) => setFlightId(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Seat Number:</label>
        <input
          type="text"
          className="form-control"
          value={newSeat.seatNo}
          onChange={(e) => setNewSeat({ ...newSeat, seatNo: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label>Seat Class:</label>
        <input
          type="text"
          className="form-control"
          value={newSeat.seatClass}
          onChange={(e) => setNewSeat({ ...newSeat, seatClass: e.target.value })}
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={handleAddSeat}>
        Add Seat
      </button>
      <ul className="list-group">
        {seatData.map((seat, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {seat.seatNo} - {seat.seatClass}
            <button className="btn btn-danger" onClick={() => handleRemoveSeat(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button className="btn btn-success mt-3" onClick={handleAddSeats}>
        Add Seats
      </button>
    </div>
  );
};

export default SeatAddition;
