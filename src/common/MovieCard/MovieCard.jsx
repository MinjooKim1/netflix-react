import React from 'react'
import { Badge } from 'react-bootstrap' 
import "./MovieCard.style.css"
import { useMovieGenreQuery } from '../../hooks/useMovieGenre'
import { useNavigate } from 'react-router-dom'


function MovieCard({ movie }) {
  const { data: genreData } = useMovieGenreQuery()
  const navigate = useNavigate()
  const showDetail = () => {
    navigate(`/movies/${movie.id}`)
  }


  const showGenre = (genreIdList) => {
    if (!genreData) return []
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id)
      return genreObj.name;
    })
    
    return genreNameList
  }
  return (
    <div style={{ backgroundImage: "url(" + `https://image.tmdb.org/t/p/w300${movie.poster_path}` + ")" }}
    className='movie-card' onClick={showDetail}>
      <div className='overlay'>
       <div> <h3>{movie.title}</h3>
<div className='movie-score'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg> {movie.vote_average}</div>
        </div>
                <div className='movie-items'><div>{movie.adult ? <Badge bg="danger">18</Badge> : <Badge bg="warning">ALL</Badge>}</div>
          <div className='movie-badge'>{showGenre(movie.genre_ids).map((id) => (<Badge bg="danger" >{id}</Badge>))}</div></div> 
      </div>
    </div>
  )
}

export default MovieCard
