import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App.tsx'

console.log(import.meta.env.VITE_APP_API_URL);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
