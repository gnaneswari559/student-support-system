# Backend API - Student AI Assistant

Express.js backend with MongoDB for the Student AI Assistant application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/studentapp
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

3. Start MongoDB (if using local):
```bash
mongod
```

4. Run the server:
```bash
npm start
# or for development
npm run dev
```

## API Routes

All routes are prefixed with `/api`

### Authentication (`/api/auth`)
- `POST /signup` - Register new user
- `POST /login` - Login user

### Chat (`/api/chat`)
- `POST /` - Send message (requires auth)
- `GET /history` - Get chat history (requires auth)
- `DELETE /history` - Delete chat history (requires auth)

### Complaints (`/api/complaints`)
- `POST /` - Create complaint (requires auth)
- `GET /` - Get user's complaints (requires auth)
- `PUT /:id/reply` - Admin reply (requires auth)

## Models

- **User**: name, email, rollNumber, passwordHash
- **Chat**: userId, message, response, timestamp
- **Complaint**: userId, ticketId, title, message, status, adminReply, createdAt

