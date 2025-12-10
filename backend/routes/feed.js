const express = require('express');
const Feed = require('../models/Feed');
const auth = require('../middleware/auth');
const router = express.Router();

// GET /api/feed - Get all feeds (circulars, notices, announcements)
router.get('/', auth, async (req, res) => {
  try {
    const { type, priority } = req.query;
    
    const query = {};
    
    // Filter by type if provided
    if (type && ['Circular', 'Notice', 'Announcement'].includes(type)) {
      query.type = type;
    }
    
    // Filter by priority if provided
    if (priority && ['Low', 'Medium', 'High', 'Urgent'].includes(priority)) {
      query.priority = priority;
    }
    
    // Only show non-expired feeds
    query.$or = [
      { expiresAt: null },
      { expiresAt: { $gt: new Date() } }
    ];
    
    const feeds = await Feed.find(query)
      .sort({ priority: -1, publishedAt: -1 })
      .limit(50);
    
    res.json(feeds);
  } catch (error) {
    console.error('Get feed error:', error);
    res.status(500).json({ error: 'Server error while fetching feeds' });
  }
});

// POST /api/feed - Create feed (Admin only - add admin check in production)
router.post('/', auth, async (req, res) => {
  try {
    const { type, title, content, priority, targetAudience, expiresAt } = req.body;
    
    if (!type || !title || !content) {
      return res.status(400).json({ error: 'Type, title, and content are required' });
    }
    
    if (!['Circular', 'Notice', 'Announcement'].includes(type)) {
      return res.status(400).json({ error: 'Invalid feed type' });
    }
    
    const feed = new Feed({
      type,
      title,
      content,
      priority: priority || 'Medium',
      targetAudience: targetAudience || 'All',
      expiresAt: expiresAt ? new Date(expiresAt) : null
    });
    
    await feed.save();
    
    res.status(201).json({
      message: 'Feed created successfully',
      feed
    });
  } catch (error) {
    console.error('Create feed error:', error);
    res.status(500).json({ error: 'Server error while creating feed' });
  }
});

module.exports = router;

