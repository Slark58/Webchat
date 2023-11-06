import { RouterProvider } from 'react-router-dom'
import Router from './Routes/Router'

import { useAuth } from '@/Stores/userStore'
import { useEffect } from 'react'
import './Styles/App.scss'

function App() {
  return <RouterProvider router={Router()}/>
}

export default App
