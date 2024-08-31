import React from 'react'
import "./NotFoundPage.style.css"
const NotFoundPage = () => {
  return (
      <div className='notFoundPageAll' >
          <div className="notFoundSize">4 <span><img src='https://pngimg.com/d/spider_man_PNG29.png' alt='spiderman' width={250}/></span>4</div>
          <div>OOPS!</div>
          <div>Page Not Found</div>
          <button className='retry-btn'>Retry</button>
    </div>
  )
}

export default NotFoundPage
