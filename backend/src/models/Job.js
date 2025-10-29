const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// --- Job Schema Definition ---
// Yeh hamara 'Job' model ka structure hai.
const jobSchema = new Schema(
  {
    job_title: {
      type: String,
      required: [true, 'Job title laazmi hai'],
      trim: true,
    },
    job_description: {
      type: String,
      required: [true, 'Job description laazmi hai'],
      trim: true,
    },
    // Yeh woh recruiter hai jo job post kar raha hai. [cite: 328]
    // Humne 'ref' istemal kiya hai taake yeh 'User' model se link hojaye.
    recruiter_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    company_name: {
      type: String,
      required: [true, 'Company ka naam laazmi hai'],
    },
    location: {
      // Bilkul aapke User schema ke 'profile.location' jaisa.
      city: String,
      country: String,
      job_type: {
        type: String,
        enum: ['on_site', 'remote', 'hybrid'],
        default: 'on_site',
      },
    },
    salary_range: {
      // Yeh 'salary_range' ka JSON object hai. [cite: 332]
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'PKR',
      },
      period: {
        type: String,
        enum: ['per_hour', 'per_month', 'per_year'],
        default: 'per_month',
      },
    },
    requirements: {
      // Yeh 'requirements' ka JSON object hai. [cite: 330]
      // Yeh skills matching ke liye bohat zaroori hain. [cite: 258]
      required_skills: [
        {
          type: String,
          trim: true,
          lowercase: true,
        },
      ],
      experience_level: {
        type: String,
        enum: ['entry', 'mid', 'senior', 'executive'],
      },
      education_level: String,
    },
    status: {
      // Yeh job ka status hai, jaisa SRS mein likha hai. [cite: 333]
      type: String,
      enum: ['draft', 'pending', 'active', 'closed'],
      default: 'draft',
    },
    // Yeh un job_seekers ki list hai jo iss job pe apply karenge.
    applicants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    // Yeh 'createdAt' (created_date) aur 'updatedAt' fields add kardega. [cite: 333]
    timestamps: true,
  }
);

// --- Indexes ---
// Indexes database se data tezi se search karne mein madad dete hain.

// Job title aur description se text search ke liye.
jobSchema.index({ job_title: 'text', job_description: 'text' });

// Location se filter karne ke liye.
jobSchema.index({ 'location.city': 1, 'location.job_type': 1 });

// Skills se filter karne ke liye.
jobSchema.index({ 'requirements.required_skills': 1 });

// Recruiter ki tamam jobs dhoondne ke liye.
jobSchema.index({ recruiter_id: 1 });

// --- Methods ---
// Yeh custom functions hain jo har 'Job' document ke saath available honge.

/**
 * Naya applicant add karta hai job ki 'applicants' array mein.
 * @param {string} userId - Job seeker ki ID jo apply kar raha hai.
 */
jobSchema.methods.addApplicant = function (userId) {
  // Check karein ke user pehle se applied toh nahi.
  if (!this.applicants.includes(userId)) {
    this.applicants.push(userId);
  }
  // Document ko save karein.
  return this.save();
};

/**
 * Job ka status update karta hai (e.g., 'active' se 'closed').
 * @param {string} newStatus - Naya status ('draft', 'pending', 'active', 'closed').
 */
jobSchema.methods.updateStatus = function (newStatus) {
  this.status = newStatus;
  return this.save();
};

// --- Model Export ---
// Hum 'Job' model ko export kar rahe hain taake app mein use kar sakein.
module.exports = mongoose.model('Job', jobSchema);