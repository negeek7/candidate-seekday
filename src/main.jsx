import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Providers from './redux/Providers.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // Removed React.StrictMode as it was rendering the App component twice on first load, which it does on dev mode
    <Providers>
      <App />
    </Providers>,
)
