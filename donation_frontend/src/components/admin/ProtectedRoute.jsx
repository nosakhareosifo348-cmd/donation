import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('gh_token')
  if (!token) return <Navigate to="/gh-control/login" replace />
  return children
}
