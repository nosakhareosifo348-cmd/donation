const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

// POST /api/auth/login
async function login(req, res, next) {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ success: false, error: 'Email and password are required.' })

    const admin = await Admin.findOne({ email }).select('+password')
    if (!admin || !(await admin.comparePassword(password)))
      return res.status(401).json({ success: false, error: 'Invalid email or password.' })

    const token = signToken(admin._id)
    res.json({ success: true, token, data: admin })
  } catch (err) { next(err) }
}

// GET /api/auth/me
async function getMe(req, res) {
  res.json({ success: true, data: req.admin })
}

// POST /api/auth/change-password
async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body
    const admin = await Admin.findById(req.admin._id).select('+password')
    if (!(await admin.comparePassword(currentPassword)))
      return res.status(401).json({ success: false, error: 'Current password is incorrect.' })
    admin.password = newPassword
    await admin.save()
    res.json({ success: true, message: 'Password changed successfully.' })
  } catch (err) { next(err) }
}

module.exports = { login, getMe, changePassword }
