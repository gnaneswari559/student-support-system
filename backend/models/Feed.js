const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Circular', 'Notice', 'Announcement'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  targetAudience: {
    type: String,
    enum: ['All', 'Students', 'Faculty', 'Admin'],
    default: 'All'
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Feed', feedSchema);

