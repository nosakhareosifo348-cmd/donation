const mongoose = require('mongoose')

// Singleton — only one settings document ever exists
const settingsSchema = new mongoose.Schema({
  phone: { type: String, default: '+1 (800) 123-4567' },
  email: { type: String, default: 'info@givehope.it.com' },
  address: { type: String, default: '123 Charity Lane, Suite 100, New York, NY 10001, USA' },
  btcAddress: { type: String, default: '' },
  ethAddress: { type: String, default: '' },
  usdtAddress: { type: String, default: '' },
  facebookUrl: { type: String, default: '' },
  telegramUrl: { type: String, default: '' },
  instagramUrl: { type: String, default: '' },
}, { timestamps: true })

module.exports = mongoose.model('Settings', settingsSchema)
