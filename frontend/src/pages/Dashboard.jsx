import { useState, useEffect, useRef } from 'react';
import api from '../utils/api';
import AIChatbox from '../components/AIChatbox';
import ComplaintModal from '../components/ComplaintModal';

function Dashboard({ user, onLogout }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const [showChat, setShowChat] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activityFeed, setActivityFeed] = useState([]);
  const [stats, setStats] = useState({
    totalComplaints: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0
  });

  useEffect(() => {
    loadData();
    const interval = setInterval(loadActivityFeed, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadComplaints(),
        loadActivityFeed()
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadComplaints = async () => {
    try {
      const response = await api.get('/complaints');
      setComplaints(response.data);
      
      const pending = response.data.filter(c => c.status === 'Pending').length;
      const resolved = response.data.filter(c => c.status === 'Resolved').length;
      
      setStats({
        totalComplaints: response.data.length,
        pendingComplaints: pending,
        resolvedComplaints: resolved
      });
    } catch (error) {
      console.error('Error loading complaints:', error);
    }
  };

  const loadActivityFeed = async () => {
    try {
      const [complaintsRes, chatRes] = await Promise.all([
        api.get('/complaints'),
        api.get('/chat/history')
      ]);

      const activities = [];
      
      // Add recent complaints
      complaintsRes.data.slice(0, 3).forEach(complaint => {
        activities.push({
          id: complaint._id,
          type: 'complaint',
          message: `Complaint ${complaint.ticketId}: ${complaint.title}`,
          status: complaint.status,
          time: new Date(complaint.createdAt)
        });
      });

      // Add recent chat messages
      chatRes.data.slice(0, 2).forEach(chat => {
        activities.push({
          id: chat._id,
          type: 'chat',
          message: `Chat: ${chat.message.substring(0, 50)}...`,
          time: new Date(chat.timestamp)
        });
      });

      activities.sort((a, b) => b.time - a.time);
      setActivityFeed(activities.slice(0, 5));
    } catch (error) {
      console.error('Error loading activity feed:', error);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'In-Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-blue-600">🎓 Student AI</div>
              <div className="hidden md:block relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <span className="text-xl">🔔</span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block font-medium text-gray-700">{user.name}</span>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <p className="text-xs text-gray-500">Roll: {user.rollNumber}</p>
                    </div>
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {getGreeting()}, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600">Welcome to your dashboard</p>
        </div>

        {/* Quick Action Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            <button
              onClick={() => setShowChat(true)}
              className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition min-w-[200px]"
            >
              <div className="text-3xl mb-2">🤖</div>
              <div className="font-semibold">AI Assistant</div>
              <div className="text-sm text-blue-100">Chat with AI</div>
            </button>

            <button
              onClick={() => setShowComplaintModal(true)}
              className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition min-w-[200px]"
            >
              <div className="text-3xl mb-2">📝</div>
              <div className="font-semibold">Raise Complaint</div>
              <div className="text-sm text-purple-100">Get help</div>
            </button>

            <div className="flex-shrink-0 bg-white border border-gray-200 px-6 py-4 rounded-xl shadow hover:shadow-md transition min-w-[200px]">
              <div className="text-3xl mb-2">📚</div>
              <div className="font-semibold text-gray-800">Study Resources</div>
              <div className="text-sm text-gray-500">Coming soon</div>
            </div>

            <div className="flex-shrink-0 bg-white border border-gray-200 px-6 py-4 rounded-xl shadow hover:shadow-md transition min-w-[200px]">
              <div className="text-3xl mb-2">📊</div>
              <div className="font-semibold text-gray-800">Grades</div>
              <div className="text-sm text-gray-500">Coming soon</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Statistics */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Progress Statistics</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Total Complaints</span>
                    <span className="text-sm font-semibold text-gray-900">{stats.totalComplaints}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((stats.totalComplaints / 10) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Pending</span>
                    <span className="text-sm font-semibold text-yellow-600">{stats.pendingComplaints}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${stats.totalComplaints > 0 ? (stats.pendingComplaints / stats.totalComplaints) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Resolved</span>
                    <span className="text-sm font-semibold text-green-600">{stats.resolvedComplaints}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${stats.totalComplaints > 0 ? (stats.resolvedComplaints / stats.totalComplaints) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Complaints & Activity Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Complaints */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">My Complaints</h2>
                <button
                  onClick={() => setShowComplaintModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                >
                  + New Complaint
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                </div>
              ) : complaints.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No complaints yet. Raise one to get started!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {complaints.map((complaint) => (
                    <div key={complaint._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{complaint.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{complaint.ticketId}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(complaint.status)}`}>
                          {complaint.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{complaint.message}</p>
                      {complaint.adminReply && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs font-semibold text-blue-600 mb-1">Admin Reply:</p>
                          <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">{complaint.adminReply}</p>
                        </div>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(complaint.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Activity Feed</h2>
              {activityFeed.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No recent activity</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {activityFeed.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">{activity.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {activity.time.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Floating AI Chat Button */}
      <button
        onClick={() => setShowChat(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all flex items-center justify-center text-2xl z-40"
      >
        🤖
      </button>

      {/* Modals */}
      <AIChatbox isOpen={showChat} onClose={() => setShowChat(false)} />
      <ComplaintModal
        isOpen={showComplaintModal}
        onClose={() => setShowComplaintModal(false)}
        onSuccess={loadComplaints}
      />
    </div>
  );
}

export default Dashboard;

