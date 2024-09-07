import React, {useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import Logo from "../image/Logo.svg.png";
import './AppLayout.style.css';

import { useNavigate } from 'react-router-dom';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import { Alert } from 'react-bootstrap';

const AppLayout = () => {
  const [keyword, setKeyword] = useState("")

  const navigate = useNavigate()
  const searchByKeyword = (event) => {
    event.preventDefault()
    //url change
    navigate(`/movies?q=${keyword}`)
  }
    
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary nav-bar">
        <Container fluid>
          <Navbar.Brand href="/"><img src={Logo} alt='logo' width={100} className='m-2' /></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/Movies">Movies</Nav.Link>
           
  
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <Button variant="outline-danger">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
        
  )
}

export default AppLayout
