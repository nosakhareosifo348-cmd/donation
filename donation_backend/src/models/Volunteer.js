const mongoose = require('mongoose')

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  interest: { type: String, enum: ['Education', 'Healthcare', 'Food', 'Shelter', 'Administration', 'Other'], required: true },
  availability: { type: String, enum: ['Weekdays', 'Weekends', 'Both', 'Flexible'], required: true },
  message: { type: String, trim: true },
  status: { type: String, enum: ['pending', 'approved', 'declined'], default: 'pending' },
}, { timestamps: true })

volunteerSchema.index({ status: 1 })
module.exports = mongoose.model('Volunteer', volunteerSchema)
