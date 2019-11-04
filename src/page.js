import React from 'react'
import { TextInput } from './input'
import { McInput } from './mc-input'

export const Page = () => {
  return (
    <>
      <div className="container">
        <div className="mathquill">
          <div className="mathquill-inner">
            <TextInput />
          </div>{' '}
          und
          <div className="mathquill-inner">
            <TextInput />
          </div>{' '}
          ergeben zusammen
          <div className="mathquill-inner">
            <TextInput />
          </div>
        </div>
        <div className="mathquill">
          <div className="mathquill-inner">
            <McInput choices={['Mausefall', 'Käse', 'Gefängnis']} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          height: 100%;
        }
        .mathquill {
          display: flex;
          flex-direction: row;
          align-items: baseline;
          justify-content: center;
        }
        .mathquill-inner {
          width: 30px;
          margin: 5px;
          margin-bottom: 30px;
          margin-top: 30px;
        }
      `}</style>
    </>
  )
}
