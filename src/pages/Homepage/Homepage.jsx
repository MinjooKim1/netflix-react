import React from 'react'
import Banner from './components/Banner/Banner'
import "./Homepage.style.css"
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide'
import TopRatedMovieSlide from './components/TopRatedMovieSlide/TopRatedMovieSlide'
//1.  banner => shoe the first popular movie 
//2. popular movie
//3. top rated movie
//4. upcoming movie

function Homepage() {
  return (
    <div>

      <Banner />
      <PopularMovieSlide />
      <TopRatedMovieSlide />
    </div>
  )
}

export default Homepage
