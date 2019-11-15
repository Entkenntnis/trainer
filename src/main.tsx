import Head from 'next/head'

import { App } from './app'
import { addLoader } from './layers/loader'
import { addTransition } from './layers/transition'
import { addOSI } from './layers/osi'
import { addContent } from './layers/content'
import { addProfile } from './layers/profile'
import DevContent from '../content/DevContent'

const layers: any = [
  addLoader('__next'),
  addTransition,
  addOSI,
  addContent(DevContent),
  addProfile
]

const Entrypoint = layers.reduceRight((acc, val) => val(acc), App)

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
