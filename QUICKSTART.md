# Quick Start Guide

Get the Munich Minijobs board running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- MongoDB running locally OR MongoDB Atlas account

## Step-by-Step

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your settings
# Minimum required:
# - MONGODB_URI (keep default if using local MongoDB)
# - PAYLOAD_SECRET (any random string)
```

### 3. Start MongoDB (if using local)

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Start the Servers

**Terminal 1 - Payload CMS:**
```bash
npm run dev:payload
```

**Terminal 2 - Astro Frontend:**
```bash
npm run dev
```

### 5. Create Admin Account

1. Open http://localhost:3000/admin
2. Fill in your admin credentials
3. Click "Create"

### 6. Add Your First Job

1. In Payload admin, click "Jobs" → "Create New"
2. Fill in:
   - Title: "Bar Staff Needed"
   - Job Type: "Bar Staff"
   - District: "Maxvorstadt"
   - Description: "Looking for friendly bar staff..."
   - Hourly Rate: 13
   - Hours per Week: "20-30"
   - WhatsApp: "+4915123456789"
   - Status: "Active"
3. Click "Create"

### 7. View Your Site

Open http://localhost:4321 - you should see your first job!

## Troubleshooting

**MongoDB connection error?**
- Check MongoDB is running: `brew services list`
- Or use MongoDB Atlas (free): https://www.mongodb.com/cloud/atlas

**Port already in use?**
- Change ports in `.env` if needed
- Or stop other services using those ports

**Types error?**
- Run: `npm run generate:types`

## Next Steps

- Customize colors in `src/layouts/BaseLayout.astro`
- Add more jobs in Payload admin
- Read full [README.md](./README.md) for deployment options

---

Questions? Check the main README or open an issue!
