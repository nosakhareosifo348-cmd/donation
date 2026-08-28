module.exports = function errorHandler(err, req, res, next) {
  console.error(`[${new Date().toISOString()}] ${err.message}`)

  // Prisma unique constraint violation
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      error: `A record with this ${err.meta?.target?.join(', ')} already exists.`,
    })
  }

  // Prisma record not found
  if (err.code === 'P2025') {
    return res.status(404).json({ success: false, error: 'Record not found.' })
  }

  // Generic server error
  const status = err.status || err.statusCode || 500
  res.status(status).json({
    success: false,
    error: process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred.'
      : err.message,
  })
}
