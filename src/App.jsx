import React, {useEffect} from "react";
import {Route, Router, Routes} from "react-router-dom";
import "./App.css";
import MoviePage from "./components/MoviePage/MoviePage";
import Perfetch from "./components/Perfetch";
import FetchMovies from "./components/fetchMovies/FetchMovies";
import {ROLES} from "./config/ROLES";
import {Footer, Nav} from "./containers";
import ProtectRoutes from "./containers/ProtectRoutes/ProtectRoutes";
import PersistLogin from "./containers/persistLogin/PersistLogin";
import {
  About,
  AddMovie,
  Categories,
  Contact,
  Dashboard,
  FavoritesMovies,
  Home,
  Login,
  Movies,
  MoviesList,
  Statistic,
  UpdateProfile,
  UsersList,
} from "./pages/index";
export default function App() {
  // ** When I Transform Between Pages => To Start From Y = 0 The Top.
  useEffect(() => {
    window.scrollTo(0, 20);
    console.log("ASd");
  }, [window.location.pathname]);

  return (
    // <Router>
    <div>
      <div className="nav__parent">
        <Nav />
      </div>
      <div className="app container navbar__margin ">
        <Routes>
          {/* Public Routes */}

          <Route element={<Perfetch />}>
            <Route element={<FetchMovies />}>
              <Route element={<PersistLogin />}>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MoviePage />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/aboutUs" element={<About />} />
                <Route path="/contactUs" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                {/*  */}
                <Route path="/dashboard" element={<Dashboard />}>
                  {/* Protected Routes */}
                  <Route
                    element={<ProtectRoutes allowedRoles={[ROLES.Admin]} />}
                  >
                    <Route path="moviesList" element={<MoviesList />} />
                    <Route path="addMovie" element={<AddMovie />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="usersList" element={<UsersList />} />
                  </Route>
                  {/* Protected Routes */}

                  <Route index element={<Statistic />} />
                  <Route path="updateProfile" element={<UpdateProfile />} />
                  <Route path="favoritesMovies" element={<FavoritesMovies />} />
                </Route>
                {/* Persist Login */}{" "}
              </Route>
            </Route>
          </Route>
          {/* End Dashboard */}
        </Routes>
      </div>

      <div className="footer__container">
        <Footer />
      </div>
    </div>
    // </Router>
  );
}
