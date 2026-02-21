# Deployment Guide - Cybersecurity Awareness Website

## Quick Deployment with Railway.app (Recommended)

### Prerequisites
- GitHub account
- Your code pushed to GitHub ✅ (Already done!)

### Step-by-Step Deployment

#### 1. Go to Railway.app
- Visit https://railway.app
- Click "Start New Project"
- Sign in with GitHub

#### 2. Connect Your Repository
- Click "Deploy from GitHub"
- Authorize Railway to access your GitHub account
- Select: `Cybersecurity_Awareness_Website_Madzana_Keith`

#### 3. Configure Environment Variables
Railway will auto-detect your `docker-compose.yml`. Before deployment, add these environment variables:

In Railway dashboard, go to Variables:
```
FLASK_ENV=production
DATABASE_URL=postgresql://[auto-generated]
JWT_SECRET_KEY=your-secure-random-key-here
```

Railway auto-creates the PostgreSQL database, so `DATABASE_URL` will be provided.

#### 4. Deploy
- Click "Deploy"
- Wait 2-5 minutes for build and deployment
- Get your live URL: `https://your-app-name.railway.app`

#### 5. Test Your Deployment
- Visit your Railway URL
- Check if website loads
- Test API endpoints: `https://your-app-name.railway.app/api/auth/register`

---

## Alternative: Render.com

### Step-by-Step

1. **Go to render.com**
   - Sign up with GitHub

2. **Create Web Service**
   - New → Web Service
   - Connect GitHub repo
   - Select branch: `main`

3. **Configure Service**
   - Name: `cybersecurity-website`
   - Environment: `Docker`
   - Build Command: (leave default)
   - Start Command: `docker-compose up`

4. **Environment Variables**
   ```
   FLASK_ENV=production
   JWT_SECRET_KEY=your-secret-key
   DATABASE_URL=postgresql://...
   ```

5. **Deploy**
   - Click "Create Web Service"
   - View your site at: `https://cybersecurity-website.onrender.com`

---

## Using GitHub Pages (Frontend Only)

If you want to deploy just the frontend (no backend):

1. Create a `gh-pages` branch
2. Push only frontend files (HTML, CSS, JS)
3. Go to Settings → Pages
4. Select `gh-pages` branch
5. Your site will be at: `https://keithmadzana25-cmd.github.io/Cybersecurity_Awareness_Website_Madzana_Keith`

---

## Domain Setup (Optional)

### Add Custom Domain to Railway/Render
1. Buy domain from Namecheap, GoDaddy, or Google Domains
2. In Railway/Render dashboard → Settings
3. Add Custom Domain
4. Follow DNS configuration instructions
5. Wait 24 hours for DNS propagation

### Example Custom Domain Setup
- Domain: `cybersecurity-awareness.com`
- Point to: `your-app-name.railway.app`

---

## Security Checklist Before Going Live

- [ ] Change `JWT_SECRET_KEY` to a strong random string
- [ ] Use HTTPS (automatically enabled on Railway/Render)
- [ ] Set `FLASK_ENV=production`
- [ ] Update CORS settings for your domain
- [ ] Enable database backups
- [ ] Set strong PostgreSQL password
- [ ] Add rate limiting to API endpoints
- [ ] Enable logging/monitoring

---

## Monitoring Your Deployment

### Railway
- Dashboard → Deployments tab
- View logs in real-time
- Monitor CPU/memory usage

### Render
- Dashboard → Events tab
- View build/deployment logs
- Metrics available in dashboard

---

## Troubleshooting

### "CANNOT GET/" Error
- Ensure `backend/app/__init__.py` has the root route
- Check that frontend files are in repo root
- Verify Docker build logs

### Database Connection Error
- Check DATABASE_URL in environment variables
- Ensure PostgreSQL service is healthy
- Check database credentials

### Static Files Not Loading
- Verify `styles.css`, `script.js` exist in root
- Check Flask routing in `__init__.py`
- View network tab in browser DevTools

---

## Cost Comparison

| Service | Monthly Cost | Database | Notes |
|---------|-------------|----------|-------|
| Railway | Free tier + $5+ | Included | Easiest setup |
| Render | Free tier limited | Included | Good for startups |
| DigitalOcean | $12+ | $15+ | More control |
| Heroku | $50+ | $9+ | No longer free |
| AWS | Variable | Free 12mo | Enterprise scale |

---

## Next Steps

1. **Choose a service** (Railway recommended)
2. **Create an account**
3. **Connect your GitHub repo**
4. **Set environment variables**
5. **Deploy and test**
6. **Share your live link!**

Your live URL will follow this pattern:
```
https://your-project-name.railway.app
https://your-project-name.onrender.com
https://your-domain.com (with custom domain)
```

---

## Questions?

- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- Contact support on their platforms

**Good luck deploying! 🚀**
