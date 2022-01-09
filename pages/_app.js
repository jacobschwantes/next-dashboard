import '../styles/globals.css'



import { SessionProvider } from "next-auth/react"

import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const pageview = (url) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  })
}

// log specific events happening.
export const event = ({ action, params }) => {
  window.gtag('event', action, params)
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <SessionProvider session={session}>
  <Component {...pageProps} />
  </SessionProvider>
  )
}

export default MyApp