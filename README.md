# Student AI Assistant

A full-stack web application for students with AI-powered chat assistance, complaint management, and a modern dashboard interface.

## Features

- **Authentication System**: Secure signup/login with JWT and bcrypt password hashing
- **AI Chatbox**: Floating chat interface that answers tech, coding, career, and general questions
- **Complaint System**: Raise complaints with auto-generated ticket IDs and admin reply support
- **Dynamic Dashboard**: Time-based greetings, quick actions, live activity feed, and progress statistics

## Tech Stack

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios for API calls
- React Router

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation, MongoDB Atlas, or Docker)
- npm or yarn

> **Note**: If you don't have MongoDB installed, see [MONGODB_SETUP.md](./MONGODB_SETUP.md) for setup instructions.

## Installation

### 1. Clone the repository
```bash
cd studentapp
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/studentapp
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## Running the Application

### Start MongoDB
Make sure MongoDB is running. Choose one:

**Option 1: MongoDB Atlas (Easiest)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Copy connection string to `backend/.env` as `MONGODB_URI`

**Option 2: Local MongoDB**
```bash
# Ubuntu/Debian
sudo systemctl start mongod

# macOS (Homebrew)
brew services start mongodb-community

# Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

See [MONGODB_SETUP.md](./MONGODB_SETUP.md) for detailed instructions.

### Start Backend Server
```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### Start Frontend Server
```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

> **⚠️ Important**: Always run commands from the `backend/` or `frontend/` directories, not from the root. See [COMMANDS.md](./COMMANDS.md) for reference.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new student
- `POST /api/auth/login` - Login

### Chat
- `POST /api/chat` - Send message to AI (requires auth)
- `GET /api/chat/history` - Get chat history (requires auth)
- `DELETE /api/chat/history` - Delete chat history (requires auth)

### Complaints
- `POST /api/complaints` - Create a complaint (requires auth)
- `GET /api/complaints` - Get user's complaints (requires auth)
- `PUT /api/complaints/:id/reply` - Admin reply to complaint (requires auth)

## Usage

1. **Sign Up**: Create a new account with name, email, roll number, and password
2. **Login**: Access your dashboard
3. **AI Chat**: Click the floating chat button to ask questions
4. **Raise Complaint**: Use the quick action card or button to submit complaints
5. **View Activity**: Check the live activity feed and progress statistics

## Project Structure

```
studentapp/
├── backend/
│   ├── models/          # MongoDB models (User, Chat, Complaint)
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── server.js        # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── utils/       # API utilities
│   │   └── App.jsx      # Main app component
│   └── package.json
└── README.md
```

## Notes

- The AI chat uses a simplified response system. In production, integrate with OpenAI, Claude, or similar AI APIs.
- All passwords are hashed using bcrypt before storage.
- JWT tokens expire after 7 days.
- The activity feed updates every 10 seconds automatically.
- Complaint ticket IDs are auto-generated (CMP-1001, CMP-1002, etc.)

## Development

For development with hot-reload:
- Backend: `npm run dev` (requires nodemon)
- Frontend: `npm run dev` (Vite hot-reload)

## License

ISC

