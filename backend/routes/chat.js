const express = require('express');
const Chat = require('../models/Chat');
const Document = require('../models/Document');
const auth = require('../middleware/auth');
const { findKnowledge, generateAnswer } = require('../utils/knowledgeBase');
const router = express.Router();

// Universal AI System Prompt
const SYSTEM_PROMPT = `You are a highly intelligent AI Chat Assistant.

Your goal is to answer user questions across ALL domains including:
technology, coding, career, education, life advice, science, math, and general knowledge.

Rules you must follow:
1. Give direct, clear, and useful answers.
2. Do NOT hallucinate facts.
3. If unsure, say: "I don't have enough reliable data to answer that accurately."
4. Do not be overly verbose.
5. Prefer practical explanations over theory.
6. Adapt language based on user's clarity (simple if user is beginner, detailed if user is advanced).

Conversation behavior:
- Stay natural and human-like.
- Remember recent context.
- Ask a clarification only if absolutely necessary.

Tone: Confident, sharp, logical, and professional.`;

// RAG: Retrieve relevant documents
const retrieveRelevantDocuments = async (query) => {
  try {
    // Simple text search (in production, use vector embeddings)
    const documents = await Document.find({
      $text: { $search: query }
    })
    .limit(3)
    .select('title content category');

    // Fallback to keyword matching if no text search results
    if (documents.length === 0) {
      const keywords = query.toLowerCase().split(' ');
      const regexPattern = keywords.map(k => new RegExp(k, 'i'));
      
      const fallbackDocs = await Document.find({
        $or: [
          { title: { $in: regexPattern } },
          { content: { $in: regexPattern } },
          { tags: { $in: keywords } }
        ]
      })
      .limit(3)
      .select('title content category');
      
      return fallbackDocs;
    }
    
    return documents;
  } catch (error) {
    console.error('Document retrieval error:', error);
    return [];
  }
};

