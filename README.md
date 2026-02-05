# SignSpeak AI - Real-Time Sign Language Translation System

![SignSpeak AI](https://img.shields.io/badge/AI-Powered-blue) ![Flask](https://img.shields.io/badge/Flask-2.3.3-green) ![MediaPipe](https://img.shields.io/badge/MediaPipe-0.10.7-orange) ![Python](https://img.shields.io/badge/Python-3.x-yellow)

## 🎯 Overview

**SignSpeak AI** is a revolutionary real-time sign language translation system powered by artificial intelligence. The application uses computer vision and machine learning to detect hand gestures through a webcam, recognize sign language patterns, and translate them into text with multilingual support. This accessibility-first solution aims to break communication barriers for the deaf and hard-of-hearing community.

### Mission
To make technology accessible for everyone by providing seamless, real-time sign language translation that enables effective communication between sign language users and non-signers.

---

## ✨ Key Features

### 🎥 Real-Time Sign Language Detection
- **Live Video Processing**: Captures webcam feed at ~30 FPS for smooth detection
- **Hand Landmark Tracking**: Uses MediaPipe Holistic to track 21 landmarks on each hand (42 total)
- **Bilateral Detection**: Supports both left and right hand gesture recognition
- **Stability Algorithm**: Implements a stability threshold (5 consecutive frames) to prevent false positives
- **Visual Feedback**: Draws hand landmarks and connections on video feed in real-time

### 🌐 Multilingual Translation
- **Supported Languages**:
  - Hindi (हिंदी)
  - Kannada (ಕನ್ನಡ)
  - Malayalam (മലയാളം)
  - English (default)
- **Google Translate Integration**: Uses `googletrans` API for accurate translations
- **Text-to-Speech**: Automatic audio playback of detected signs and translations

### 🔐 User Authentication System
- **JWT-based Authentication**: Secure token-based authentication with 24-hour expiration
- **User Registration**: Create accounts with username/password
- **Login System**: Secure login with credential validation
- **Session Management**: Persistent sessions using localStorage
- **Protected Routes**: Detection features require authentication

### 💬 Feedback System
- **User Feedback Collection**: Allows users to submit feedback
- **Timestamped Entries**: Each feedback entry includes submission timestamp
- **JSON Storage**: Feedback stored in `feedback.json` for easy retrieval

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful frosted glass effect with backdrop blur
- **Gradient Animations**: Dynamic color gradients and smooth transitions
- **Responsive Layout**: Mobile-friendly design that adapts to all screen sizes
- **Animated Backgrounds**: Floating particle effects for visual appeal
- **Interactive Elements**: Hover effects, pulse animations, and loading states
- **Accessibility First**: High contrast, clear typography, and intuitive navigation

---

## 🏗️ Technical Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │   Home     │  │  Register  │  │   Login    │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│         │                │                │                  │
│         └────────────────┴────────────────┘                  │
│                          │                                   │
│                  ┌───────▼────────┐                         │
│                  │  Detection UI   │                         │
│                  │  (Protected)    │                         │
│                  └───────┬────────┘                         │
└──────────────────────────┼──────────────────────────────────┘
                           │
                  ┌────────▼────────┐
                  │  Flask Backend   │
                  │   (Python)       │
                  └────────┬────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
┌───────▼────────┐ ┌──────▼──────┐ ┌────────▼────────┐
│   MediaPipe    │ │  ML Model   │ │  Google Trans   │
│   Holistic     │ │  (Pickle)   │ │     API         │
└────────────────┘ └─────────────┘ └─────────────────┘
        │                  │                  │
        └──────────────────┴──────────────────┘
                           │
                  ┌────────▼────────┐
                  │  Video Stream   │
                  │  & Predictions  │
                  └─────────────────┘
```

### Data Flow

1. **Video Capture**: OpenCV captures webcam feed (640x480 resolution)
2. **Hand Detection**: MediaPipe processes each frame to detect hand landmarks
3. **Feature Extraction**: 168 features extracted (84 per hand: x, y, z, visibility × 21 landmarks)
4. **Prediction**: Trained ML model classifies the gesture
5. **Stability Check**: Prediction must be stable for 5+ frames
6. **Display**: Result shown on video feed and UI
7. **Translation**: User can translate detected text to selected language
8. **Audio Output**: Text-to-speech reads the result aloud

---

## 💻 Technology Stack

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Python** | 3.x | Core programming language |
| **Flask** | 2.3.3 | Web framework for REST API |
| **Flask-CORS** | 4.0.0 | Cross-Origin Resource Sharing support |
| **OpenCV** | 4.8.1.78 | Computer vision and video processing |
| **MediaPipe** | 0.10.7 | Hand landmark detection and tracking |
| **Pandas** | 2.1.4 | Data manipulation for ML predictions |
| **Scikit-learn** | 1.3.2 | Machine learning model framework |
| **NumPy** | 1.24.4 | Numerical computing for arrays |
| **PyJWT** | 2.8.0 | JSON Web Token authentication |
| **googletrans** | 4.0.0rc1 | Language translation API |
| **Pickle** | Built-in | Model serialization/deserialization |

### Frontend Technologies
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with animations
- **JavaScript (ES6+)**: Client-side interactivity
- **Jinja2**: Template engine for dynamic content
- **Web Speech API**: Text-to-speech functionality
- **Fetch API**: Asynchronous HTTP requests

### Machine Learning
- **Algorithm**: Classification model (likely Random Forest or SVM based on scikit-learn)
- **Input Features**: 168 features (84 per hand)
- **Output**: Sign language class prediction with confidence score
- **Model Format**: Serialized pickle file (`body_language.pkl`)

---

## 📦 System Requirements

### Hardware Requirements
- **Webcam**: Required for real-time sign detection
- **RAM**: Minimum 4GB (8GB recommended)
- **Processor**: Multi-core processor recommended for real-time processing
- **Storage**: ~500MB for dependencies and model

### Software Requirements
- **Operating System**: Windows, macOS, or Linux
- **Python**: Version 3.7 or higher
- **Browser**: Modern browser with WebRTC support (Chrome, Firefox, Edge)
- **Internet**: Required for translation API

---

## 🚀 Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/signspeak-ai.git
cd signspeak-ai
```

### Step 2: Create Virtual Environment
```bash
# Windows
python -m venv myenv
myenv\Scripts\activate

# macOS/Linux
python3 -m venv myenv
source myenv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Verify Model File
Ensure `body_language.pkl` is present in the project root directory.

### Step 5: Run the Application
```bash
python app.py
```

The application will start on `http://127.0.0.1:5000/`

---

## 📁 Project Structure

```
Signspeak-AI/
│
├── app.py                      # Main Flask application
├── body_language.pkl           # Trained ML model (1.7 MB)
├── requirements.txt            # Python dependencies
├── users.json                  # User credentials storage
├── feedback.json               # User feedback storage
│
├── templates/                  # HTML templates
│   ├── base.html              # Base template with styling
│   ├── home.html              # Landing page
│   ├── register.html          # User registration page
│   ├── login.html             # User login page
│   ├── detect.html            # Sign detection interface
│   └── feedback.html          # Feedback submission page
│
└── myenv/                     # Virtual environment (not in repo)
```

---

## ⚙️ Core Functionality

### 1. Sign Language Detection (`SignLanguageDetector` Class)

#### Initialization
```python
class SignLanguageDetector:
    def __init__(self):
        self.prev_prediction = ""
        self.stable_counter = 0
        self.STABILITY_THRESHOLD = 5
        self.holistic = mp_holistic.Holistic(
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
```

#### Detection Process
1. **Frame Conversion**: BGR → RGB for MediaPipe processing
2. **Landmark Detection**: Processes frame through MediaPipe Holistic
3. **Visualization**: Draws hand landmarks on the frame
4. **Feature Extraction**: 
   - Right hand: 84 features (21 landmarks × 4 values)
   - Left hand: 84 features (21 landmarks × 4 values)
   - Total: 168 features
5. **Prediction**: Model predicts sign class and confidence
6. **Stability Check**: Requires 5+ consecutive identical predictions
7. **Display**: Shows prediction on video frame

#### Key Parameters
- **Detection Confidence**: 0.5 (50% minimum confidence)
- **Tracking Confidence**: 0.5 (50% minimum confidence)
- **Stability Threshold**: 5 frames
- **Frame Rate**: ~30 FPS (33ms delay)

### 2. Authentication System

#### JWT Token Generation
```python
def generate_token(username):
    payload = {
        'username': username,
        'exp': datetime.utcnow() + timedelta(hours=24)
    }
    return jwt.encode(payload, app.secret_key, algorithm='HS256')
```

#### Features
- **Token Expiration**: 24 hours
- **Algorithm**: HS256 (HMAC with SHA-256)
- **Storage**: localStorage on client side
- **Validation**: Server-side token verification on protected routes

### 3. Translation System

#### Supported Language Codes
```python
lang_codes = {
    'hindi': 'hi',
    'kannada': 'kn',
    'malayalam': 'ml'
}
```

#### Translation Flow
1. User selects target language
2. Detected sign text sent to `/translate` endpoint
3. Google Translate API processes the text
4. Translated text returned to client
5. Text-to-speech reads the translation

### 4. Video Streaming

#### Multipart Stream
- **Format**: MJPEG (Motion JPEG)
- **Content-Type**: `multipart/x-mixed-replace`
- **Frame Rate**: ~30 FPS
- **Resolution**: 640×480 pixels
- **Encoding**: JPEG compression

---

## 🔌 API Endpoints

### Public Endpoints

#### `GET /`
- **Description**: Home page
- **Response**: HTML landing page
- **Authentication**: Not required

#### `GET /register`
- **Description**: User registration page
- **Response**: HTML registration form

#### `POST /register`
- **Description**: Create new user account
- **Request Body**:
  ```json
  {
    "username": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Registration successful"
  }
  ```

#### `GET /login`
- **Description**: User login page
- **Response**: HTML login form

#### `POST /login`
- **Description**: Authenticate user
- **Request Body**:
  ```json
  {
    "username": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
  ```

#### `GET /feedback`
- **Description**: Feedback submission page
- **Response**: HTML feedback form

#### `POST /feedback`
- **Description**: Submit user feedback
- **Request Body**:
  ```json
  {
    "feedback": "Great application!"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Feedback submitted successfully"
  }
  ```

### Protected Endpoints

#### `GET /detect`
- **Description**: Sign detection interface
- **Response**: HTML detection page
- **Authentication**: Required (JWT token)

#### `POST /start_detection`
- **Description**: Start webcam and detection
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Detection started"
  }
  ```

#### `POST /stop_detection`
- **Description**: Stop webcam and detection
- **Response**:
  ```json
  {
    "success": true,
    "message": "Detection stopped"
  }
  ```

#### `GET /video_feed`
- **Description**: MJPEG video stream
- **Response**: Multipart JPEG stream
- **Content-Type**: `multipart/x-mixed-replace; boundary=frame`

#### `GET /get_prediction`
- **Description**: Get current prediction
- **Response**:
  ```json
  {
    "prediction": "hello"
  }
  ```

#### `POST /translate`
- **Description**: Translate detected text
- **Request Body**:
  ```json
  {
    "text": "hello",
    "language": "hindi"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "translated_text": "नमस्ते",
    "original_text": "hello"
  }
  ```

---

## 🤖 Machine Learning Model

### Model Details
- **File**: `body_language.pkl` (1.7 MB)
- **Format**: Scikit-learn serialized model
- **Input Shape**: (1, 168) - Single sample with 168 features
- **Output**: Class label (sign name) + confidence scores

### Feature Engineering
Each hand provides 84 features:
- **21 landmarks** × **4 values** (x, y, z, visibility)
- **Total**: 168 features (84 right hand + 84 left hand)

### Landmark Indices (MediaPipe Hand)
```
0: WRIST
1-4: THUMB (CMC, MCP, IP, TIP)
5-8: INDEX (MCP, PIP, DIP, TIP)
9-12: MIDDLE (MCP, PIP, DIP, TIP)
13-16: RING (MCP, PIP, DIP, TIP)
17-20: PINKY (MCP, PIP, DIP, TIP)
```

### Prediction Process
1. Extract landmarks from MediaPipe
2. Flatten to 168-feature vector
3. Feed to model: `model.predict(X)`
4. Get confidence: `model.predict_proba(X)`
5. Apply stability threshold
6. Return prediction

---

## 🎨 Frontend Features

### Design Principles
- **Glassmorphism**: Frosted glass effect with `backdrop-filter: blur(20px)`
- **Gradient Backgrounds**: Multi-color gradients for visual appeal
- **Smooth Animations**: Fade-in, pulse, and hover effects
- **Responsive Grid**: Auto-fit layouts for all screen sizes

### Key UI Components

#### 1. Navigation Bar
- Fixed position with blur effect
- Gradient logo text
- Hover animations with shimmer effect
- Responsive mobile menu

#### 2. Feature Cards
- Grid layout (3 columns on desktop)
- Icon gradients (blue, purple, green)
- Hover lift effect (translateY -10px)
- Shadow depth on interaction

#### 3. Video Container
- Centered video feed
- Rounded corners (15px)
- Placeholder when inactive
- Real-time landmark overlay

#### 4. Detection Results
- Two-column grid (Detected Sign | Translation)
- Large gradient text display
- Real-time updates (100ms polling)
- Text-to-speech integration

#### 5. Control Buttons
- Gradient backgrounds
- Shimmer hover effect
- Loading spinner states
- Disabled state styling

### Animations
```css
/* Fade In */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Pulse */
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

