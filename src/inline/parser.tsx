import { McInput } from './mc-input'
import { TextInput } from './text-input'

let keyCounter = 1

export function parseInlineHTML(html: string) {
  const parser = new DOMParser()
  const document = parser.parseFromString(html, 'text/html')
  const text = document.querySelector('body')
  keyCounter = 1
  return parseChildren(text)
}

function parseChildren(node) {
  const children = []
  for (let i = 0; i < node.childNodes.length; i++) {
    children.push(node.childNodes[i])
  }
  return children.map(parseChild)
}

const ELEMENT_NODE = 1
const TEXT_NODE = 3

function parseChild(node: HTMLElement) {
  if (node.nodeType === TEXT_NODE) {
    return node.nodeValue
  } else if (node.nodeType === ELEMENT_NODE) {
    if (node.tagName === 'MC') {
      const choices = node.innerHTML.split(';;')
      console.log(choices)
      return <McInput choices={choices} key={keyCounter++} />
    }
    if (node.tagName === 'BR') {
      return <br key={keyCounter++} />
    }
    if (node.tagName === 'GAP') {
      return (
        <span
          key={keyCounter++}
          style={{
            display: 'inline-block',
            minWidth: '3em',
            marginRight: '4px',
            outline: 'none'
          }}
        >
          <TextInput />
        </span>
      )
    }
  }

  return null
}
