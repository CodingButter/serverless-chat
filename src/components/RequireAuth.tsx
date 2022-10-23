import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function RequireAuth({ children }) {
  const { authed } = useAuth()
  return authed === true ? children : <Navigate to="/login" replace />
}
