import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { Auth0Provider } from '@auth0/auth0-react'

function MyApp({ Component, pageProps }: AppProps) {
  return <Auth0Provider
    domain="wulfpat.eu.auth0.com"
    clientId="O6d1sBmQie9P9locqkTCICx52WHdkQey"
    redirectUri={'http://localhost:3000'}
  >
    <Component {...pageProps} />
  </Auth0Provider>
}
export default MyApp
