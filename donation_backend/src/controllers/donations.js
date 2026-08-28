const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// POST /api/donations — create a new donation
async function createDonation(req, res, next) {
  try {
    const { name, email, address, amount, currency, message } = req.body

    const donation = await prisma.donation.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        address: address?.trim() || null,
        amount: parseFloat(amount),
        currency: currency || 'USD',
        message: message?.trim() || null,
        status: 'PENDING',
      },
    })

    res.status(201).json({
      success: true,
      message: 'Donation received. Thank you for your generosity!',
      data: donation,
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/donations — list all donations (admin)
async function getDonations(req, res, next) {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const skip = (parseInt(page) - 1) * parseInt(limit)

    const where = status ? { status } : {}

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.donation.count({ where }),
    ])

    res.json({
      success: true,
      data: donations,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/donations/stats — total raised, count, etc.
async function getDonationStats(req, res, next) {
  try {
    const [total, count, completed] = await Promise.all([
      prisma.donation.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amount: true },
      }),
      prisma.donation.count(),
      prisma.donation.count({ where: { status: 'COMPLETED' } }),
    ])

    res.json({
      success: true,
      data: {
        totalRaised: total._sum.amount || 0,
        totalDonations: count,
        completedDonations: completed,
      },
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/donations/:id — get single donation
async function getDonationById(req, res, next) {
  try {
    const donation = await prisma.donation.findUnique({
      where: { id: req.params.id },
    })

    if (!donation) {
      return res.status(404).json({ success: false, error: 'Donation not found' })
    }

    res.json({ success: true, data: donation })
  } catch (err) {
    next(err)
  }
}

// PATCH /api/donations/:id/status — update donation status
async function updateDonationStatus(req, res, next) {
  try {
    const { status, reference } = req.body

    const donation = await prisma.donation.update({
      where: { id: req.params.id },
      data: { status, ...(reference && { reference }) },
    })

    res.json({ success: true, data: donation })
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, error: 'Donation not found' })
    }
    next(err)
  }
}

module.exports = {
  createDonation,
  getDonations,
  getDonationStats,
  getDonationById,
  updateDonationStatus,
}
