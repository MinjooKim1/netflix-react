import React from 'react'
import { useParams } from 'react-router-dom'
import { useReview } from '../../../../hooks/useReview'
import { Spinner, Alert } from 'react-bootstrap'
import ReviewCard from '../../../../common/ReviewCard/ReviewCard'


const MovieReviews = () => {
    const { id } = useParams()
    const { data, isLoading, isError, error } = useReview(id)

    console.log("review", data)
    
      if (isLoading) {
        return (
      <div className='spinner-area'>
        <Spinner animation="border"
          variant="danger"
          style={{width: "5rem", height:"5rem"}} />
      </div>
    )
  }
  if (isError) {
     return <Alert variant="danger">{error.message}</Alert>
  }

  return (
    <div>
      {data.results?.length > 0 ? (
        data.results.map(review=> <ReviewCard key={review.id} review={review}/>)
      ) : (<p>no review found</p>)
      }
    </div>
  )
}

export default MovieReviews