/* Float */
@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
}
```

---

## 🔒 Security Features

### 1. JWT Authentication
- **Algorithm**: HS256 (HMAC with SHA-256)
- **Expiration**: 24 hours
- **Secret Key**: Configurable in `app.secret_key`
- **Token Storage**: Client-side localStorage

### 2. Password Storage
- **Current**: Plain text in JSON (⚠️ **Not production-ready**)
- **Recommendation**: Use bcrypt or argon2 for hashing

### 3. CORS Protection
- **Enabled**: Flask-CORS for cross-origin requests
- **Configuration**: Default settings (allow all origins)

### 4. Route Protection
- **Detection Routes**: Require valid JWT token
- **Token Validation**: Server-side verification
- **Unauthorized Access**: Redirects to login

### ⚠️ Security Recommendations for Production
1. **Hash Passwords**: Use bcrypt/argon2 instead of plain text
2. **HTTPS**: Enable SSL/TLS encryption
3. **Environment Variables**: Store secret keys in `.env` file
4. **Rate Limiting**: Prevent brute force attacks
5. **Input Validation**: Sanitize all user inputs
6. **Database**: Use PostgreSQL/MySQL instead of JSON files
7. **CORS**: Restrict to specific domains

---

## 📖 Usage Guide

### For End Users

#### Step 1: Register an Account
1. Navigate to `http://localhost:5000/register`
2. Enter username (email) and password
3. Click "Register"

