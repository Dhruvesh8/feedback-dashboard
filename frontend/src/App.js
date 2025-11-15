import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Feedback Dashboard</h1>
      <p>App is working!</p>
      <div style={{ background: '#f5f5f5', padding: '20px', margin: '20px 0' }}>
        <h2>Test Form</h2>
        <form>
          <input type="text" placeholder="Name" style={{ margin: '5px', padding: '10px' }} />
          <br />
          <textarea placeholder="Message" style={{ margin: '5px', padding: '10px' }}></textarea>
          <br />
          <button type="submit" style={{ margin: '5px', padding: '10px' }}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;