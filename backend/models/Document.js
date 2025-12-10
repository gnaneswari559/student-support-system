const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Academic', 'Administrative', 'Policy', 'General'],
    default: 'General'
  },
  tags: [{
    type: String
  }],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // For RAG: Store embeddings or reference to vector DB
  embedding: {
    type: [Number],
    default: null
  },
  metadata: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

// Text search index
documentSchema.index({ title: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('Document', documentSchema);

