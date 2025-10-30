const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/connection');
const connectCloudinary = require('./src/config/cloudinary');
const cors = require('cors');
const helmet = require('helmet');
const { apiLimiter } = require('./src/middleware/rateLimit.middleware');
const { notFound, errorHandler } = require('./src/middleware/errorHandler.middleware');

// Import routes
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const jobRoutes = require('./src/routes/job.routes');
const resumeRoutes = require('./src/routes/resume.routes');
const applicationRoutes = require('./src/routes/application.routes');

// Load environment variables from .env file
dotenv.config();

// Validate required environment variables
(() => {
  const required = ['MONGO_URI', 'JWT_SECRET'];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }
})();

// Connect to MongoDB
connectDB();

// Connect to Cloudinary
connectCloudinary();

const app = express();

// Trust proxy (needed if behind a reverse proxy/load balancer)
app.set('trust proxy', 1);

// --- Security & Core Middlewares ---
app.use(helmet());

// CORS allowlist via env var CORS_ORIGINS (comma-separated)
const rawCorsOrigins = process.env.CORS_ORIGINS || 'http://localhost:5173';
const allowedOrigins = rawCorsOrigins
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow same-origin/no-origin (like curl or mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '1mb' }));

// --- API Routes ---
// ... (rest of your routes)
app.get('/', (req, res) => {
  res.send('AI Hiring System API is running...');
});

// Rate limit all API routes
app.use('/api', apiLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/applications', applicationRoutes);

// 404 handler and centralized error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});