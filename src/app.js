import React from 'react'
import Head from 'next/head'
import * as Pages from './pages'
import { addOSI } from './osi'
import { Loader } from './loader'

const WrappedPage = addOSI(Pages.Example2)

const App = () => {
  const [loaded, setLoaded] = React.useState(false)
  React.useEffect(() => setLoaded(true), [])
  return (
    <>
      <Head>
        <title>Trainer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loaded && <WrappedPage />}
      <Loader />
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
    </>
  )
}

export default App
