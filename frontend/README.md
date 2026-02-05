# SignSpeak AI - Frontend

Modern, production-ready React frontend for SignSpeak AI - Real-time Sign Language Translation System.

## 🚀 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=SignSpeak AI
```

### Backend Integration

The frontend expects the Flask backend to be running on `http://localhost:5000`. Make sure the backend is started before using the detection features.

## 🎨 Design Features

- **Glassmorphism UI** - Frosted glass effects with backdrop blur
- **Dark Theme** - Modern dark color scheme with warm accents
- **Gradient Accents** - Orange/coral gradient for CTAs and highlights
- **Smooth Animations** - Framer Motion for page transitions and micro-interactions
- **Responsive Design** - Mobile-first approach with breakpoints for all devices
- **Animated Background** - Floating orbs and grid overlay

## 📱 Pages

1. **Landing** - Hero section, features, how it works
2. **Login** - JWT authentication
3. **Register** - User registration with validation
4. **Detection** (Protected) - Real-time sign language detection dashboard
5. **Feedback** - User feedback submission

## 🔐 Authentication

- JWT token-based authentication
- Tokens stored in localStorage
- Protected routes redirect to login
- Auto-logout on token expiration

## 🎯 Key Features

### Real-Time Detection
- Live webcam feed streaming
- Prediction polling every 100ms
- Animated prediction updates
- Text-to-speech for predictions

### Translation
- Support for Hindi, Kannada, Malayalam
- Google Translate API integration
- Audio playback of translations

### UI/UX
- Smooth page transitions
- Loading states and skeletons
- Error handling with toast notifications
- Hover effects and micro-interactions

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components
│   ├── AnimatedBackground.jsx
│   └── ProtectedRoute.jsx
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── services/            # API service layer
├── context/             # React context providers
├── utils/               # Constants and utilities
├── App.jsx              # Main app component
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## 🚀 Deployment

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Render / Railway

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

## 🔗 API Endpoints

The frontend connects to these backend endpoints:

- `POST /register` - User registration
- `POST /login` - User authentication
- `POST /start_detection` - Start webcam detection
- `POST /stop_detection` - Stop detection
- `GET /video_feed` - MJPEG video stream
- `GET /get_prediction` - Get current prediction
- `POST /translate` - Translate text
- `POST /feedback` - Submit feedback

## 🎨 Color Palette

```css
Primary: #ff6b4a (Orange/Coral)
Dark: #0a0a0a - #2d1515
Background: Gradient with animated orbs
Text: #ffffff with opacity variants
```

## 📝 License

MIT

---

**Built with ❤️ for the deaf and hard-of-hearing community**
