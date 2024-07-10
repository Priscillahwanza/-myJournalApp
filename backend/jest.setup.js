
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });
// Ensure sequelize picks up environment variables
process.env.NODE_ENV = 'test'; // Set environment to test