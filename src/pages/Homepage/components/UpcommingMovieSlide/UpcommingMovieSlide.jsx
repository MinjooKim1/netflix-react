import React from 'react'
import { useUpcommingMovie } from '../../../../hooks/useUpcommingMovies'
import { Alert } from 'bootstrap'
import MovieSlide from '../../../../common/MovieSlide/MovieSlide'
import { responsive } from '../../../../constants/responsive'
import 'react-multi-carousel/lib/styles.css';

function UpcommingMovieSlide() {
    const { data, isLoading, isError, error } = useUpcommingMovie()

    if (isLoading) {
        return <h1>loading...</h1>
    }
    if (isError) {
        <Alert variant="danger">{error.message}</Alert>
    }
  return (
      <div>
          <MovieSlide title="UpComming Movies" movies={data.results} responsive={responsive} />
    </div>
  )
}

export default UpcommingMovieSlide
