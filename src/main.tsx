import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted fonts (bundled same-origin by Vite — no external requests)
import '@fontsource-variable/outfit'
import '@fontsource-variable/geist-mono'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
