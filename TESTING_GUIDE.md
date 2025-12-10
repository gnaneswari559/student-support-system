# Testing Guide - New Features

## 🚀 Quick Start Testing

### 1. Restart Backend (if needed)

The backend needs to be restarted to load the new routes and models:

```bash
# Stop current backend (Ctrl+C if running in terminal)
# Then restart:
cd /home/a/studentapp/backend
npm start
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

### 2. Test the Enhanced AI Chat

1. **Open the app**: http://localhost:3000
2. **Login** with your account
3. **Click the floating AI button** (🤖)
4. **Try these questions:**
   - "What is JavaScript?"
   - "How do I study for exams?"
   - "Career advice for tech"
   - "Hello"

**Expected:** Smart, direct answers without hallucination

### 3. Test Document Upload (RAG)

**Using curl or Postman:**

```bash
# First, get your JWT token from login
TOKEN="your_jwt_token_here"

# Upload a document
curl -X POST http://localhost:5000/api/docs/upload \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Academic Policy 2024",
    "content": "Students must maintain 75% attendance. Exams are conducted twice per semester.",
    "category": "Academic",
    "tags": ["policy", "attendance", "exams"]
  }'
```

**Then ask in chat:**
- "What is the attendance policy?"
- "Tell me about exams"

**Expected:** AI should reference the uploaded document!

### 4. Test Feed APIs

**Create a feed (Admin):**
```bash
curl -X POST http://localhost:5000/api/feed \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "Circular",
    "title": "Exam Schedule Released",
    "content": "Final exams will be held from Dec 15-20. Check your schedule.",
    "priority": "High",
    "targetAudience": "All"
  }'
```

**Get feeds:**
```bash
curl -X GET http://localhost:5000/api/feed \
  -H "Authorization: Bearer $TOKEN"
```

### 5. Test Enhanced Complaint APIs

**Create complaint:**
```bash
curl -X POST http://localhost:5000/api/complaint \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Network Issue",
    "message": "Cannot access internet in lab"
  }'
```

**Get specific complaint:**
```bash
curl -X GET http://localhost:5000/api/complaint/COMPLAINT_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Update status:**
```bash
curl -X PUT http://localhost:5000/api/complaint/COMPLAINT_ID/status \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "In-Review"
  }'
```

**Admin reply:**
```bash
curl -X PUT http://localhost:5000/api/complaint/COMPLAINT_ID/reply \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "reply": "We have fixed the issue. Please try again.",
    "status": "Resolved"
  }'
```

### 6. Test Document Search (RAG)

**Search documents:**
```bash
curl -X GET "http://localhost:5000/api/docs/search?query=academic%20policy&category=Academic" \
  -H "Authorization: Bearer $TOKEN"
```

## 🎯 Frontend Testing

### Test in Browser Console

1. **Open browser console** (F12)
2. **Get your token:**
   ```javascript
   localStorage.getItem('token')
   ```

3. **Test API calls:**
   ```javascript
   const token = localStorage.getItem('token');
   
   // Get feeds
   fetch('http://localhost:5000/api/feed', {
     headers: { 'Authorization': `Bearer ${token}` }
   }).then(r => r.json()).then(console.log);
   
   // Search documents
   fetch('http://localhost:5000/api/docs/search?query=policy', {
     headers: { 'Authorization': `Bearer ${token}` }
   }).then(r => r.json()).then(console.log);
   ```

## ✅ Verification Checklist

- [ ] Backend restarted successfully
- [ ] MongoDB connected
- [ ] Can login/signup
- [ ] AI chat works with smart responses
- [ ] Can upload documents
- [ ] AI references uploaded documents (RAG)
- [ ] Can create/get feeds
- [ ] Complaint APIs work (create, get, update status, reply)
- [ ] Document search works

## 🐛 Troubleshooting

### Backend not starting?
```bash
cd backend
npm start
# Check for errors
```

### MongoDB connection error?
- See `MONGODB_SETUP.md`
- Verify MongoDB is running
- Check `backend/.env` has correct `MONGODB_URI`

### API returns 401 Unauthorized?
- Make sure you're logged in
- Check JWT token is valid
- Token expires after 7 days

### RAG not working?
- Upload documents first using `/api/docs/upload`
- Check documents exist: `GET /api/docs`
- Try searching: `GET /api/docs/search?query=your_query`

## 📝 Next Steps

1. **Upload sample documents** for RAG to work effectively
2. **Create sample feeds** (circulars, notices)
3. **Test the full flow**: Upload doc → Ask question → See RAG response
4. **Integrate feeds into dashboard UI** (optional enhancement)
5. **Add admin panel** for document/feed management (optional)

## 🎨 UI Enhancements (Optional)

Consider adding:
- Feed display on dashboard
- Document viewer
- Admin panel for uploads
- Real-time notifications for new feeds

