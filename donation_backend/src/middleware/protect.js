const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

module.exports = async function protect(req, res, next) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer '))
    return res.status(401).json({ success: false, error: 'Not authenticated. Please log in.' })

  try {
    const decoded = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET)
    req.admin = await Admin.findById(decoded.id)
    if (!req.admin)
      return res.status(401).json({ success: false, error: 'Admin no longer exists.' })
    next()
  } catch {
    res.status(401).json({ success: false, error: 'Invalid or expired token.' })
  }
}
