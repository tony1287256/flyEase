import React, { useState } from 'react';
import axios from 'axios';

const AirlineHelp = () => {
  const [helpRequests, setHelpRequests] = useState([]);
  const [newHelpRequest, setNewHelpRequest] = useState({ category: '', description: '' });

  const handleAddHelpRequest = () => {
    setHelpRequests((prevRequests) => [...prevRequests, newHelpRequest]);
    setNewHelpRequest({ category: '', description: '' });
  };

  const handleRemoveHelpRequest = (index) => {
    setHelpRequests((prevRequests) => prevRequests.filter((_, i) => i !== index));
  };

  const handleSubmitHelpRequests = async () => {
    try {
      const response = await axios.post('http://localhost:8081/airline/help', helpRequests);
      console.log('Help requests submitted successfully:', response.data);
      // Handle success as needed
    } catch (error) {
      console.error('Error submitting help requests:', error);
      // Handle error as needed
    }
  };

  return (
    <div>
      <h3>Airline Help</h3>
      <div>
        <label>Category:</label>
        <input
          type="text"
          value={newHelpRequest.category}
          onChange={(e) => setNewHelpRequest({ ...newHelpRequest, category: e.target.value })}
        />
        <label>Description:</label>
        <input
          type="text"
          value={newHelpRequest.description}
          onChange={(e) => setNewHelpRequest({ ...newHelpRequest, description: e.target.value })}
        />
        <button onClick={handleAddHelpRequest}>Add Help Request</button>
      </div>
      <ul>
        {helpRequests.map((helpRequest, index) => (
          <li key={index}>
            {helpRequest.category} - {helpRequest.description}
            <button onClick={() => handleRemoveHelpRequest(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmitHelpRequests}>Submit Help Requests</button>
    </div>
  );
};

export default AirlineHelp;
