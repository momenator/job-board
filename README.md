# Munich Minijobs - Job Board

A lightweight job board for minijobs in Munich, built with Astro and Payload CMS. Perfect for finding bar staff, kitchen helpers, delivery jobs, and more.

## Features

- 🚀 **Fast & Simple**: Built with Astro SSR for optimal performance
- 📱 **Mobile-First**: Optimized for mobile users (target demographic)
- 💬 **WhatsApp Integration**: One-click applications via WhatsApp
- 🎨 **Clean UI**: Simple, focused design for job seekers
- 🔍 **Easy Filtering**: Filter by job type and district
- 📝 **Headless CMS**: Payload CMS for easy job management

## Tech Stack

- **Frontend**: Astro (SSR mode)
- **CMS**: Payload CMS v3
- **Database**: MongoDB
- **Language**: TypeScript

## Project Structure

```
/
├── src/
│   ├── components/
│   │   └── JobCard.astro          # Job listing card component
│   ├── layouts/
│   │   └── BaseLayout.astro       # Base layout with header/footer
│   ├── lib/
│   │   └── payload.ts             # Payload CMS API client
│   ├── pages/
│   │   ├── index.astro            # Home page with job listings
│   │   ├── about.astro            # About page
│   │   └── jobs/
│   │       └── [id].astro         # Job detail page
│   ├── payload.config.ts          # Payload CMS configuration
│   └── payload-types.ts           # Auto-generated TypeScript types
├── public/
│   └── uploads/                   # Job images (auto-created)
├── astro.config.mjs               # Astro configuration
├── package.json
└── tsconfig.json
```

## Prerequisites

- Node.js 18+ (recommended: use `nvm` to install)
- MongoDB (local or cloud instance)
- npm or yarn

## Getting Started

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd job-board

# Install dependencies
npm install
```

### 2. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string

### 3. Configure Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and update:
# - MONGODB_URI (your MongoDB connection string)
# - PAYLOAD_SECRET (generate a random string)
```

Example `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/munich-job-board
PAYLOAD_SECRET=your-very-secret-key-here
PAYLOAD_API_URL=http://localhost:3000/api
```

### 4. Generate Payload Types

```bash
npm run generate:types
```

### 5. Run the Development Servers

You need to run **two servers** in separate terminals:

**Terminal 1: Payload CMS (Admin & API)**
```bash
npm run dev:payload
```
This starts Payload CMS on `http://localhost:3000`

**Terminal 2: Astro Frontend**
```bash
npm run dev
```
This starts Astro on `http://localhost:4321`

### 6. Create Your First Admin User

1. Open `http://localhost:3000/admin`
2. Create an admin account
3. Log in to the Payload admin panel

### 7. Add Some Jobs

1. In Payload admin, go to "Jobs" collection
2. Click "Create New"
3. Fill in the job details:
   - Title, job type, district
   - Description (rich text)
   - Hourly rate and hours
   - WhatsApp number (format: +491234567890)
   - Optional: email, address, image

### 8. View Your Job Board

Open `http://localhost:4321` to see the Astro frontend with your jobs!

## Usage Guide

### For Job Seekers (Frontend)

- **Browse Jobs**: Visit the home page to see all active jobs
- **Filter**: Use dropdowns to filter by job type or district
- **View Details**: Click any job to see full details
- **Apply**: Click "Apply via WhatsApp" to open WhatsApp with a pre-filled message

### For Admins (Payload CMS)

Access the admin panel at `http://localhost:3000/admin`:

1. **Add Jobs**: Jobs → Create New
2. **Edit Jobs**: Click any job to edit
3. **Manage Status**: Change job status to:
   - `active` - Visible on the site
   - `filled` - Job is filled (hidden)
   - `expired` - Job expired (hidden)
4. **Upload Images**: Add photos of the workplace

## Job Schema

Each job has the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | Text | Yes | Job title (e.g., "Bar Staff Needed") |
| jobType | Select | Yes | Type: bar, kitchen, delivery, etc. |
| description | Rich Text | Yes | Full job description |
| district | Select | Yes | Munich district |
| address | Text | No | Specific address |
| hourlyRate | Number | Yes | Hourly wage in € |
| hoursPerWeek | Text | Yes | e.g., "20-30" or "Flexible" |
| contactWhatsApp | Text | Yes | WhatsApp number with country code |
| contactEmail | Email | No | Alternative contact |
| image | Upload | No | Job/workplace photo |
| status | Select | Yes | active/filled/expired |
| expiresAt | Date | No | Auto-hide after this date |

## Deployment

### Option 1: Vercel (Recommended for Astro)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Important**: Set environment variables in Vercel dashboard

### Option 2: VPS (e.g., DigitalOcean, Hetzner)

1. Set up a VPS with Node.js and MongoDB
2. Clone the repo
3. Install dependencies
4. Set environment variables
5. Build: `npm run build`
6. Run with PM2 or similar:
```bash
# Install PM2
npm i -g pm2

# Start Astro
pm2 start npm --name "astro" -- run preview

# Start Payload
pm2 start npm --name "payload" -- run payload
```

### Database Hosting

For production, use:
- **MongoDB Atlas** (free tier available)
- **Dedicated MongoDB instance** on your VPS

## Customization

### Adding More Districts

Edit `src/payload.config.ts` in the `jobs` collection:

```typescript
{
  name: 'district',
  options: [
    // Add more districts here
    { label: 'Your District', value: 'your-district' },
  ],
}
```

### Adding Job Types

Similar to districts, edit the `jobType` field options.

### Changing Colors

Edit CSS variables in `src/layouts/BaseLayout.astro`:

```css
:root {
  --primary: #2563eb;      /* Main color */
  --primary-dark: #1d4ed8; /* Hover color */
  /* ... more colors */
}
```

### Multi-Language Support

To add German/English/other languages:

1. Install `astro-i18n` or similar
2. Create translated versions of pages
3. Add language switcher to header

## Future Enhancements

Potential features to add:

- [ ] User authentication for job seekers
- [ ] Application tracking for applicants
- [ ] Employer self-service job posting
- [ ] Email notifications
- [ ] Expand to other DACH cities
- [ ] Search functionality
- [ ] Job categories/tags
- [ ] Saved jobs/favorites
- [ ] Multi-language (DE/EN/TR/AR)

## Scaling to DACH Region

When ready to expand:

1. **Add City Field**: Include city selection in job schema
2. **Multi-City Filtering**: Add city dropdown to filters
3. **City-Specific Pages**: Create routes like `/munich`, `/berlin`
4. **Database Indexing**: Add indexes for city + district queries
5. **Consider Search**: Implement Meilisearch or Algolia for better search

## Troubleshooting

**Payload won't start**
- Check MongoDB is running: `brew services list`
- Verify MONGODB_URI in `.env`

**Astro shows error message**
- Make sure Payload is running on port 3000
- Check PAYLOAD_API_URL in `.env`

**No jobs showing**
- Create jobs in Payload admin
- Ensure job status is "active"
- Check browser console for errors

**Types not found**
- Run `npm run generate:types`
- Restart your editor

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ for the Munich community
