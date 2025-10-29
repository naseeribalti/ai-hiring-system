const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// --- Resume Schema Definition ---
// This schema will store all resumes for job seekers.
const resumeSchema = new Schema(
  {
    // This links the resume to the user who uploaded it.
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // The original file name, like 'my_cv_final.pdf'.
    file_name: {
      type: String,
      required: true,
    },
    // The URL from Cloudinary or AWS S3 where the file is saved[cite: 79, 180].
    file_url: {
      type: String,
      required: true,
    },
    // To track the AI parser's progress.
    parsing_status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    // How sure the AI is about the parsing (e.g., 90%)[cite: 141, 155].
    confidence_score: {
      type: Number,
      default: 0,
    },
    // --- Parsed Data ---
    // This is the main part. All AI-extracted data will be stored here[cite: 141, 155].
    parsed_data: {
      contact: {
        name: String,
        email: String,
        phone: String,
      },
      skills: [String],
      experience: [
        {
          title: String,
          company: String,
          duration: String,
        },
      ],
      education: [
        {
          degree: String,
          institution: String,
          year: String,
        },
      ],
      summary: String,
    },
  },
  {
    // This adds 'createdAt' and 'updatedAt' fields.
    timestamps: true,
  }
);

// --- Indexes ---
// This index helps find all resumes for a specific user quickly.
resumeSchema.index({ user_id: 1 });

// --- Model Export ---
// We export the 'Resume' model to be used in other parts of our app.
module.exports = mongoose.model('Resume', resumeSchema);