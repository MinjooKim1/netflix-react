import React, { useState } from 'react'
import "./ReviewCard.style.css"
import { Container } from 'react-bootstrap'


const ReviewCard = ({ review }) => {
    const [showReview, setShowReview] = useState(false)
    
    const showReviewContent = () => {
        showReview(!showReview)
    }
  return (
    <Container>
          <div className='review-content'>
              <h3>{review.author}</h3>
              {showReview && review.content.length > 200 ? (
                  <p>{review.content}</p>
              ) : <p>{review.content.slice(0, 200)}...</p>}
              {review.content.length > 200 && (
                  <button type="button" onClick={showReviewContent} className='show-btn'>
                      {!showReview && review.content.length >200? 'see more' : showReview ? 'close' : null}
                  </button>
              )}

              <div>{new Date(review.created_at).toLocaleDateString()}</div>
      </div>
    </Container>
  )
}

export default ReviewCard
