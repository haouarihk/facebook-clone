//import "../d/globals"
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "src/firebase"
import React from 'react'
import UserProvider from 'src/contexts/userProvider'
import UsersCacheProvider from 'src/contexts/usersCacheProvider'
import Navbar from 'src/components/navbar'
function MyApp({ Component, pageProps }: AppProps) {
  return <UserProvider>
    <UsersCacheProvider>
      <Navbar />
      <Component {...pageProps} />
    </UsersCacheProvider>
  </UserProvider>
}
export default MyApp
