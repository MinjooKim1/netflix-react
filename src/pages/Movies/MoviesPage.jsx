import React , {useState} from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'
import { Alert, Container, Spinner, Col, Row } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';


//2 경로
//nav 클릭해서 온 경우 => popularMovie 보여주기
//keyword 를 입력 => keyword 관련 영화 보여줌

//pagination setup
//page state 만들기
//페이지네이션 클랙할때 page 바꾸기
// page값 바뀔때 마다 useSearchMovie에 page까지 넣어서 fetch


const MoviesPage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");
  const [page, setPage] = useState(1)
  const handlePageClick = ({selected}) => {
    setPage(selected+1)
  }


  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page })
  console.log("dddd", data)
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
  } return (
  <Container>
    <Row>
      <Col lg={4} xs={12}>
        {""}
        filter{""}
      </Col>
      <Col lg={8} xs={12}>
        <Row> {data?.results.map((movie, index) => (<Col key={index} lg={4} xs={12}><MovieCard movie={movie} /></Col>))}
          </Row>
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
