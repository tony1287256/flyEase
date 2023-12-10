// Import necessary dependencies
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';  // Assuming you use axios for API requests

const DeleteAirline = ({ airlineId, onDelete }) => {
  // State for managing modal visibility
  const [showModal, setShowModal] = useState(false);

  // Function to handle delete action
  const handleDelete = async () => {
    try {
      // Make API call to delete the airline
      await axios.delete(`http://localhost:8081/executive/deleteairline/${airlineId}`);

      // Close the modal
      setShowModal(false);

      // Trigger the onDelete callback passed from the parent component
      onDelete();
    } catch (error) {
      console.error('Error deleting airline:', error);
    }
  };

  return (
    <>
      {/* Button to trigger the modal */}
      <Button variant="danger" onClick={() => setShowModal(true)}>
        Delete Airline
      </Button>

      {/* Modal for confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this airline?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteAirline;
