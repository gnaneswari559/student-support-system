#!/bin/bash

echo "🚀 Student AI Assistant - Quick Start"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check MongoDB
echo "1️⃣ Checking MongoDB..."
if docker ps | grep -q mongodb; then
    echo -e "${GREEN}✅ MongoDB is running${NC}"
elif nc -z localhost 27017 2>/dev/null; then
    echo -e "${GREEN}✅ MongoDB is running${NC}"
else
    echo -e "${YELLOW}⚠️  MongoDB not detected. Starting with Docker...${NC}"
    docker run -d -p 27017:27017 --name mongodb mongo:latest 2>/dev/null || docker start mongodb 2>/dev/null
    sleep 2
fi

# Check Backend
echo ""
echo "2️⃣ Checking Backend..."
if ps aux | grep -q "[n]ode server.js"; then
    echo -e "${YELLOW}⚠️  Backend is already running. Restarting...${NC}"
    pkill -f "node server.js"
    sleep 2
fi

echo "Starting backend..."
cd "$(dirname "$0")/backend"
npm start > ../backend.log 2>&1 &
BACKEND_PID=$!
sleep 3

if ps -p $BACKEND_PID > /dev/null; then
    echo -e "${GREEN}✅ Backend started (PID: $BACKEND_PID)${NC}"
else
    echo -e "${RED}❌ Backend failed to start. Check backend.log${NC}"
    exit 1
fi

# Check Frontend
echo ""
echo "3️⃣ Checking Frontend..."
if ps aux | grep -q "[v]ite"; then
    echo -e "${YELLOW}⚠️  Frontend is already running${NC}"
else
    echo "Starting frontend..."
    cd "../frontend"
    npm run dev > ../frontend.log 2>&1 &
    FRONTEND_PID=$!
    sleep 3
    if ps -p $FRONTEND_PID > /dev/null; then
        echo -e "${GREEN}✅ Frontend started (PID: $FRONTEND_PID)${NC}"
    else
        echo -e "${RED}❌ Frontend failed to start. Check frontend.log${NC}"
    fi
fi

echo ""
echo "======================================"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:5000"
echo ""
echo "📝 Logs:"
echo "   Backend:  tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "🛑 To stop:"
echo "   pkill -f 'node server.js'"
echo "   pkill -f vite"
