# API Documentation

## Base URL
```
http://localhost:5000/api
```
   POST /api/docs/upload
## Authentication
Most endpoints require authentication. Include JWT token in headers:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication APIs

### POST /api/auth/signup
Register a new student.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "rollNumber": "STU001",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "rollNumber": "STU001"
  }
}
```

### POST /api/auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": { ... }
}
```

---

## 🤖 Chat APIs

### POST /api/chat
Send a message to AI assistant (with RAG support).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "message": "What is JavaScript?"
}
```

**Response:**
```json
{
  "_id": "chat_id",
  "message": "What is JavaScript?",
  "response": "AI response here...",
  "timestamp": "2024-12-09T10:00:00.000Z"
}
```

### GET /api/chat/history
Get user's chat history.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "_id": "chat_id",
    "message": "User message",
    "response": "AI response",
    "timestamp": "2024-12-09T10:00:00.000Z"
  }
]
```

### DELETE /api/chat/history
Delete all chat history for the user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Chat history deleted successfully"
}
```

---

## 📢 Feed APIs

### GET /api/feed
Get all feeds (circulars, notices, announcements).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `type` (optional): `Circular`, `Notice`, or `Announcement`
- `priority` (optional): `Low`, `Medium`, `High`, or `Urgent`

**Response:**
```json
[
  {
    "_id": "feed_id",
    "type": "Circular",
    "title": "Exam Schedule",
    "content": "Exam dates announced...",
    "priority": "High",
    "targetAudience": "All",
    "publishedAt": "2024-12-09T10:00:00.000Z",
    "expiresAt": null
  }
]
```

### POST /api/feed
Create a new feed (Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "type": "Circular",
  "title": "Exam Schedule",
  "content": "Exam dates announced...",
  "priority": "High",
  "targetAudience": "All",
  "expiresAt": "2024-12-31T23:59:59.000Z"
}
```

---

## 📝 Complaint APIs

### POST /api/complaint
Create a new complaint.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Network Issue",
  "message": "Unable to access internet in lab"
}
```

**Response:**
```json
{
  "message": "Complaint created successfully",
  "complaint": {
    "id": "complaint_id",
    "ticketId": "CMP-1001",
    "title": "Network Issue",
    "message": "Unable to access internet in lab",
    "status": "Pending",
    "createdAt": "2024-12-09T10:00:00.000Z"
  }
}
```

### GET /api/complaint
Get all complaints for the user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "_id": "complaint_id",
    "ticketId": "CMP-1001",
    "title": "Network Issue",
    "message": "Unable to access internet in lab",
    "status": "Pending",
    "adminReply": null,
    "createdAt": "2024-12-09T10:00:00.000Z"
  }
]
```

### GET /api/complaint/:id
Get a specific complaint by ID.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "_id": "complaint_id",
  "ticketId": "CMP-1001",
  "title": "Network Issue",
  "message": "Unable to access internet in lab",
  "status": "Pending",
  "adminReply": null,
  "createdAt": "2024-12-09T10:00:00.000Z"
}
```

### PUT /api/complaint/:id/status
Update complaint status (Admin).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "In-Review"
}
```

**Valid statuses:** `Pending`, `In-Review`, `Resolved`

### PUT /api/complaint/:id/reply
Admin reply to complaint.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "reply": "We have fixed the network issue. Please try again.",
  "status": "Resolved"
}
```

---

## 📁 Document Retrieval APIs (RAG)

### POST /api/docs/upload
Upload a document (Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Academic Policy 2024",
  "content": "Full document content here...",
  "category": "Academic",
  "tags": ["policy", "academic", "2024"],
  "metadata": {
    "author": "Admin",
    "version": "1.0"
  }
}
```

**Response:**
```json
{
  "message": "Document uploaded successfully",
  "document": {
    "id": "doc_id",
    "title": "Academic Policy 2024",
    "category": "Academic",
    "tags": ["policy", "academic", "2024"]
  }
}
```

### GET /api/docs/search
Search documents (RAG).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `query` (required): Search query
- `category` (optional): `Academic`, `Administrative`, `Policy`, `General`
- `limit` (optional): Number of results (default: 10)

**Example:**
```
GET /api/docs/search?query=academic policy&category=Academic&limit=5
```

**Response:**
```json
{
  "query": "academic policy",
  "results": [
    {
      "_id": "doc_id",
      "title": "Academic Policy 2024",
      "content": "Document content...",
      "category": "Academic",
      "tags": ["policy", "academic"],
      "metadata": {}
    }
  ],
  "count": 1
}
```

### GET /api/docs
Get all documents (Admin).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `category` (optional): Filter by category

**Response:**
```json
[
  {
    "_id": "doc_id",
    "title": "Academic Policy 2024",
    "category": "Academic",
    "tags": ["policy"],
    "createdAt": "2024-12-09T10:00:00.000Z"
  }
]
```

---

## Error Responses

All endpoints may return error responses:

```json
{
  "error": "Error message here"
}
```

**Common Status Codes:**
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Notes

- All timestamps are in ISO 8601 format
- JWT tokens expire after 7 days
- Complaint ticket IDs are auto-generated (CMP-1001, CMP-1002, etc.)
- RAG (Retrieval-Augmented Generation) is used in chat responses to prevent hallucination
- Documents are used as the source of truth for AI responses

