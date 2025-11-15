import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://feedback-dashboard-nvy6.onrender.com';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({ total: 0, avgRating: 0, positive: 0, negative: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5
  });

  useEffect(() => {
    fetchFeedbacks();
    fetchStats();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/feedback`);
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/feedback`, formData);
      setFormData({ name: '', email: '', message: '', rating: 5 });
      fetchFeedbacks();
      fetchStats();
      alert('Feedback submitted successfully!');
    } catch (error) {
      alert('Error submitting feedback: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="App">
      <header>
        <h1>Feedback Dashboard</h1>
      </header>

      <div className="analytics">
        <div className="card">
          <h3>Total Feedbacks</h3>
          <p>{stats.total}</p>
        </div>
        <div className="card">
          <h3>Average Rating</h3>
          <p>{stats.avgRating}</p>
        </div>
        <div className="card">
          <h3>Positive (4+)</h3>
          <p>{stats.positive}</p>
        </div>
        <div className="card">
          <h3>Negative (&lt;3)</h3>
          <p>{stats.negative}</p>
        </div>
      </div>

      <div className="form-section">
        <h2>Submit Feedback</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name *"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Message *"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <select name="rating" value={formData.rating} onChange={handleChange}>
            <option value={1}>1 - Poor</option>
            <option value={2}>2 - Fair</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Very Good</option>
            <option value={5}>5 - Excellent</option>
          </select>
          <button type="submit">Submit Feedback</button>
        </form>
      </div>

      <div className="feedbacks-section">
        <h2>All Feedbacks</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Message</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.name}</td>
                <td>{feedback.email}</td>
                <td>{feedback.rating}</td>
                <td>{feedback.message}</td>
                <td>{new Date(feedback.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;