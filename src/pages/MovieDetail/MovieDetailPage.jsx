import React from 'react'
import { useMovieDetailQuery } from '../../hooks/useMovieDetail'
import { Spinner, Alert, Container, Row, Col, Badge, Tabs, Tab} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import "./MovieDetailpage.style.css"
import { useMovieGenreQuery } from '../../hooks/useMovieGenre'
import RecommendMovieSlide from '../Homepage/components/RecommendMovieSlide/RecommendMovieSlide'
import MovieReviews from '../Homepage/components/MovieReviews/MovieReviews'



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
      <div className='detail-container'>
      <Container >
        <Row>
          <Col lg={4} sm={12}> <img src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} className='detail-image' /></Col>
            <Col lg={8} sm={12}>

              <div>
                {movie.genres.map(genre => (<Badge key={genre.id} bg='danger' text='white' className='movie-genre'>{genre.name}</Badge>))}
              </div>
              <div className="detail-content">
                <h3>{movie?.title}</h3>
                <div>{movie?.overview}</div>
                
                <table className='movie-detail-table'>
                  <tr>
                    <th scope='row'>POPULAR</th>
                    <td>{movie?.popularity} </td>
                  </tr>
                   <tr>
                    <th scope='row'>BUDGET</th>
                    <td>{movie?.budget.toLocaleString('en-US', {
                      style: 'currency',
                      currency:'USD',
                    })}</td>
                    </tr>

                   <tr>
                    <th scope='row'>RELEASE DATE</th>
                    <td>{movie?.release_date}  </td>
                  </tr>
                  
                  <tr>
                    <th scope='row'>RELEASE DATE</th>
                    <td>{movie?.release_date}  </td>
                    </tr>
                </table>

              </div>
                      

              
            
          </Col>
        </Row>
        </Container>
      </div>
      <Container>
       <Tabs
      defaultActiveKey="detail"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="detail" title="Detail">
            <RecommendMovieSlide />

      </Tab>
      <Tab eventKey="review" title="Review">
        <MovieReviews />
      </Tab>
      <Tab eventKey="recommend" title="Recommend">
           <RecommendMovieSlide />
            
      </Tab>
    </Tabs>
      </Container>
     
      
    </div>
  )
}

export default MovieDetailPage
