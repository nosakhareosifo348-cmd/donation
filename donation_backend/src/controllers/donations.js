const Donation = require('../models/Donation')

async function createDonation(req, res, next) {
  try {
    const { name, email, address, amount, currency, message } = req.body
    const donation = await Donation.create({ name, email, address, amount, currency, message })
    res.status(201).json({ success: true, message: 'Donation received. Thank you!', data: donation })
  } catch (err) { next(err) }
}

async function getDonations(req, res, next) {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const filter = status ? { status } : {}
    const [donations, total] = await Promise.all([
      Donation.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(+limit),
      Donation.countDocuments(filter),
    ])
    res.json({ success: true, data: donations, pagination: { total, page: +page, limit: +limit, pages: Math.ceil(total / limit) } })
  } catch (err) { next(err) }
}

async function getDonationStats(req, res, next) {
  try {
    const [agg, total, completed] = await Promise.all([
      Donation.aggregate([{ $match: { status: 'COMPLETED' } }, { $group: { _id: null, sum: { $sum: '$amount' } } }]),
      Donation.countDocuments(),
      Donation.countDocuments({ status: 'COMPLETED' }),
    ])
    res.json({ success: true, data: { totalRaised: agg[0]?.sum || 0, totalDonations: total, completedDonations: completed } })
  } catch (err) { next(err) }
}

async function getDonationById(req, res, next) {
  try {
    const donation = await Donation.findById(req.params.id)
    if (!donation) return res.status(404).json({ success: false, error: 'Donation not found' })
    res.json({ success: true, data: donation })
  } catch (err) { next(err) }
}

async function updateDonationStatus(req, res, next) {
  try {
    const { status, reference } = req.body
    const donation = await Donation.findByIdAndUpdate(req.params.id, { status, ...(reference && { reference }) }, { new: true })
    if (!donation) return res.status(404).json({ success: false, error: 'Donation not found' })
    res.json({ success: true, data: donation })
  } catch (err) { next(err) }
}

module.exports = { createDonation, getDonations, getDonationStats, getDonationById, updateDonationStatus }
