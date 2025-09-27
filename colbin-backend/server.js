// backend/server.js
const express = require('express');
const cors = require('cors');
const { initialize } = require('./src/_helper/db'); // Import the initialize function
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// The core fix: Await database initialization before starting the server.
initialize().then(() => {
  console.log("Database initialized successfully.");

  // Import userRoutes AFTER the database is ready.
  const userRoutes = require('./src/modules/user/user.routes');
  app.use('/api/user', userRoutes);
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});