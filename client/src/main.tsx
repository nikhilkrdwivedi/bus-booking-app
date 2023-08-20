import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@contexts/AuthContext'
import { ThemeProvider } from '@contexts/ThemeContext'
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ThemeProvider>
  <AuthProvider>
  <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
  </ThemeProvider>
  
  // </React.StrictMode>,
)
