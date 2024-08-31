import "./App.css";
import AppLayout from "./layout/AppLayout";
import { Route, Routes } from "react-router-dom";
import MovieDetailPage from "./pages/MovieDetail/MovieDetailPage";
import Homepage from "./pages/Homepage/Homepage";
import MoviesPage from "./pages/Movies/MoviesPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

//homepage
//show app page (search) /movies
//movie detail page /movies/:id

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {" "}
          //user view
          <Route index element={<Homepage />} />
          <Route path="movies">
            <Route index element={<MoviesPage />} />
            <Route path=":id" element={<MovieDetailPage />} />
          </Route>
          {/* <Route path="/movies" element={<MoviesPage /> >} />
          <Route path="/movies/:id" element={<MovieDetailPage/>}/> */}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
