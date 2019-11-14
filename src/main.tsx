import Head from 'next/head'
import { App } from './pages'
import { addOSI } from './layers/osi'
import { addTransition } from './layers/transition'
import { addLoader } from './layers/loader'

const Entrypoint = addLoader('__next')(addTransition(addOSI(App)))

export default function Main() {
  return (
    <>
      <Head>
        <title>Trainer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Entrypoint />
      <style jsx global>{`
        body {
          user-select: none;
        }
      `}</style>
    </>
  )
}
