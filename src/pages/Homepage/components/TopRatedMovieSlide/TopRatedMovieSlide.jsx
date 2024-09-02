import React from 'react'
import { useTopRatedQuery } from"../../../../hooks/useTopRatedMovies"
import { Alert } from "bootstrap"
import { responsive } from '../../../../constants/responsive'
import 'react-multi-carousel/lib/styles.css';
import MovieSlide from '../../../../common/MovieSlide/MovieSlide';

function TopRatedMovieSlide() {

          const {data, isLoading, isError, error} = useTopRatedQuery()
          
          if(isLoading){
              return <h1>loading...</h1>
          }
          if(isError){
              return <Alert variant="danger">{error.message}</Alert>
    };
    return (
        <div>
            <MovieSlide title='Top Rated Movies' movies={data.results} responsive={responsive} />
    </div>
  )
}

export default TopRatedMovieSlide
