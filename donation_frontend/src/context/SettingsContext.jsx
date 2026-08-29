import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../services/api'

const SettingsContext = createContext(null)

const defaults = {
  phone: '', email: '', address: '',
  btcAddress: '', ethAddress: '', usdtAddress: '',
  facebookUrl: '', telegramUrl: '', instagramUrl: '',
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaults)

  const fetchSettings = useCallback(() => {
    api.getSettings().then(res => setSettings(res.data)).catch(() => {})
  }, [])

  useEffect(() => {
    fetchSettings()
    // Poll every 30s so public pages reflect admin changes without a manual refresh
    const interval = setInterval(fetchSettings, 30000)
    return () => clearInterval(interval)
  }, [fetchSettings])

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)
