const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'feedback.db');
const db = new sqlite3.Database(dbPath);

console.log('=== FEEDBACK DATABASE ===\n');

// Check table structure
db.all("PRAGMA table_info(feedbacks)", (err, rows) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  console.log('Table Structure:');
  console.table(rows);
  console.log('\n');
  
  // Check all feedbacks
  db.all("SELECT * FROM feedbacks ORDER BY createdAt DESC", (err, rows) => {
    if (err) {
      console.error('Error:', err);
      return;
    }
    
    console.log(`Total Feedbacks: ${rows.length}\n`);
    
    if (rows.length > 0) {
      console.log('All Feedbacks:');
      console.table(rows);
      
      // Show stats
      db.get("SELECT COUNT(*) as total, AVG(rating) as avgRating, SUM(CASE WHEN rating >= 4 THEN 1 ELSE 0 END) as positive, SUM(CASE WHEN rating < 3 THEN 1 ELSE 0 END) as negative FROM feedbacks", (err, stats) => {
        if (err) {
          console.error('Error:', err);
          return;
        }
        
        console.log('\nStatistics:');
        console.log(`Total: ${stats.total}`);
        console.log(`Average Rating: ${stats.avgRating?.toFixed(2) || 0}`);
        console.log(`Positive (4+): ${stats.positive}`);
        console.log(`Negative (<3): ${stats.negative}`);
        
        db.close();
      });
    } else {
      console.log('No feedbacks found in database.');
      db.close();
    }
  });
});