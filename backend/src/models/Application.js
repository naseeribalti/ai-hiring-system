const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// --- Application Schema Definition ---
// This schema tracks every single job application.
const applicationSchema = new Schema(
  {
    // The job being applied for.
    job_id: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    // The job seeker who is applying.
    applicant_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // The specific resume used for this application.
    resume_id: {
      type: Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
    },
    // The recruiter who owns the job post.
    recruiter_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // The current status of the application.
    status: {
      type: String,
      enum: [
        'submitted', // Initial status when user applies
        'in_review', // Recruiter is looking at it
        'shortlisted', // Recruiter is interested
        'interview_scheduled', // Interview is set
        'rejected', // Not selected
        'hired', // Got the job!
      ],
      default: 'submitted',
    },
    // The matching score given by your AI when the user applied.
    ai_match_score: {
      type: Number,
      default: 0,
    },
    // A log of all status changes.
    status_history: [
      {
        status: String,
        changed_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    // Adds 'createdAt' and 'updatedAt'. 'createdAt' is the application date.
    timestamps: true,
  }
);

// --- Indexes ---
// Helps find all applications for a specific job.
applicationSchema.index({ job_id: 1 });

// Helps find all applications from a specific user.
applicationSchema.index({ applicant_id: 1 });

// Helps recruiters find all applications they have received.
applicationSchema.index({ recruiter_id: 1 });

// --- Middleware ---
// Before saving, log the initial status to the history.
applicationSchema.pre('save', function (next) {
  // Only add to history if the status is new or modified.
  if (this.isNew || this.isModified('status')) {
    this.status_history.push({ status: this.get('status') });
  }
  next();
});

// --- Model Export ---
module.exports = mongoose.model('Application', applicationSchema);