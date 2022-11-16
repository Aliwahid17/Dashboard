import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AuthState, { useAuth } from '../context/AuthState'
import SignIn from '../components/SignIn'
import { useRouter } from 'next/router'
import ProtectedRoute from '../context/ProtectedRoute'
import Topbar from '../components/navbar/Topbar'


export default function App({ Component, pageProps }: AppProps) {




  return <>

    <AuthState>
      <ProtectedRoute >

      <Topbar />
      <Component {...pageProps} />



      </ProtectedRoute>
    </AuthState>

  </>
}
