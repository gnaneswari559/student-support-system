# MongoDB Setup Guide

The application requires MongoDB to run. You have three options:

## Option 1: MongoDB Atlas (Recommended - Easiest)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Update your `backend/.env` file:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studentapp?retryWrites=true&w=majority
   ```
   Replace `username` and `password` with your Atlas credentials.

## Option 2: Install MongoDB Locally

### Ubuntu/Debian:
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### macOS (using Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Windows:
Download and install from: https://www.mongodb.com/try/download/community

## Option 3: Docker (Quick Setup)

```bash
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Your MONGODB_URI will be: mongodb://localhost:27017/studentapp
```

## Verify MongoDB is Running

After setup, verify MongoDB is accessible:
```bash
# If MongoDB is installed locally
mongosh
# or
mongo
```

Or test the connection:
```bash
curl http://localhost:27017
```

## Update Backend .env

Make sure your `backend/.env` has the correct MongoDB URI:
```env
MONGODB_URI=mongodb://localhost:27017/studentapp
# OR for Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studentapp
```

## Restart Backend

After setting up MongoDB, restart your backend server:
```bash
cd backend
npm start
```

You should see: `MongoDB connected successfully` ✅

