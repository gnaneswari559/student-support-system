#!/bin/bash

echo "🛑 Stopping Student AI Assistant..."

# Stop backend
if ps aux | grep -q "[n]ode server.js"; then
    echo "Stopping backend..."
    pkill -f "node server.js"
    echo "✅ Backend stopped"
else
    echo "Backend not running"
fi

# Stop frontend
if ps aux | grep -q "[v]ite"; then
    echo "Stopping frontend..."
    pkill -f vite
    echo "✅ Frontend stopped"
else
    echo "Frontend not running"
fi

echo ""
echo "✅ All services stopped"
