const http = require('http');
const express = require('express');
const basicAuth = require('express-basic-auth');

// Import the app from server.js
const app = require('.');

// Create a new server instance
const PORT = 8000;
const server = app.listen(PORT, () => {
  console.time('Test Execution');
  console.timeLog('Test Execution', 'Server running on port', PORT);

  // Make a POST request to the /biotricity/api/studies/ endpoint
  const postData = JSON.stringify({});

  const options = {
    hostname: 'localhost',
    port: PORT,
    path: '/biotricity/api/studies/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      Authorization: `Basic ${Buffer.from('bty_user:Testing123!').toString('base64')}`,
    },
  };

  const req = http.request(options, res => {
    let data = '';

    res.on('data', chunk => {
      data += chunk;
    });

    res.on('end', () => {
      console.timeLog('Test Execution', 'Response status code:', res.statusCode);
      console.timeLog('Test Execution', 'Response headers:', res.headers);
      console.timeLog('Test Execution', 'Response body:', data);

      // Verify successful response
      if (res.statusCode === 200) {
        try {
          const jsonData = JSON.parse(data);
          if (jsonData.success === true) {
            console.timeLog('Test Execution', 'Test passed: Server is working correctly with basic authentication');
          } else {
            console.timeLog('Test Execution', 'Test failed: Unexpected response structure');
          }
        } catch (error) {
          console.timeLog('Test Execution', 'Test failed: Could not parse JSON response');
        }
      } else {
        console.timeLog('Test Execution', 'Test failed: Unexpected status code');
      }

      console.timeEnd('Test Execution');

      // Close the server after the test
      server.close(() => {
        console.timeLog('Test Execution', 'Server closed');
      });
    });
  });

  req.on('error', error => {
    console.timeLog('Test Execution', 'Request error:', error);

    console.timeEnd('Test Execution');

    // Close the server after the test
    server.close(() => {
      console.timeLog('Test Execution', 'Server closed');
    });
  });

  // Write data to request body
  req.write(postData);
  req.end();
});
