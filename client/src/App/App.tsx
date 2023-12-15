import { RouterProvider } from 'react-router-dom'
import Router from './Routes/Router'
import { SocketProvaider } from './Providers/SocketProvaider'
import './Styles/App.scss'

function App() {
  return (
    <SocketProvaider>
      <RouterProvider router={Router()}/>
    </SocketProvaider>
  )
}

export default App
