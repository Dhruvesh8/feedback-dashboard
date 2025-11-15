const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database setup
const dbPath = path.join(__dirname, 'feedback.db');
const db = new sqlite3.Database(dbPath);

// Initialize database
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS feedbacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    rating INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Routes
// POST /api/feedback - Add feedback
app.post('/api/feedback', (req, res) => {
  const { name, email, message, rating } = req.body;
  
  // Validation
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }
  
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  const stmt = db.prepare('INSERT INTO feedbacks (name, email, message, rating) VALUES (?, ?, ?, ?)');
  stmt.run([name, email || '', message, rating], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ 
      id: this.lastID, 
      message: 'Feedback added successfully' 
    });
  });
  stmt.finalize();
});

// GET /api/feedback - Fetch all feedback
app.get('/api/feedback', (req, res) => {
  db.all('SELECT * FROM feedbacks ORDER BY createdAt DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// GET /api/stats - Return analytics data
app.get('/api/stats', (req, res) => {
  db.all('SELECT COUNT(*) as total, AVG(rating) as avgRating, SUM(CASE WHEN rating >= 4 THEN 1 ELSE 0 END) as positive, SUM(CASE WHEN rating < 3 THEN 1 ELSE 0 END) as negative FROM feedbacks', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    const stats = rows[0];
    res.json({
      total: stats.total,
      avgRating: parseFloat(stats.avgRating?.toFixed(2)) || 0,
      positive: stats.positive,
      negative: stats.negative
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});