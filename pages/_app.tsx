import '../styles/globals.css'
import type { AppProps } from 'next/app'

import NextNProgress from 'nextjs-progressbar'

import PageLayout from '../components/PageLayout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PageLayout>
      <NextNProgress color="#15803c" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </PageLayout>
  )
}
export default MyApp
