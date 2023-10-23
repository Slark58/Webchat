import { Paths } from '@/App/Routes/types/Paths'
import { AuthForm } from '@/Components'
import { useLocation } from 'react-router-dom'

import './AuthPage.scss'

const AuthPage = () => {

    const location = useLocation()
    const isSignup = location.pathname === Paths.Signup

  return (
    <div className="AuthPage">
        <AuthForm isSignup={isSignup}/>
    </div>
  )
}

export {AuthPage}