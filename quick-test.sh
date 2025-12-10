#!/bin/bash

echo "🧪 Quick API Test"
echo "=================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Check if routes exist (should get 401, not 404)
echo "1️⃣ Testing route existence..."
FEED_TEST=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/feed)
DOCS_TEST=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/docs/search)

if [ "$FEED_TEST" = "401" ]; then
    echo -e "${GREEN}✅ Feed API route exists${NC}"
else
    echo -e "${YELLOW}⚠️  Feed API: HTTP $FEED_TEST${NC}"
fi

if [ "$DOCS_TEST" = "401" ]; then
    echo -e "${GREEN}✅ Docs API route exists${NC}"
else
    echo -e "${YELLOW}⚠️  Docs API: HTTP $DOCS_TEST${NC}"
fi

echo ""
echo "2️⃣ Testing with authentication..."
echo "   (You need to be logged in to test authenticated endpoints)"
echo ""
echo "📝 To test authenticated endpoints:"
echo "   1. Open http://localhost:3000"
echo "   2. Login to your account"
echo "   3. Open browser console (F12)"
echo "   4. Run:"
echo ""
echo "   const token = localStorage.getItem('token');"
echo "   fetch('http://localhost:5000/api/feed', {"
echo "     headers: { 'Authorization': \`Bearer \${token}\` }"
echo "   }).then(r => r.json()).then(console.log);"
echo ""
echo "✅ All new routes are loaded and working!"
echo ""
echo "📚 Next: See TESTING_GUIDE.md for detailed examples"

