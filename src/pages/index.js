import React from 'react'

import { StartScreen } from './StartScreen'
import { Trainer } from './Trainer'
import { RegisterName } from './RegisterName'
import { RegisterColor } from './RegisterColor'

// https://www.colorcodehex.com/color-scheme/1014183.html

export const Example1 = () => {
  return (
    <StartScreen
      users={[
        { username: 'Eva', color: 'green' },
        { username: 'Markus', color: 'limegreen' },
        { username: 'King 345', color: 'purple' },
        { username: 'Ag!l', color: 'blue' }
      ]}
      onAction={(action, arg) => console.log(action, arg)}
    />
  )
}

export const Example2 = () => {
  return <Trainer />
}

export const Example3 = () => {
  return <RegisterName onAction={(action, arg) => console.log(action, arg)} />
}
export const Example4 = () => {
  return (
    <RegisterColor
      onAction={(action, arg) => console.log(action, arg)}
      colors={[
        ['LightCoral', 'Crimson', 'Red', 'HotPink '],
        ['OrangeRed', 'Orange', 'LemonChiffon', 'DarkKhaki'],
        ['Plum', 'MediumOrchid', 'Indigo', 'LawnGreen'],
        ['DarkGreen', 'Teal', 'Turquoise', 'SaddleBrown']
      ]}
    />
  )
}
