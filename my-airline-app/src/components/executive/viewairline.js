// GetAllAirlines.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ENavbarComponent from './enavbar';
import './GetAllAirlines.css'; // Import the CSS file
import { Pagination, Button, Alert } from 'react-bootstrap';

const ITEMS_PER_PAGE = 5; // Set the number of items per page

const GetAllAirlines = () => {
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteMessage, setDeleteMessage] = useState(null);

  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const response = await axios.get('http://localhost:8081/airline/getall');
        setAirlines(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching airlines:', error);
        setLoading(false);
      }
    };

    fetchAirlines();
  }, []); // Empty dependency array to run the effect only once on mount

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/airline/delete/${id}`);
      // Remove the deleted airline from the state
      setAirlines((prevAirlines) => prevAirlines.filter((airline) => airline.id !== id));
      setDeleteMessage('Airline deleted successfully');
    } catch (error) {
      console.error('Error deleting airline:', error);
      setDeleteMessage('Error deleting airline. Please try again.');
    }
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = airlines.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setDeleteMessage(null); // Clear delete message when paginating
  };

  return (
    <div>
      <ENavbarComponent />
      <div className="container mt-4 list-group-container-centered shadow">
        <h2 className="text-center mb-4">All Airlines</h2>
        {deleteMessage && <Alert variant="success">{deleteMessage}</Alert>}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <ul className="list-group">
              {currentItems.map((airline) => (
                <li key={airline.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="airline-details">
                    <strong>{airline.name}</strong> - {airline.code}
                  </div>
                  <Button variant="danger" className="delete-button" onClick={() => handleDelete(airline.id)}>
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
            <div className="pagination-container">
              <Pagination className="justify-content-center">
                {[...Array(Math.ceil(airlines.length / ITEMS_PER_PAGE))].map((_, index) => (
                  <Pagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GetAllAirlines;
