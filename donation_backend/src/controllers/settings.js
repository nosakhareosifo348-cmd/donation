const Settings = require('../models/Settings')

// Always returns the single settings doc, creating it if it doesn't exist
async function getSettings(req, res, next) {
  try {
    let settings = await Settings.findOne()
    if (!settings) settings = await Settings.create({})
    res.json({ success: true, data: settings })
  } catch (err) { next(err) }
}

async function updateSettings(req, res, next) {
  try {
    const { phone, email, address, btcAddress, ethAddress, usdtAddress, facebookUrl, telegramUrl, instagramUrl } = req.body
    let settings = await Settings.findOne()
    if (!settings) settings = new Settings()
    if (phone !== undefined) settings.phone = phone
    if (email !== undefined) settings.email = email
    if (address !== undefined) settings.address = address
    if (btcAddress !== undefined) settings.btcAddress = btcAddress
    if (ethAddress !== undefined) settings.ethAddress = ethAddress
    if (usdtAddress !== undefined) settings.usdtAddress = usdtAddress
    if (facebookUrl !== undefined) settings.facebookUrl = facebookUrl
    if (telegramUrl !== undefined) settings.telegramUrl = telegramUrl
    if (instagramUrl !== undefined) settings.instagramUrl = instagramUrl
    await settings.save()
    res.json({ success: true, message: 'Settings updated.', data: settings })
  } catch (err) { next(err) }
}

module.exports = { getSettings, updateSettings }
