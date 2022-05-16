import '../styles/globals.css'
import Nav from '../components/Nav'
import { GloabalCtxProvider } from '../context/gloabalCtx'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <GloabalCtxProvider >
        <Nav />
        <Component {...pageProps} />
      </GloabalCtxProvider>
    </>
  )

}

export default MyApp
