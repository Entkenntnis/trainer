import React from 'react'
import Head from 'next/head'
import * as Pages from './pages'
import { addOSI } from './osi'
import { addLoader } from './loader'
import { addTransition } from './transition'

const WrappedPage = addLoader(addTransition(addOSI(Pages.Host)))

const App = () => {
  return (
    <>
      <Head>
        <title>Trainer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WrappedPage />
    </>
  )
}

export default App
