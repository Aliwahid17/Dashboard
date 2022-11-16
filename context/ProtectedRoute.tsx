import React from 'react'
import { useAuth } from './AuthState'
import SignIn from '../components/SignIn'


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    const { user } = useAuth()

    return <> { user ? children : <SignIn /> } </> 

}

export default ProtectedRoute