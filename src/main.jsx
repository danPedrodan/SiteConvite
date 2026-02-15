import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'

// ✅ Reset de rota APENAS no carregamento/reload inicial (antes do Router montar)
if (window.location.pathname !== '/') {
  window.history.replaceState({}, '', '/')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
