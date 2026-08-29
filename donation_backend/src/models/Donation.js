const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  address: { type: String, trim: true },
  amount: { type: Number, required: true, min: 1 },
  currency: { type: String, default: 'USD', enum: ['USD', 'EUR', 'GBP', 'NGN'] },
  message: { type: String, trim: true, maxlength: 1000 },
  status: { type: String, enum: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'], default: 'PENDING' },
  reference: { type: String, unique: true, sparse: true },
}, { timestamps: true })

donationSchema.index({ email: 1 })
donationSchema.index({ status: 1 })

module.exports = mongoose.model('Donation', donationSchema)
