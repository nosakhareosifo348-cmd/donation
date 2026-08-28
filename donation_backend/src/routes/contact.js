const { Router } = require('express')
const { body } = require('express-validator')
const validate = require('../middleware/validate')
const { submitContact, getMessages, markAsRead } = require('../controllers/contact')

const router = Router()

const contactRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
]

router.post('/', contactRules, validate, submitContact)
router.get('/', getMessages)
router.patch('/:id/read', markAsRead)

module.exports = router
