const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/connection');
const connectCloudinary = require('./src/config/cloudinary');
const cors = require('cors'); // <-- ADD THIS LINE

// Import routes
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const jobRoutes = require('./src/routes/job.routes');
const resumeRoutes = require('./src/routes/resume.routes');
const applicationRoutes = require('./src/routes/application.routes');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Connect to Cloudinary
connectCloudinary();

const app = express();

// --- Middlewares ---
app.use(cors()); // <-- ADD THIS LINE
app.use(express.json());

// --- API Routes ---
// ... (rest of your routes)
app.get('/', (req, res) => {
  res.send('AI Hiring System API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/applications', applicationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});