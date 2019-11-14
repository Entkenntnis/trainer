import React from 'react'

import { Content } from '../../content/dummy'

import { StartScreen } from './StartScreen'
import { Trainer } from './Trainer'
import { RegisterName } from './RegisterName'
import { RegisterColor } from './RegisterColor'
import { HomeScreen } from './HomeScreen'
import { Settings } from './Settings'
import { TopicScreen } from './TopicScreen'
import { DummyContent } from './DummyContent'

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

export const Example5 = () => {
  return (
    <HomeScreen
      username="Max"
      color="SaddleBrown"
      heading="Themenübersicht"
      content={Content}
      onAction={(action, arg) => console.log(action, arg)}
    />
  )
}

export const Example6 = () => {
  console.log('render example 6')
  React.useEffect(() => {
    console.log('mount example 6')
    return () => console.log('unmount example 6')
  }, [])
  return (
    <div>
      <RegisterName onAction={(action, arg) => console.log(action, arg)} />
    </div>
  )
}

export const Example7 = () => {
  return (
    <Settings
      username="Max"
      color="SaddleBrown"
      onAction={(action, arg) => console.log(action, arg)}
    />
  )
}

export const Example8 = () => {
  return (
    <TopicScreen
      heading="Negative Zahlen"
      image="N.png"
      list={Content[0].topics[0].items}
      onAction={(action, arg) => console.log(action, arg)}
    />
  )
}

export const Example9 = () => {
  return <DummyContent onAction={(action, arg) => console.log(action, arg)} />
}
