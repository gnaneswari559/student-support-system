const express = require('express');
const Document = require('../models/Document');
const auth = require('../middleware/auth');
const router = express.Router();

// POST /api/docs/upload - Upload document (Admin only - add admin check in production)
router.post('/upload', auth, async (req, res) => {
  try {
    const { title, content, category, tags, metadata } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const document = new Document({
      title,
      content,
      category: category || 'General',
      tags: tags || [],
      uploadedBy: req.user._id,
      metadata: metadata || {}
    });
    
    await document.save();
    
    res.status(201).json({
      message: 'Document uploaded successfully',
      document: {
        id: document._id,
        title: document.title,
        category: document.category,
        tags: document.tags
      }
    });
  } catch (error) {
    console.error('Upload document error:', error);
    res.status(500).json({ error: 'Server error while uploading document' });
  }
});

// GET /api/docs/search - Search documents (RAG)
router.get('/search', auth, async (req, res) => {
  try {
    const { query, category, limit = 10 } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const searchQuery = {};
    
    // Text search
    if (query) {
      searchQuery.$text = { $search: query };
    }
    
    // Category filter
    if (category && ['Academic', 'Administrative', 'Policy', 'General'].includes(category)) {
      searchQuery.category = category;
    }
    
    // Execute search
    let documents;
    if (searchQuery.$text) {
      documents = await Document.find(searchQuery, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } })
        .limit(parseInt(limit))
        .select('title content category tags metadata');
    } else {
      // Fallback to keyword matching
      const keywords = query.toLowerCase().split(' ');
      const regexPattern = keywords.map(k => new RegExp(k, 'i'));
      
      documents = await Document.find({
        $or: [
          { title: { $in: regexPattern } },
          { content: { $in: regexPattern } },
          { tags: { $in: keywords } },
          ...(category ? [{ category }] : [])
        ]
      })
      .limit(parseInt(limit))
      .select('title content category tags metadata');
    }
    
    res.json({
      query,
      results: documents,
      count: documents.length
    });
  } catch (error) {
    console.error('Search documents error:', error);
    res.status(500).json({ error: 'Server error while searching documents' });
  }
});

// GET /api/docs - Get all documents (for admin)
router.get('/', auth, async (req, res) => {
  try {
    const { category } = req.query;
    
    const query = category ? { category } : {};
    
    const documents = await Document.find(query)
      .sort({ createdAt: -1 })
      .limit(100)
      .select('title category tags createdAt');
    
    res.json(documents);
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({ error: 'Server error while fetching documents' });
  }
});

module.exports = router;

