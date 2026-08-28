const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// POST /api/contact — submit a contact message
async function submitContact(req, res, next) {
  try {
    const { name, email, subject, message } = req.body

    const contact = await prisma.contact.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
      },
    })

    res.status(201).json({
      success: true,
      message: 'Your message has been received. We will get back to you within 24 hours.',
      data: { id: contact.id },
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/contact — list all messages (admin)
async function getMessages(req, res, next) {
  try {
    const { isRead, page = 1, limit = 20 } = req.query
    const skip = (parseInt(page) - 1) * parseInt(limit)

    const where = isRead !== undefined ? { isRead: isRead === 'true' } : {}

    const [messages, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.contact.count({ where }),
    ])

    res.json({
      success: true,
      data: messages,
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

// PATCH /api/contact/:id/read — mark message as read
async function markAsRead(req, res, next) {
  try {
    const contact = await prisma.contact.update({
      where: { id: req.params.id },
      data: { isRead: true },
    })

    res.json({ success: true, data: contact })
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, error: 'Message not found' })
    }
    next(err)
  }
}

module.exports = { submitContact, getMessages, markAsRead }
