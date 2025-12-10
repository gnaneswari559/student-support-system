const express = require('express');
const Complaint = require('../models/Complaint');
const auth = require('../middleware/auth');
const router = express.Router();

// Generate unique ticket ID
const generateTicketId = async () => {
  const count = await Complaint.countDocuments();
  return `CMP-${1001 + count}`;
};

// POST /api/complaint - Create a new complaint
router.post('/', auth, async (req, res) => {
  try {
    const { title, message } = req.body;

    if (!title || !message) {
      return res.status(400).json({ error: 'Title and message are required' });
    }

    const ticketId = await generateTicketId();

    const complaint = new Complaint({
      userId: req.user._id,
      ticketId,
      title,
      message,
      status: 'Pending'
    });

    await complaint.save();

    res.status(201).json({
      message: 'Complaint created successfully',
      complaint: {
        id: complaint._id,
        ticketId: complaint.ticketId,
        title: complaint.title,
        message: complaint.message,
        status: complaint.status,
        createdAt: complaint.createdAt
      }
    });
  } catch (error) {
    console.error('Create complaint error:', error);
    res.status(500).json({ error: 'Server error while creating complaint' });
  }
});

// GET /api/complaint/:id - Get specific complaint
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const complaint = await Complaint.findById(id);
    
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }
    
    // Check if user owns the complaint (or is admin)
    if (complaint.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json(complaint);
  } catch (error) {
    console.error('Get complaint error:', error);
    res.status(500).json({ error: 'Server error while fetching complaint' });
  }
});

// GET /api/complaint - Get user's complaints
router.get('/', auth, async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    console.error('Get complaints error:', error);
    res.status(500).json({ error: 'Server error while fetching complaints' });
  }
});

// PUT /api/complaint/:id/status - Update complaint status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!status || !['Pending', 'In-Review', 'Resolved'].includes(status)) {
      return res.status(400).json({ error: 'Valid status is required (Pending, In-Review, Resolved)' });
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    complaint.status = status;
    await complaint.save();

    res.json({
      message: 'Status updated successfully',
      complaint
    });
  } catch (error) {
    console.error('Update complaint status error:', error);
    res.status(500).json({ error: 'Server error while updating complaint status' });
  }
});

// PUT /api/complaint/:id/reply - Admin reply to complaint
router.put('/:id/reply', auth, async (req, res) => {
  try {
    const { reply, status } = req.body;
    const { id } = req.params;

    if (!reply) {
      return res.status(400).json({ error: 'Reply message is required' });
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    complaint.adminReply = reply;
    if (status && ['Pending', 'In-Review', 'Resolved'].includes(status)) {
      complaint.status = status;
    } else if (reply) {
      complaint.status = 'In-Review';
    }

    await complaint.save();

    res.json({
      message: 'Reply added successfully',
      complaint
    });
  } catch (error) {
    console.error('Reply to complaint error:', error);
    res.status(500).json({ error: 'Server error while replying to complaint' });
  }
});

module.exports = router;

