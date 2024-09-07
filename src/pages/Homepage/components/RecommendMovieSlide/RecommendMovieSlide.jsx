import React from 'react'
import { useRecommendQuery } from '../../../../hooks/useRecommend'
import { useParams } from 'react-router-dom'
import { Alert, Spinner } from 'react-bootstrap'
import MovieSlide from '../../../../common/MovieSlide/MovieSlide'
import { responsive } from '../../../../constants/responsive'

const RecommendMovieSlide = () => {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useRecommendQuery(id)
    console.log("id", id)
    console.log("data",data)
    
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
          
          <MovieSlide title="Recommend movies" movies={data.results} responsive={responsive} />
    </div>
  )
}

export default RecommendMovieSlide
