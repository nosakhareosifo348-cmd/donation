const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// POST /api/newsletter/subscribe
async function subscribe(req, res, next) {
  try {
    const { email } = req.body

    const existing = await prisma.subscriber.findUnique({
      where: { email: email.trim().toLowerCase() },
    })

    if (existing) {
      if (existing.isActive) {
        return res.status(409).json({
          success: false,
          error: 'This email is already subscribed.',
        })
      }
      // Re-activate if previously unsubscribed
      const reactivated = await prisma.subscriber.update({
        where: { email: email.trim().toLowerCase() },
        data: { isActive: true, unsubscribedAt: null },
      })
      return res.json({
        success: true,
        message: 'Welcome back! You have been re-subscribed.',
        data: { id: reactivated.id },
      })
    }

    const subscriber = await prisma.subscriber.create({
      data: { email: email.trim().toLowerCase() },
    })

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
      data: { id: subscriber.id },
    })
  } catch (err) {
    next(err)
  }
}

// POST /api/newsletter/unsubscribe
async function unsubscribe(req, res, next) {
  try {
    const { email } = req.body

    const subscriber = await prisma.subscriber.findUnique({
      where: { email: email.trim().toLowerCase() },
    })

    if (!subscriber || !subscriber.isActive) {
      return res.status(404).json({
        success: false,
        error: 'Email not found in our subscriber list.',
      })
    }

    await prisma.subscriber.update({
      where: { email: email.trim().toLowerCase() },
      data: { isActive: false, unsubscribedAt: new Date() },
    })

    res.json({ success: true, message: 'You have been unsubscribed.' })
  } catch (err) {
    next(err)
  }
}

// GET /api/newsletter/subscribers — list all active subscribers (admin)
async function getSubscribers(req, res, next) {
  try {
    const { page = 1, limit = 50 } = req.query
    const skip = (parseInt(page) - 1) * parseInt(limit)

    const [subscribers, total] = await Promise.all([
      prisma.subscriber.findMany({
        where: { isActive: true },
        orderBy: { subscribedAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.subscriber.count({ where: { isActive: true } }),
    ])

    res.json({
      success: true,
      data: subscribers,
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

module.exports = { subscribe, unsubscribe, getSubscribers }
