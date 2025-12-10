const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/complaint', require('./routes/complaints')); // Updated route
app.use('/api/complaints', require('./routes/complaints')); // Keep for backward compatibility
app.use('/api/feed', require('./routes/feed'));
app.use('/api/docs', require('./routes/documents'));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/studentapp')
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  console.log('\n⚠️  MongoDB is not running. Please:');
  console.log('   1. Start MongoDB: sudo systemctl start mongod (Linux) or mongod (manual)');
  console.log('   2. Or use MongoDB Atlas and update MONGODB_URI in .env');
  console.log('   3. Or install MongoDB: https://www.mongodb.com/try/download/community\n');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