// Enhanced AI Response Generator with RAG and Knowledge Base
const generateAIResponse = async (message, userId) => {
  const lowerMessage = message.toLowerCase();
  
  // Retrieve relevant documents using RAG
  const relevantDocs = await retrieveRelevantDocuments(message);
  
  // Build context from documents
  let documentContext = '';
  if (relevantDocs.length > 0) {
    documentContext = '\n\n📄 Relevant official documents:\n';
    relevantDocs.forEach((doc, idx) => {
      documentContext += `${idx + 1}. [${doc.category}] ${doc.title}: ${doc.content.substring(0, 200)}...\n`;
    });
    documentContext += '\nNote: The above documents are used as the source of truth.';
  }
  
  // First, try to find answer in knowledge base
  const knowledge = findKnowledge(message);
  if (knowledge) {
    const knowledgeAnswer = generateAnswer(knowledge, message);
    if (knowledgeAnswer) {
      return documentContext 
        ? `${documentContext}\n\n${knowledgeAnswer}`
        : knowledgeAnswer;
    }
  }
  
  // Enhanced response generation with document context
  
  // AI/ML questions
  if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('machine learning')) {
    return documentContext
      ? `${documentContext}\n\nAI (Artificial Intelligence) is technology that enables machines to simulate human intelligence. It includes machine learning, natural language processing, computer vision, and more. AI systems can learn, reason, and make decisions based on data.`
      : "AI (Artificial Intelligence) is technology that enables machines to simulate human intelligence. It includes machine learning (systems that learn from data), natural language processing (understanding human language), computer vision (interpreting visual information), and robotics. AI is used in everything from chatbots like me to self-driving cars, medical diagnosis, and recommendation systems.";
  }
  
  // Tech/Coding questions
  if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
    return documentContext 
      ? `${documentContext}\n\nJavaScript is a versatile programming language for web development. Key concepts: variables, functions, objects, async/await.`
      : "JavaScript is a versatile programming language used for web development. It's the language of the web, enabling interactive websites. Key concepts include variables, functions, objects, and asynchronous programming with promises and async/await.";
  }
  
  if (lowerMessage.includes('react')) {
    return documentContext
      ? `${documentContext}\n\nReact is a JavaScript library for building UIs using components, props, and state.`
      : "React is a JavaScript library for building user interfaces. It uses components, props, and state to create reusable UI elements. React follows a component-based architecture and uses a virtual DOM for efficient updates.";
  }
  
  if (lowerMessage.includes('python')) {
    return documentContext
      ? `${documentContext}\n\nPython is a high-level language known for simplicity. Used in web dev, data science, AI, and automation.`
      : "Python is a high-level programming language known for its simplicity and readability. It's widely used in web development, data science, AI, automation, and more.";
  }
  
  if (lowerMessage.includes('node') || lowerMessage.includes('nodejs')) {
    return "Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows you to run JavaScript on the server-side, enabling full-stack JavaScript development. It's known for its event-driven, non-blocking I/O model.";
  }
  
  // Career questions
  if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('internship')) {
    return documentContext
      ? `${documentContext}\n\nCareer success requires: strong fundamentals, portfolio projects, networking, continuous learning, and open source contributions.`
      : "Building a successful career in tech requires: 1) Strong fundamentals in programming, 2) Building a portfolio of projects, 3) Networking and internships, 4) Continuous learning, 5) Contributing to open source. Focus on practical skills and real-world experience.";
  }
  
  // Education questions
  if (lowerMessage.includes('study') || lowerMessage.includes('exam') || lowerMessage.includes('assignment')) {
    return documentContext
      ? `${documentContext}\n\nEffective study: create a schedule, use active recall, break down topics, practice past papers, take breaks, form study groups.`
      : "Effective study strategies: 1) Create a study schedule, 2) Use active recall and spaced repetition, 3) Break down complex topics, 4) Practice with past papers, 5) Take regular breaks, 6) Form study groups. Consistency beats intensity!";
  }
  
  // Science/Math questions
  if (lowerMessage.includes('what is') && (lowerMessage.includes('science') || lowerMessage.includes('math') || lowerMessage.includes('physics') || lowerMessage.includes('chemistry'))) {
    const topic = message.split('what is')[1]?.trim() || 'that topic';
    return `I can help explain ${topic}. However, for accurate scientific information, I'd recommend consulting textbooks or verified educational resources. If you have a specific question about a concept, I can provide a general explanation.`;
  }
  
  // General knowledge
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm your AI assistant. I can help with tech, coding, career advice, study tips, and general knowledge. What would you like to know?";
  }
  
  if (lowerMessage.includes('help')) {
    return "I can help with:\n- Tech and programming questions\n- Coding concepts and best practices\n- Career advice and guidance\n- Study tips and educational content\n- General knowledge questions\n- AI and machine learning\n\nJust ask me anything!";
  }
  
  // "What is" questions - provide intelligent responses
  if (lowerMessage.startsWith('what is ') || lowerMessage.startsWith('what\'s ') || lowerMessage.startsWith('explain ') || lowerMessage.startsWith('tell me about ')) {
    const topic = message.replace(/^what (is|'s) |^explain |^tell me about /i, '').trim();
    
    if (documentContext) {
      return `${documentContext}\n\nRegarding "${topic}": Based on the official documents above, here's what I can tell you. The documents provide authoritative information on this topic.`;
    }
    
    // Try to provide a helpful general answer
    const topicLower = topic.toLowerCase();
    
    // Common topics with general answers
    if (topicLower.includes('programming') || topicLower.includes('coding')) {
      return `Programming (also called coding) is the process of creating instructions for computers to execute. Programmers write code using programming languages like JavaScript, Python, Java, or C++ to create software, websites, mobile apps, and more. Programming involves problem-solving, logic, algorithms, and understanding how computers work.`;
    }
    
    if (topicLower.includes('algorithm')) {
      return `An algorithm is a step-by-step procedure or set of rules for solving a problem or completing a task. In programming, algorithms are implemented as code to process data, perform calculations, or make decisions. Examples include sorting data, searching for information, or calculating mathematical formulas.`;
    }
    
    if (topicLower.includes('database')) {
      return `A database is an organized collection of data stored and accessed electronically. Databases allow efficient storage, retrieval, and management of information. Common types include relational databases (SQL like MySQL, PostgreSQL) and NoSQL databases (MongoDB, Redis). Databases are essential for storing user information, product catalogs, and application data.`;
    }
    
    // Provide helpful guidance
    return `${topic.charAt(0).toUpperCase() + topic.slice(1)} is an interesting topic. Here's what I can tell you:\n\n• I can provide general information about ${topic}\n• For specific technical details, I'd recommend consulting official documentation\n• If you have a particular aspect of ${topic} you'd like to explore, feel free to ask!\n\nWhat specific aspect of ${topic} would you like to know about?`;
  }
  
  // Default intelligent response with document context
  if (documentContext) {
    return `${documentContext}\n\nBased on the official documents above and your question "${message}", here's what I can tell you: I've referenced the official documents where applicable. The documents provide authoritative information on this topic.`;
  }
  
  // Fallback: Provide helpful, accurate response
  return `I understand you're asking about "${message}". Here's what I can help with:\n\nI can provide information on:\n• Technology and programming concepts\n• AI and machine learning\n• Career and study advice\n• General knowledge topics\n\nCould you rephrase your question or ask about a specific aspect? This will help me give you a more accurate and detailed answer.`;
};

// POST /api/chat - Send message and get AI response
router.post('/', auth, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Generate AI response with RAG
    const response = await generateAIResponse(message, req.user._id);

    // Save to database
    const chat = new Chat({
      userId: req.user._id,
      message: message.trim(),
      response,
      timestamp: new Date()
    });

    await chat.save();

    res.json({
      _id: chat._id,
      message: chat.message,
      response: chat.response,
      timestamp: chat.timestamp
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Server error while processing chat' });
  }
});

// GET /api/chat/history - Get user's chat history
router.get('/history', auth, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(50);

    res.json(chats);
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ error: 'Server error while fetching chat history' });
  }
});

// DELETE /api/chat/history - Delete user's chat history
router.delete('/history', auth, async (req, res) => {
  try {
    await Chat.deleteMany({ userId: req.user._id });
    res.json({ message: 'Chat history deleted successfully' });
  } catch (error) {
    console.error('Delete chat history error:', error);
    res.status(500).json({ error: 'Server error while deleting chat history' });
  }
});

module.exports = router;

