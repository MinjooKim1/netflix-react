import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import { Alert } from "bootstrap"
import 'react-multi-carousel/lib/styles.css';
import MovieSlide from '../../../../common/MovieSlide/MovieSlide';
import {responsive} from "../../../../constants/responsive"



function PopularMovieSlide() {
    const { data, isLoading, isError, error } = usePopularMoviesQuery()

    if (isLoading) {
        return <h1>loading...</h1>
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>
    }
    return (
        <div>
        <MovieSlide title='Popular Movies' movies={data.results} responsive={responsive} />
    </div>
  )
        
};

export default PopularMovieSlide
