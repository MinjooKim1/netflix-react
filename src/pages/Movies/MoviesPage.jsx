import React , {useState, useEffect} from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Alert, Container, Spinner, Col, Row, Dropdown, DropdownButton } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import "./MoviesPage.style.css"
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';


//2 경로
//nav 클릭해서 온 경우 => popularMovie 보여주기
//keyword 를 입력 => keyword 관련 영화 보여줌

//pagination setup
//page state 만들기
//페이지네이션 클랙할때 page 바꾸기
// page값 바뀔때 마다 useSearchMovie에 page까지 넣어서 fetch


const MoviesPage = () => {
  const filterList=['Popular','Newest', 'Title(A-Z)']
  const [query, setQuery] = useSearchParams();


  const keyword = query.get("q");
  const genreid = query.get("genre")
  
  const [page, setPage] = useState(1)
  const [selectedGenre, setSelectedGenre] = useState('Genre')
  const [selectedSort, setSelectedSort]= useState('Popular')


  const handlePageClick = ({selected}) => {
    setPage(selected + 1)
  }


  const navigate = useNavigate();

  useEffect(() => {
    setPage(1)
  },[keyword])

  
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page })
  const { data: genreData, isLoading:isGenreLoading, isError:isGenreError } = useMovieGenreQuery(); //bring genre
  console.log("dddd", data)
  const totalPages= Math.min(data?.total_pages || 1, 500)

  //no movie found
  useEffect(() => {
    if (data&&data.results && data.results.length === 0) {
      const timer = setTimeout(() => {
        navigate('/Movies')
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [data, navigate]);

  const sortByGenre = (genreid, genreName) => {
    if (genreid=== null) {
      setQuery({})
    } else {
      setQuery({ genre: genreid });
    }
    setSelectedGenre(genreName);
    setPage(1)
  }

  const handleSelect = sortOption => {
    setSelectedSort(sortOption)
    setPage(1)
  }


  const filteredMovies = query.get('genre')
  ?data?.results?.filter(movie=> movie.genre_ids.includes(parseInt(query.get('genre'),10))): data?.results
  
  const sortByMovies = filteredMovies?.sort((a, b) => {
    switch (selectedSort) {
      case 'Popular':
        return b.popularity - a.popularity;
      case 'Newest':
        return new Date(b.release_date || 0) - new Date(a.release_date || 0);
      case 'title(A-Z)':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  })


  useEffect(() => {
    if (query.get('genre')) {
      const filteredMovies = data?.results?.filter(movie=>movie.genre_ids.includes(parseInt(query.get('genre'), 10)));
      const totalFilteredPages = filteredMovies ? Math.ceil(filteredMovies.length / 20) : 0;
      setPage(totalFilteredPages);
    } else {
      setPage(totalPages || 0);
    }
   },[data, query, totalPages])


 
  if (isLoading || isGenreLoading ) {
    return (
      <div className='spinner-area'>
        <Spinner animation="border"
          variant="danger"
          style={{width: "5rem", height:"5rem"}} />
      </div>
    )
  }
  if (isError || isGenreError) {
     return <Alert variant="danger">{error.message}</Alert>
  }
  if (data?.results.length === 0) {
    return  <Alert key="danger" variant="danger">
      No result found for "{keyword}"
    </Alert>
  }
  
  
  return (
  <Container>
    <Row>
      <Col lg={4} xs={12} className='filter-container'>
           Filter by Genre: <DropdownButton id="dropdown-basic-button" title={selectedGenre}>
            <Dropdown.Item onClick={() => sortByGenre(null, 'genre')}>All</Dropdown.Item>
            {genreData?.map((genre) => (
              <Dropdown.Item key={genre.id} onClick={() => sortByGenre(genre.id, genre.name)}>{genre.name}</Dropdown.Item>
            ))}
          </DropdownButton>

          Sort By: <DropdownButton id="dropdown-basic-button" title={selectedSort}>
            {filterList.map((item, index) => (
              <Dropdown.Item key={index} onClick={() => handleSelect(item)} value={item}>
              {item}
              </Dropdown.Item>
              ))}
             </DropdownButton>
        </Col>
       
        <Col lg={8} xs={12}>
          {sortByMovies?.length > 0 ? (
            <Row>
              {sortByMovies?.map((movie, index) => (
                <Col key={index} lg={3}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
          ) : (
              <Alert variant='warning'>{ error.message}</Alert>
          )}


           <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={12} // total page data?.total_pages
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page-1}
      />
      </Col>
     
    </Row>
  </Container>
)
}

export default MoviesPage
