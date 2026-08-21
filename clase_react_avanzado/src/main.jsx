import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterApp } from './router/RouterApp.jsx'
import './styles/index.css'
import './styles/app.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { AccessibilityProvider } from './context/AccessibilityContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AccessibilityProvider>
      <AuthProvider>
        <RouterApp />
      </AuthProvider>
    </AccessibilityProvider>
  </StrictMode>,
)
