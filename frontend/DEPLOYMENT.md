# SignSpeak AI - Deployment Guide

## 🚀 Deploying the Frontend

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

4. **Set Environment Variables** (in Vercel Dashboard)
   - `VITE_API_BASE_URL` - Your backend API URL
   - `VITE_APP_NAME` - SignSpeak AI

5. **Production Deployment**
   ```bash
   vercel --prod
   ```

### Option 2: Render

1. **Create New Static Site** on Render dashboard

2. **Connect GitHub Repository**

3. **Configure Build Settings**
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`

4. **Add Environment Variables**
   - `VITE_API_BASE_URL`
   - `VITE_APP_NAME`

5. **Deploy**

### Option 3: Railway

1. **Create New Project** on Railway

2. **Connect Repository**

3. **Configure**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Start Command: `npm run preview`

4. **Add Environment Variables**

5. **Deploy**

### Option 4: Netlify

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

---

## 🔧 Backend Deployment

### Flask Backend on Render

1. **Create New Web Service**

2. **Configure**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`

3. **Add Environment Variables**
   - `FLASK_ENV=production`
   - `SECRET_KEY=your-secret-key`

4. **Install Gunicorn**
   Add to `requirements.txt`:
   ```
   gunicorn==21.2.0
   ```

### Flask Backend on Railway

1. **Create New Project**

2. **Connect Repository**

3. **Configure**
   - Start Command: `python app.py`

4. **Add Environment Variables**

---

## 🔗 Connecting Frontend to Backend

After deploying both:

1. **Update Frontend Environment Variable**
   ```env
   VITE_API_BASE_URL=https://your-backend-url.com
   ```

2. **Update Flask CORS Settings**
   In `app.py`:
   ```python
   CORS(app, origins=['https://your-frontend-url.com'])
   ```

3. **Redeploy Both Services**

---

## ✅ Pre-Deployment Checklist

### Frontend
- [ ] Update `VITE_API_BASE_URL` to production backend URL
- [ ] Test production build locally: `npm run build && npm run preview`
- [ ] Verify all routes work
- [ ] Test on mobile devices
- [ ] Check browser console for errors

### Backend
- [ ] Update `app.secret_key` to strong random value
- [ ] Enable CORS for production frontend URL
- [ ] Test all API endpoints
- [ ] Verify model file (`body_language.pkl`) is included
- [ ] Check camera permissions work

---

## 🧪 Testing Production Build Locally

### Frontend
```bash
cd frontend
npm run build
npm run preview
```
Visit `http://localhost:4173`

### Backend
```bash
python app.py
```
Visit `http://localhost:5000`

---

## 📊 Performance Optimization

### Frontend
- Lazy load routes
- Optimize images
- Enable compression
- Use CDN for static assets

### Backend
- Use production WSGI server (Gunicorn)
- Enable caching
- Optimize video streaming
- Use environment variables for secrets

---

## 🐛 Troubleshooting

### Issue: CORS Errors
**Solution**: Update Flask CORS settings with frontend URL

### Issue: 404 on Page Refresh
**Solution**: Ensure `vercel.json` rewrites are configured

### Issue: Video Feed Not Loading
**Solution**: Check backend URL and camera permissions

### Issue: Slow Prediction Updates
**Solution**: Reduce polling interval or optimize backend

---

## 📝 Environment Variables Reference

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=SignSpeak AI
```

### Backend
```env
FLASK_ENV=production
SECRET_KEY=your-secret-key-here
PORT=5000
```

---

## 🔒 Security Recommendations

1. **Use HTTPS** for both frontend and backend
2. **Secure API Keys** - Never commit to Git
3. **Rate Limiting** - Prevent abuse
4. **Input Validation** - Sanitize all inputs
5. **JWT Expiration** - Keep tokens short-lived
6. **CORS** - Restrict to specific origins

---

**Ready to deploy! 🚀**
