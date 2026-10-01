import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' //나지금부터라우터사용할꺼야선포
import { HelmetProvider } from 'react-helmet-async'

import App from './App.jsx'
import './styles/reset.scss'
import './App.scss'
import './styles/chartTheme.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
