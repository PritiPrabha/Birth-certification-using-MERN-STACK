const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  childName: {
    type: String,
    required: true,
  },
  childDOB: {
    type: Date,
    required: true,
  },
  placeOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  weight: {
    type: Number,
  },
  cityOfBirth: {
    type: String,
  },
  stateOfBirth: {
    type: String,
  },
  countryOfBirth: {
    type: String,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherDOB: {
    type: Date,
  },
  motherNationality: {
    type: String,
  },
  motherIDNumber: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  fatherDOB: {
    type: Date,
  },
  fatherNationality: {
    type: String,
  },
  fatherIDNumber: {
    type: String,
  },
  contactEmail: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  residentialAddress: {
    type: String,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'approved', 'rejected', 'requires-more-info'],
    default: 'pending',
  },
  reviewNotes: {
    type: String,
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  digitalSignature: {
    type: String,
  },
  verificationDate: {
    type: Date,
  },
  documents: [
    {
      docId: {
        type: String,
        required: true,
      },
      fileName: String,
      filePath: String,
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  certificateId: {
    type: String,
    unique: true,
    sparse: true,
  },
  dateOfIssue: {
    type: Date,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Application', ApplicationSchema);
