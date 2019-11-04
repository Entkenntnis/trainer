import React from 'react'
import Head from 'next/head'
import { Page } from './page'
import { addOSI } from './osi'

const WrappedPage = addOSI(Page)

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
