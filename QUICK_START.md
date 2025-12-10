# Quick Start Guide

## MongoDB is Connected! ✅

Your backend successfully connected to MongoDB. Now let's start the application.

## Start the Application

### Option 1: Use the Start Script (Recommended)
```bash
./start.sh
```

This will start both backend and frontend servers in the background.

### Option 2: Manual Start (Two Terminals)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## First Steps

1. **Sign Up**: Create a new account at http://localhost:3000/signup
   - Enter: Name, Email, Roll Number, Password (min 6 characters)

2. **Login**: Use your credentials to login

3. **Explore Features**:
   - Click the floating 🤖 button to chat with AI
   - Use "Raise Complaint" to submit issues
   - Check your dashboard for activity feed and statistics

## Troubleshooting

### Backend not starting?
- Check MongoDB is running: `docker ps | grep mongodb` or `systemctl status mongod`
- Check backend logs: `tail -f backend.log`

### Frontend not starting?
- Make sure backend is running first
- Check frontend logs: `tail -f frontend.log`

### MongoDB connection issues?
- See [MONGODB_SETUP.md](./MONGODB_SETUP.md) for setup instructions
- Verify your `backend/.env` has correct `MONGODB_URI`

## Stop Servers

If using the start script:
```bash
# Find PIDs
ps aux | grep "node server.js"
ps aux | grep "vite"

# Kill them
kill <BACKEND_PID> <FRONTEND_PID>
```

Or use Ctrl+C if running in foreground terminals.

