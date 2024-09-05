import React from 'react'
import { useMovieDetailQuery } from '../../hooks/useMovieDetail'
import { Spinner, Alert, Container, Row, Col, Badge } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import "./MovieDetailpage.style.css"
import { useMovieGenreQuery } from '../../hooks/useMovieGenre'



const MovieDetailPage = () => {
  const { data: genreData } = useMovieGenreQuery();
  console.log("genre",genreData)

  const { id } = useParams();


  const { data: movie, isLoading, isError, error } = useMovieDetailQuery(id)
  console.log("ddd",movie)

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
    <div >
      <div >
      <Container >
        <Row className='detail-content'>
          <Col lg={4}> <img src={`https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${movie.backdrop_path}`} className='detail-image' /></Col>
            <Col lg={8}>
              <div>
                
              </div>
            
            <h3>{movie?.title}</h3>
            <div>{movie?.overview}</div>
          </Col>
        </Row>
      </Container>

      </div>

     
      
    </div>
  )
}

export default MovieDetailPage
