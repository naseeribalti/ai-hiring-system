const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    user_type: {
      type: String,
      enum: ['job_seeker', 'recruiter', 'admin'],
      required: true,
    },
    profile: {
      first_name: String,
      last_name: String,
      phone: String,
      avatar: String,
      bio: String,
      location: {
        city: String,
        country: String,
      },
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active',
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    last_login: Date,
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
userSchema.index({ unique: true}); 
userSchema.index({ user_type: 1 });
userSchema.index({ 'profile.location.city': 1 });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update last login method
userSchema.methods.updateLastLogin = function () {
  this.last_login = new Date();
  return this.save();
};

module.exports = mongoose.model('User', userSchema);