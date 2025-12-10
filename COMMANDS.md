# Quick Command Reference

## Important: Always run commands from the correct directory!

The project has **separate** `package.json` files:
- `/home/a/studentapp/backend/package.json` - Backend server
- `/home/a/studentapp/frontend/package.json` - Frontend app
- `/home/a/studentapp/package.json` - ❌ **DOES NOT EXIST**

## Common Commands

### Start Backend
```bash
cd /home/a/studentapp/backend
npm start
# OR
cd backend && npm start
```

### Start Frontend
```bash
cd /home/a/studentapp/frontend
npm run dev
# OR
cd frontend && npm run dev
```

### Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Check Current Directory
```bash
pwd
# Should show: /home/a/studentapp/backend OR /home/a/studentapp/frontend
```

## Quick Start Script

Instead of manual commands, use:
```bash
./start.sh
```

This starts both servers automatically.

## Directory Structure

```
studentapp/
├── backend/          ← Run backend commands here
│   └── package.json
├── frontend/         ← Run frontend commands here
│   └── package.json
└── (root)            ← No package.json here!
```

## Error Prevention Tips

1. **Always check your directory first:**
   ```bash
   pwd
   ls package.json  # Should show package.json if in correct directory
   ```

2. **Use full paths:**
   ```bash
   cd /home/a/studentapp/frontend && npm run dev
   ```

3. **Use the start script:**
   ```bash
   ./start.sh  # Handles everything automatically
   ```

