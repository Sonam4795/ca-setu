import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    icaiRegistrationNumber: {
      type: String,
      trim: true,
      uppercase: true,
    },
    caStage: {
      type: String,
      enum: ['Inter', 'Final', 'Qualified'],
      default: 'Inter',
      required: true,
    },
    groupsCleared: {
      type: String,
      enum: ['Both Groups', 'Group 1 Only', 'Group 2 Only'],
      default: 'Both Groups',
      required: true,
    },
    attemptsCount: {
      type: Number,
      default: 1,
      min: 1,
    },
    passingYearMonth: String,
    articleshipEligibilityDate: Date,
    city: {
      type: String,
      default: 'Mumbai',
    },
    preferredCities: [String],
    preferredDomains: [String],
    preferredWorkMode: {
      type: String,
      enum: ['On-site', 'Hybrid', 'Remote'],
      default: 'Hybrid',
    },
    resumeUrl: String,
    resumeFileName: String,
    bio: String,
    skills: [String],
    linkedin: String,
  },
  {
    timestamps: true,
  }
);

export const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);
