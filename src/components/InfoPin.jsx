import React from 'react'
import './InfoPin.css'

export default function InfoPin({pin}) {
  return (    
    <div id="info-pin-global">
      {pin.genre === 'text' ? (
        <>
          <h1>{pin.title}</h1>
          <article>{pin.description}</article>
        </>
      ) : (
        <>
        <div id="info-pin-media">
          <img src={pin.media} alt="img de vous" />
        </div>

        <article id="info-pin-text">{pin.description}</article>       
      </>
      )}

      
    </div>
  )
}
