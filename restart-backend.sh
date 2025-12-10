#!/bin/bash

echo "🔄 Restarting backend server..."

# Find and kill existing backend process
PID=$(ps aux | grep "node server.js" | grep -v grep | awk '{print $2}')

if [ ! -z "$PID" ]; then
    echo "Stopping existing backend (PID: $PID)..."
    kill $PID
    sleep 2
fi

# Start backend
echo "Starting backend server..."
cd "$(dirname "$0")/backend"
npm start > ../backend.log 2>&1 &
NEW_PID=$!

sleep 2

# Check if it started
if ps -p $NEW_PID > /dev/null; then
    echo "✅ Backend restarted successfully (PID: $NEW_PID)"
    echo "📝 Logs: tail -f backend.log"
    echo ""
    echo "Testing new routes..."
    sleep 1
    curl -s http://localhost:5000/api/feed > /dev/null 2>&1 && echo "✅ Feed API: Working" || echo "❌ Feed API: Not responding"
    curl -s http://localhost:5000/api/docs/search > /dev/null 2>&1 && echo "✅ Docs API: Working" || echo "❌ Docs API: Not responding"
else
    echo "❌ Failed to start backend. Check backend.log"
fi

