# Deployment Guide

## Quick Start (Local Development)

1. **Run the development script:**
   ```bash
   # On Windows
   start-dev.bat
   
   # Or manually:
   # Terminal 1: cd backend && npm run dev
   # Terminal 2: cd frontend && npm start
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Production Deployment

### Backend Deployment (Render)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Go to [render.com](https://render.com)
   - Connect your GitHub repository
   - Create a new Web Service
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Set environment: Node
   - Deploy

3. **Note your backend URL** (e.g., `https://your-app.onrender.com`)

### Frontend Deployment (Vercel)

1. **Update environment variable:**
   - Create `.env` file in frontend folder:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set framework preset: "Create React App"
   - Add environment variable: `REACT_APP_API_URL=your-backend-url`
   - Deploy

## Testing Checklist

- [ ] Submit feedback form works
- [ ] Feedback appears in table
- [ ] Analytics cards update correctly
- [ ] Form validation works (empty name/message)
- [ ] Rating dropdown functions
- [ ] Responsive design on mobile

## API Testing

Test your deployed backend:

```bash
# Test POST endpoint
curl -X POST https://your-backend-url.onrender.com/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Great app!","rating":5}'

# Test GET endpoints
curl https://your-backend-url.onrender.com/api/feedback
curl https://your-backend-url.onrender.com/api/stats
```

## Troubleshooting

- **CORS Issues**: Ensure backend has proper CORS configuration
- **Database Issues**: SQLite file is created automatically on first run
- **Environment Variables**: Double-check API URL in frontend .env
- **Build Failures**: Check Node.js version compatibility