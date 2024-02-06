// FeedbackPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const FeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetchFeedbackList();
  }, []);

  const fetchFeedbackList = async () => {
    try {
      const response = await axios.get("http://localhost:8081/feedback/getall");
      setFeedbackList(response.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  return (
    <div>
      <h2>Feedback List</h2>
      <ul>
        {feedbackList.map((feedback) => (
          <li key={feedback.id}>
            <strong>Rating:</strong> {feedback.rating}, <strong>Text:</strong> {feedback.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackPage;