#### Step 2: Login
1. Go to `http://localhost:5000/login`
2. Enter credentials
3. Click "Login" (token stored automatically)

#### Step 3: Start Detection
1. Click "Get Started" or navigate to `/detect`
2. Allow camera permissions when prompted
3. Click "Start Detection"
4. Wait for camera feed to appear

#### Step 4: Perform Signs
1. Position hands in camera view
2. Make clear, deliberate gestures
3. Hold gesture for ~1 second (5 frames)
4. Watch for detection in "Detected Sign" box

#### Step 5: Translate
1. Select target language (Hindi/Kannada/Malayalam)
2. Click "Translate" button
3. View translation in "Translation" box
4. Listen to audio pronunciation

#### Step 6: Stop Detection
1. Click "Stop Detection" when finished
2. Camera will be released

### For Developers

#### Adding New Signs
1. Collect training data for new sign
2. Retrain model with new class
3. Save updated `body_language.pkl`
4. No code changes needed

#### Customizing Languages
Edit `lang_codes` in `app.py`:
```python
lang_codes = {
    'hindi': 'hi',
    'kannada': 'kn',
    'malayalam': 'ml',
    'japanese': 'ja',  # Add new language
    'spanish': 'es'
}
```

Update `detect.html` dropdown:
```html
<option value="japanese">🇯🇵 Japanese</option>
<option value="spanish">🇪🇸 Spanish</option>
```

