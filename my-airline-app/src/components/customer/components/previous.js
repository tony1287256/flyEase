import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarComponent from './navbar';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

const ITEMS_PER_PAGE = 5;

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbackModalShow, setFeedbackModalShow] = useState(false);
  const [feedbackData, setFeedbackData] = useState({ rating: 0, text: '' });
  const [currentBooking, setCurrentBooking] = useState(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    const userId = parseInt(localStorage.getItem("id"), 10) + 1;
    const fetchCustomerBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/customerflight/bookings/${userId}`);

        if (response.data && Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          console.error('Invalid response format:', response);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer bookings:', error);
        setLoading(false);
      }
    };

    fetchCustomerBookings();
  }, []);

  const lastIndex = currentPage * ITEMS_PER_PAGE;
  const firstIndex = lastIndex - ITEMS_PER_PAGE;
  const currentBookings = bookings.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenFeedbackModal = (booking) => {
    setCurrentBooking(booking);
    setFeedbackSent(false);
    setFeedbackData({ rating: 0, text: '' });
    setFeedbackModalShow(true);
  };

  const handleCloseFeedbackModal = () => {
    setCurrentBooking(null);
    setFeedbackData({ rating: 0, text: '' });
    setFeedbackModalShow(false);
  };

  const handleFeedbackSubmit = async () => {
    const customerId = getCurrentCustomerId();
    const flightId = getCurrentFlightId();

    try {
      const response = await axios.post(`http://localhost:8081/feedback/${customerId}/${flightId}`, feedbackData);
      console.log('Feedback submitted successfully:', response.data);
      setFeedbackSent(true);
      // Add logic to handle success (if needed)
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Add logic to handle error (if needed)
    }
  };

  const getCurrentCustomerId = () => {
    return parseInt(localStorage.getItem("id"), 10) + 1;
  };

  const getCurrentFlightId = () => {
    return currentBooking?.flight?.id || 0;
  };

  return (
    <div style={styles.container}>
      <NavbarComponent />
      <div style={styles.content}>
        <h2 style={styles.heading}>Customer Bookings</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <ul className="list-group">
              {currentBookings.map((booking) => (
                <li key={booking.id} className="list-group-item mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-0">{booking.name}</h5>
                      <p className="mb-0">Date: {booking.date}</p>
                      <p className="mb-0">Price: {booking.price}</p>
                      <p className="mb-0">Seat No: {booking.seat.seatNo}</p>
                      <p className="mb-0">Flight ID: {booking.flight.id}</p>
                      <p className="mb-0">Airline ID: {booking.flight.airline.id}</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => handleOpenFeedbackModal(booking)}>
                      Give Feedback
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-center mt-3">
              <Pagination>
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </div>
        )}
      </div>
      {/* Feedback Modal */}
      <div
        className={`modal fade ${feedbackModalShow ? 'show' : ''}`}
        id="feedbackModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="feedbackModalLabel"
        aria-hidden="true"
        style={{ display: feedbackModalShow ? 'block' : 'none' }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="feedbackModalLabel">Give Feedback</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseFeedbackModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <label>Rating:</label>
              <input
                type="number"
                className="form-control"
                value={feedbackData.rating}
                onChange={(e) => setFeedbackData({ ...feedbackData, rating: e.target.value })}
              />
              <label className="mt-2">Text:</label>
              <textarea
                className="form-control"
                value={feedbackData.text}
                onChange={(e) => setFeedbackData({ ...feedbackData, text: e.target.value })}
              />
            </div>
            <div className="modal-footer">
              {feedbackSent && <div className="text-success">Feedback sent successfully!</div>}
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleCloseFeedbackModal}>
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleFeedbackSubmit}>
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
};

export default CustomerBookings;
