import React from 'react'
import "./MovieSlide.style.css"
import Carousel from 'react-multi-carousel';
import MovieCard from '../../common/MovieCard/MovieCard';



function MovieSlide({ title, movies, responsive }) {
  return (
    <div>
          <h3>{title}</h3>
            <Carousel
                infinite={true}
              centerMode={true}
        showDots={true}
                itemClass="movie-slider p-1"
              containerClass='carousel-container'

                responsive={responsive}
            >
                    
                {movies?.map((movie, index) => <MovieCard movie={movie} key={index} />)}

            </Carousel>;
    </div>
  )
}

export default MovieSlide
