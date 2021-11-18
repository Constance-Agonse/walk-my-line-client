import React from 'react'
import './Hashtags.css'

export default function Hashtags({text}) {
  console.log(text)
  return (
      <span className="item">#{text}</span>      //.name
    
  )
}
