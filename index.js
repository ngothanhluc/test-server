const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Basic authentication middleware
const authMiddleware = basicAuth({
  users: {
    bty_user: 'Testing123!',
  },
  challenge: true,
  realm: 'BiTricity API',
});

// POST endpoint at /biotricity/api/studies/
app.post('/biotricity/api/studies/', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Study created successfully',
  });
});

// Handle unauthorized requests
app.use((err, req, res, next) => {
  if (err.status === 401) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid credentials',
    });
  } else {
    next(err);
  }
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

// Start server on port 443
const PORT = 443;
const server = app.listen(PORT, () => {
  // Server started
});

module.exports = app;
