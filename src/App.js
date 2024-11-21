import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
    setError(null);  // Clear previous error if any
  };

  const handleSubmit = () => {
    try {
      const parsedData = JSON.parse(jsonInput);  // Try parsing the input

      // If successful, send the parsed data to the backend
      fetch('http://localhost:5001/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedData)
      })
        .then(response => response.json())
        .then(data => setResponse(data))  // Handle response from the backend
        .catch(error => console.error('Error:', error));

    } catch (err) {
      setError('Invalid JSON format.');  // Show error message if invalid JSON
    }
  };

  return (
    <div>
      <h1>Submit JSON</h1>
      <textarea
        rows="10"
        cols="50"
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='Enter JSON data here...'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Show error if any */}

      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
