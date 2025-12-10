# 🚀 Run Commands - Student AI Assistant

## Quick Start Commands

### 1. Check Current Status

```bash
# Check if backend is running
ps aux | grep "node server.js" | grep -v grep

# Check if frontend is running
ps aux | grep vite | grep -v grep

# Check MongoDB connection
curl -s http://localhost:5000/api/feed 2>&1 | head -1
# Should return: {"error":"No token, authorization denied"} (means backend is running)
```

### 2. Restart Backend (Required - to load new knowledge base)

```bash
# Stop existing backend
pkill -f "node server.js"

# Or kill specific PID (if you know it)
# kill <PID>

# Navigate to backend directory
cd /home/a/studentapp/backend

# Start backend
npm start

# Or for development with auto-reload
npm run dev
```

**Expected output:**
```
Server running on port 5000
MongoDB connected successfully
```

### 3. Start Frontend (if not running)

**Terminal 2 (new terminal):**
```bash
cd /home/a/studentapp/frontend
npm run dev
```

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### 4. Start Both Servers (Using Scripts)

**Option A: Use start script**
```bash
cd /home/a/studentapp
./start.sh
```

**Option B: Use individual scripts**
```bash
# Terminal 1 - Backend
cd /home/a/studentapp
./dev-backend.sh

# Terminal 2 - Frontend
cd /home/a/studentapp
./dev-frontend.sh
```

### 5. Verify Everything is Running

```bash
# Check backend
curl http://localhost:5000/api/feed
# Should return: {"error":"No token, authorization denied"}

# Check frontend
curl -s http://localhost:3000 | head -1
# Should return HTML content

# Check MongoDB
# If using Docker:
docker ps | grep mongodb
# Or check MongoDB service:
systemctl status mongod
```

## 🧪 Test Commands

### Test Backend APIs

```bash
# Get your token (after logging in at http://localhost:3000)
# Open browser console and run: localStorage.getItem('token')
TOKEN="your_jwt_token_here"

# Test Feed API
curl -X GET http://localhost:5000/api/feed \
  -H "Authorization: Bearer $TOKEN"

# Test Document Search
curl -X GET "http://localhost:5000/api/docs/search?query=rgukt" \
  -H "Authorization: Bearer $TOKEN"

# Test Chat API
curl -X POST http://localhost:5000/api/chat \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message": "what is rgukt"}'

# Test Complaint API
curl -X POST http://localhost:5000/api/complaint \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "message": "Test complaint"}'
```

### Test Knowledge Base

```bash
# Test RGUKT knowledge
curl -X POST http://localhost:5000/api/chat \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message": "what is rgukt"}'

# Test general knowledge
curl -X POST http://localhost:5000/api/chat \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message": "what is javascript"}'

# Test AI knowledge
curl -X POST http://localhost:5000/api/chat \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message": "what is ai"}'
```

## 📋 Complete Setup Commands

### First Time Setup

```bash
# 1. Install backend dependencies
cd /home/a/studentapp/backend
npm install

# 2. Create .env file (if not exists)
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/studentapp
JWT_SECRET=$(openssl rand -base64 32)
NODE_ENV=development
EOF

# 3. Install frontend dependencies
cd ../frontend
npm install

# 4. Start MongoDB (if using Docker)
docker run -d -p 27017:27017 --name mongodb mongo:latest

# 5. Start backend
cd ../backend
npm start

# 6. Start frontend (new terminal)
cd ../frontend
npm run dev
```

## 🛑 Stop Commands

```bash
# Stop backend
pkill -f "node server.js"

# Stop frontend
pkill -f vite

# Stop both
pkill -f "node server.js" && pkill -f vite

# Stop MongoDB (Docker)
docker stop mongodb
```

## 🔍 Debug Commands

```bash
# View backend logs
tail -f /home/a/studentapp/backend.log

# View frontend logs
tail -f /home/a/studentapp/frontend.log

# Check MongoDB logs
docker logs mongodb

# Check port usage
netstat -tulpn | grep -E "(3000|5000|27017)"

# Check Node processes
ps aux | grep node
```

## 📱 Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

## ✅ Quick Verification

```bash
# All-in-one check
echo "=== Backend ===" && \
curl -s http://localhost:5000/api/feed 2>&1 | head -1 && \
echo -e "\n=== Frontend ===" && \
curl -s http://localhost:3000 > /dev/null && echo "✅ Running" || echo "❌ Not running" && \
echo -e "\n=== MongoDB ===" && \
docker ps | grep mongodb > /dev/null && echo "✅ Running" || echo "❌ Not running"
```