#### Adjusting Detection Sensitivity
Modify in `app.py`:
```python
# Increase for more stable predictions (slower)
self.STABILITY_THRESHOLD = 10

# Decrease for faster predictions (less stable)
self.STABILITY_THRESHOLD = 3

# Adjust confidence thresholds
self.holistic = mp_holistic.Holistic(
    min_detection_confidence=0.7,  # Higher = more strict
    min_tracking_confidence=0.7
)
```

---

## ⚙️ Configuration

### Application Settings
Edit `app.py`:
```python
# Secret key for JWT
app.secret_key = 'your-secret-key-here'  # Change in production!

# Camera settings
camera.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

# Frame rate
time.sleep(0.03)  # ~30 FPS (adjust for performance)
```

### Model Configuration
```python
# Detection confidence (0.0 - 1.0)
min_detection_confidence = 0.5

# Tracking confidence (0.0 - 1.0)
min_tracking_confidence = 0.5

# Stability threshold (frames)
STABILITY_THRESHOLD = 5
```

### File Paths
```python
USERS_FILE = 'users.json'
FEEDBACK_FILE = 'feedback.json'
MODEL_FILE = 'body_language.pkl'
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Camera Not Working
**Problem**: "Failed to start detection"
**Solutions**:
- Check camera permissions in browser
- Ensure no other app is using the camera
- Try different camera index: `cv2.VideoCapture(1)` instead of `0`
- On Windows, use DirectShow: `cv2.VideoCapture(0, cv2.CAP_DSHOW)`

#### 2. Model Not Found
**Problem**: "Model not found" error
**Solutions**:
- Verify `body_language.pkl` exists in project root
- Check file permissions
- Re-download or retrain the model

#### 3. Translation Fails
**Problem**: "Translation failed" error
**Solutions**:
- Check internet connection
- Verify `googletrans` version: `pip install googletrans==4.0.0rc1`
- Try alternative translation API if Google blocks requests

#### 4. Poor Detection Accuracy
**Problem**: Incorrect or no predictions
**Solutions**:
- Ensure good lighting conditions
- Position hands clearly in frame
- Hold gestures steady for 1-2 seconds
- Adjust `STABILITY_THRESHOLD` in code
- Retrain model with more data

#### 5. Slow Performance
**Problem**: Laggy video feed
**Solutions**:
- Reduce frame rate: `time.sleep(0.05)` for 20 FPS
- Lower camera resolution: `640×480` → `320×240`
- Close other applications
- Use GPU acceleration if available

#### 6. Login Issues
**Problem**: "Invalid credentials" despite correct password
**Solutions**:
- Check `users.json` file exists
- Verify username matches exactly (case-sensitive)
- Clear browser localStorage and re-login

---

## 🚀 Future Enhancements

### Planned Features
- [ ] **Database Integration**: Replace JSON with PostgreSQL/MongoDB
- [ ] **Password Hashing**: Implement bcrypt for secure password storage
- [ ] **More Languages**: Add support for 50+ languages
- [ ] **Sign Library**: Visual dictionary of all supported signs
- [ ] **Sentence Formation**: Combine multiple signs into sentences
- [ ] **User Profiles**: Save detection history and preferences
- [ ] **Mobile App**: React Native or Flutter mobile version
- [ ] **Offline Mode**: Local translation without internet
- [ ] **Custom Signs**: Allow users to train custom gestures
- [ ] **Video Upload**: Detect signs from uploaded videos
- [ ] **Real-time Collaboration**: Multi-user video chat with translation
- [ ] **Analytics Dashboard**: Usage statistics and accuracy metrics
- [ ] **API Access**: RESTful API for third-party integration
- [ ] **Dark/Light Mode**: Theme customization
- [ ] **Accessibility**: Screen reader support, keyboard navigation

### Technical Improvements
- [ ] **Model Optimization**: TensorFlow Lite for faster inference
- [ ] **GPU Acceleration**: CUDA support for real-time processing
- [ ] **WebRTC**: Peer-to-peer video streaming
- [ ] **Docker**: Containerization for easy deployment
- [ ] **CI/CD**: Automated testing and deployment pipeline
- [ ] **Load Balancing**: Handle multiple concurrent users
- [ ] **Caching**: Redis for session and prediction caching
- [ ] **Logging**: Structured logging with ELK stack
- [ ] **Monitoring**: Prometheus + Grafana for metrics

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Reporting Bugs
1. Check existing issues first
2. Create detailed bug report with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/videos
   - System information

### Suggesting Features
1. Open an issue with `[Feature Request]` tag
2. Describe the feature and use case
3. Explain expected behavior

### Code Contributions
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and test thoroughly
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open Pull Request

### Development Guidelines
- Follow PEP 8 style guide for Python
- Add comments for complex logic
- Update documentation for new features
- Write unit tests for new functionality
- Ensure all tests pass before submitting PR

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Development Team**: SignSpeak AI Contributors
- **Contact**: [Your Email/GitHub]

---

## 🙏 Acknowledgments

- **MediaPipe**: Google's ML framework for hand tracking
- **Flask**: Lightweight web framework
- **OpenCV**: Computer vision library
- **Scikit-learn**: Machine learning framework
- **Google Translate**: Translation API
- **Community**: All contributors and users

---

## 📞 Support

For support, please:
- Open an issue on GitHub
- Email: support@signspeak-ai.com (if applicable)
- Join our Discord community (if applicable)

---

## 📊 Project Statistics

- **Lines of Code**: ~1,500+
- **Languages**: Python, JavaScript, HTML, CSS
- **Dependencies**: 11 Python packages
- **Model Size**: 1.7 MB
- **Supported Signs**: [Number depends on trained model]
- **Translation Languages**: 3 (Hindi, Kannada, Malayalam)

---

**Made with ❤️ for the deaf and hard-of-hearing community**

*Breaking barriers, one sign at a time.*
