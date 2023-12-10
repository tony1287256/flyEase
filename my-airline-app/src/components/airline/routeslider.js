// DeleteRouteButton.js
import React from 'react';

const DeleteRouteButton = ({ routeId, onDelete }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this route?');

    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8081/route/delete/${routeId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log('Route deleted successfully!');
          // Optionally, you can perform additional actions after successful deletion
          onDelete(); // Call the onDelete callback to update the route list or perform other actions
        } else {
          console.error('Failed to delete route.');
        }
      } catch (error) {
        console.error('Error deleting route:', error);
      }
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete Route
    </button>
  );
};

export default DeleteRouteButton;
