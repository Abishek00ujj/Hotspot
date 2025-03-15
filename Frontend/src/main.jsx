import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="894085193301-6u4c85uos8q8mld71msdl6orbsonpkfr.apps.googleusercontent.com">
    <App/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
