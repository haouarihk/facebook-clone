//import "../d/globals"
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "src/firebase"
import React from 'react'
import UserProvider from 'src/contexts/userProvider'
import UsersCacheProvider from 'src/contexts/usersCacheProvider'
function MyApp({ Component, pageProps }: AppProps) {
  return <UserProvider>
    <UsersCacheProvider>
      <Component {...pageProps} />
    </UsersCacheProvider>
  </UserProvider>
}
export default MyApp
