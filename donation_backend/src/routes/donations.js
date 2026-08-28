const { Router } = require('express')
const { body } = require('express-validator')
const validate = require('../middleware/validate')
const {
  createDonation,
  getDonations,
  getDonationStats,
  getDonationById,
  updateDonationStatus,
} = require('../controllers/donations')

const router = Router()

const donationRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('amount')
    .isFloat({ min: 1 })
    .withMessage('Amount must be a positive number'),
  body('address').optional().trim(),
  body('currency').optional().isIn(['USD', 'EUR', 'GBP', 'NGN']).withMessage('Unsupported currency'),
  body('message').optional().trim().isLength({ max: 1000 }),
]

const statusRules = [
  body('status')
    .isIn(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'])
    .withMessage('Invalid status value'),
  body('reference').optional().trim(),
]

router.post('/', donationRules, validate, createDonation)
router.get('/', getDonations)
router.get('/stats', getDonationStats)
router.get('/:id', getDonationById)
router.patch('/:id/status', statusRules, validate, updateDonationStatus)

module.exports = router
