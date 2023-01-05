import React from 'react'
import './Card.css'

export default function Card({ image, text }) {
  return (
    <div className="card">
      <img src={image} alt="image" className='card-img-top' />
      <div className="card-body">
        <h3 className='card-title'>{text}</h3>
      </div>
    </div>
  )
}
