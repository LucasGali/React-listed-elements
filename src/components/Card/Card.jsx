import React, { useEffect, useState } from 'react'
import './Card.css'

export default function Card({ id, image, text }) {
  const [like, setLike] = useState(false)

  function handleLike() {
    setLike(!like)

    if (!like) {
      const liked = JSON.parse(localStorage.getItem('liked')) || []
      liked.push(id)
      localStorage.setItem('liked', JSON.stringify(liked))
    } else {
      const liked = JSON.parse(localStorage.getItem('liked')) || []
      const index = liked.indexOf(id)
      liked.splice(index, 1)
      localStorage.setItem('liked', JSON.stringify(liked))
    }
  }

  function checkLiked() {
    const liked = JSON.parse(localStorage.getItem('liked')) || []
    if (liked.includes(id)) {
      setLike(true)
    }
  }

  useEffect(() => {
    checkLiked()
  }, [])

  return (
    <div className="card">
      <img src={image} alt="image" className="card-img-top" />
      <div className="card-body">
        <h3 className="card-title">{text}</h3>
        <div className="card-text text-end">
          <div className="large-font" onClick={handleLike}>
            <ion-icon name="heart" class={like ? 'active' : ''}>
              <div className="red-bg"></div>
            </ion-icon>
          </div>
        </div>
      </div>
    </div>
  )
}
