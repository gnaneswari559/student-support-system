#!/bin/bash

echo "🚀 Starting Student AI Assistant..."
echo ""

# Check if MongoDB is running
if ! nc -z localhost 27017 2>/dev/null && ! docker ps | grep -q mongodb; then
    echo "⚠️  Warning: MongoDB might not be running"
    echo "   Make sure MongoDB is accessible on localhost:27017"
    echo ""
fi

# Start backend in background
echo "📡 Starting backend server..."
cd backend
npm start > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "   Backend PID: $BACKEND_PID"
echo "   Backend logs: tail -f backend.log"
cd ..

# Wait a moment for backend to start
sleep 2

# Start frontend
echo "🎨 Starting frontend server..."
cd frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "   Frontend PID: $FRONTEND_PID"
echo "   Frontend logs: tail -f frontend.log"
cd ..

echo ""
echo "✅ Servers started!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:5000"
echo ""
echo "📋 To stop servers:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "📝 View logs:"
echo "   tail -f backend.log"
echo "   tail -f frontend.log"

