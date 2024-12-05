import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';

function App() {
  const [availableTickets, setAvailableTickets] = useState(null);

  // Function to fetch ticket count from /api/ticket
  const getTicketCount = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/ticket');
      setAvailableTickets(response.data); // Set the available tickets in state
    } catch (error) {
      console.error('Error fetching ticket count:', error);
    }
  };

  // Call the function to fetch ticket count when the component mounts
  useEffect(() => {
    getTicketCount();
  }, []); // Empty array ensures it runs once when the component mounts // Empty dependency array means it will only run once when the component mounts

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Real-Time Ticketing System</h1>
      </header>
      <main>
        {/* Ticket Pool Status Section */}
        <section className="ticket-status">
          <h2>Ticket Pool Status</h2>
          <div id="ticket-display">
            {/* This will show ticket details */}
            {availableTickets !== null ? (
              <p>Available tickets: {availableTickets}</p>
            ) : (
              <p>Loading...</p> // Show loading message while data is being fetched
            )}
          </div>
        </section>

        {/* Control Panel Section */}
        <section className="Simulation">
          <h2>Simulation</h2>
          <button id="start-button">Start</button>
          <button id="stop-button">Stop</button>
          <button id="reset-button">Reset</button>
        </section>

        {/* Configuration Settings Section */}
        <section className="configuration">
          <h2>Configuration Settings</h2>
          <form>
            <label>
              Total Tickets:{''}
              <input type="number" id="total-tickets"/>
            </label>
            <label>
              Ticket Release Rate:{''}
              <input type="number" id="release-rate"/>
            </label>
            <label>
              Customer Retrieval Rate:{''}
              <input type="number" id="retrieval-rate"/>
            </label>
            <button type="submit">Save Settings</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
