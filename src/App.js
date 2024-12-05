import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';

function App() {
  // State to store the available tickets
  const [availableTickets, setAvailableTickets] = useState(null);

  // Function to fetch the ticket count from the backend
  const getTicketCount = async () => {
    try {
      console.log('Fetching ticket count...'); // Add this to see if the request is fired
      const response = await axios.get('http://localhost:8080/api/ticket');
      console.log('Response Data:', response.data); // Check the response here
      setAvailableTickets(response.data); // Update state with the fetched ticket count
    } catch (error) {
      console.error('Error fetching ticket count:', error);
    }
  };

  // UseEffect to fetch ticket count when the component mounts
  useEffect(() => {
    console.log('Fetching ticket count...');
    getTicketCount();
  }, []);  // This will run once when the component mounts
  

  // Beginner-friendly if-else for ticket status
  let ticketStatus;
  if (availableTickets === null) {
    ticketStatus = <p>Loading...</p>; // Show loading message if data is being fetched
  } else {
    ticketStatus = <p>Available tickets: {availableTickets}</p>; // Show available tickets once fetched
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Real-Time Ticketing System</h1>
      </div>
      
      <div className="main-content">
        {/* Ticket Pool Status Section */}
        <div className="ticket-status">
          <h2>Ticket Pool Status</h2>
          {availableTickets === null ? (
            <p>Loading...</p> // Show loading message if data is being fetched
          ) : (
            <p>Available tickets: {availableTickets}</p> // Show available tickets once fetched
          )}
        </div>

        {/* Control Panel Section */}
        <div className="simulation">
          <h2>Simulation</h2>
          <button id="start-button">Start</button>
          <button id="stop-button">Stop</button>
          <button id="reset-button">Reset</button>
        </div>

        {/* Configuration Settings Section */}
        <div className="configuration">
          <h2>Configuration Settings</h2>
          <form>
            <label>
              Total Tickets:{' '}
              <input type="number" id="total-tickets" />
            </label>
            <label>
              Ticket Release Rate:{' '}
              <input type="number" id="release-rate" />
            </label>
            <label>
              Customer Retrieval Rate:{' '}
              <input type="number" id="retrieval-rate" />
            </label>
            <button type="submit">Save Settings</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
  