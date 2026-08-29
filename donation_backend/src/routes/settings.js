const { Router } = require('express')
const { body } = require('express-validator')
const validate = require('../middleware/validate')
const protect = require('../middleware/protect')
const { getSettings, updateSettings } = require('../controllers/settings')

const router = Router()

const settingsRules = [
  body('email').optional().isEmail().withMessage('Valid email required'),
  body('phone').optional().trim(),
  body('address').optional().trim(),
  body('btcAddress').optional().trim(),
  body('ethAddress').optional().trim(),
  body('usdtAddress').optional().trim(),
  body('facebookUrl').optional().trim(),
  body('telegramUrl').optional().trim(),
  body('instagramUrl').optional().trim(),
]

router.get('/', getSettings)                               // public — frontend reads this
router.put('/', protect, settingsRules, validate, updateSettings)  // admin only

module.exports = router
