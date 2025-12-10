import { useState, useEffect, useRef } from 'react';
import api from '../utils/api';

// Frontend Chatbox Prompt
export const chatbotPrompt = `You are a smart, friendly AI chat assistant.

You can talk about anything:
- Tech
- Studies
- Career
- Programming
- General life questions

Rules:
- Never lie.
- Keep replies short but helpful.
- Be conversational.
- If something sounds vague, gently clarify.

Main Goal: Be useful, honest, and fast.`;

function AIChatbox({ isOpen, onClose }) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      loadChatHistory();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChatHistory = async () => {
    try {
      const response = await api.get('/chat/history');
      setChatHistory(response.data.reverse());
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const userMessage = message.trim();
    setMessage('');
    setLoading(true);

    // Add user message to UI immediately
    const tempUserMsg = { message: userMessage, response: '', timestamp: new Date(), isSending: true };
    setChatHistory(prev => [...prev, tempUserMsg]);

    try {
      const response = await api.post('/chat', { message: userMessage });
      
      // Update with actual response
      setChatHistory(prev => prev.map((chat, idx) => 
        idx === prev.length - 1 && chat.isSending
          ? { ...response.data, isSending: false }
          : chat
      ));
    } catch (error) {
      setChatHistory(prev => prev.map((chat, idx) => 
        idx === prev.length - 1 && chat.isSending
          ? { ...chat, response: 'Sorry, I encountered an error. Please try again.', isSending: false }
          : chat
      ));
    } finally {
      setLoading(false);
      loadChatHistory();
    }
  };

  const handleDeleteHistory = async () => {
    if (!window.confirm('Are you sure you want to delete all chat history?')) return;
    
    setDeleting(true);
    try {
      await api.delete('/chat/history');
      setChatHistory([]);
    } catch (error) {
      console.error('Error deleting chat history:', error);
      alert('Failed to delete chat history');
    } finally {
      setDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">AI Assistant</h2>
            <p className="text-blue-100 text-sm">Ask me anything!</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDeleteHistory}
              disabled={deleting || chatHistory.length === 0}
              className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-sm font-medium transition disabled:opacity-50"
            >
              {deleting ? 'Deleting...' : 'Clear History'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-sm font-medium transition"
            >
              Close
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {chatHistory.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <div className="text-6xl mb-4">🤖</div>
              <p className="text-lg">Start a conversation with your AI assistant!</p>
              <p className="text-sm mt-2">I can help with tech, coding, career, education, and more.</p>
              <p className="text-xs mt-1 text-gray-400">Smart, honest, and always ready to help!</p>
            </div>
          ) : (
            chatHistory.map((chat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none px-4 py-2 max-w-[70%]">
                    <p className="text-sm">{chat.message}</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-2 max-w-[70%] shadow-sm">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {chat.isSending ? 'Thinking...' : chat.response}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-6 bg-white border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AIChatbox;

