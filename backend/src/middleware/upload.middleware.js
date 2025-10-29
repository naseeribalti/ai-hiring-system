const multer = require('multer');

// We use 'memoryStorage' to hold the file in buffer (RAM) temporarily
// This is efficient because we send it directly to Cloudinary
const storage = multer.memoryStorage();

// Configure multer
const upload = multer({
  storage: storage,
  // Add file filtering
  fileFilter: (req, file, cb) => {
    // We only want to accept resume-like files
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' || // .doc
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX are allowed.'), false);
    }
  },
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
});

// This will catch a single file with the field name 'resume'
const uploadResume = upload.single('resume');

module.exports = { uploadResume };