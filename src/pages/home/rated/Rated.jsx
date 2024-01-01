import {motion} from "framer-motion";
import React, {useEffect, useRef, useState} from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaHeart,
  FaLink,
  FaStar,
} from "react-icons/fa";
import {FaBookmark} from "react-icons/fa6";
import {Link} from "react-router-dom";
import LikeBtn from "../../../components/LikeBtn/LikeBtn";
import useAuth from "../../../hooks/useAuth";
import "./rated.css";
const Rated = ({movies}) => {
  const {favoritesMovies} = useAuth();
  const [width, setWidth] = useState();
  const outerCarousel = useRef();
  let content;
  if (movies.length) {
    content = movies.map((movie) => {
      const startRate = Math.floor(movie.voteAverage / 2);

      let url;
      if (movie.poster.length > 500) {
        url = movie.poster;
      } else {
        url = `https://image.tmdb.org/t/p/original/${movie.poster}`;
      }
      return (
        <motion.div className="home__rated__container__movie" key={movie.id}>
          <div className="home__rated__image">
            <img src={url} alt="" />
          </div>
          <div className="home__rated__container__movie__info">
            <LikeBtn
              movieId={movie._id || movie.id}
              type={"icon"}
              likedStyle={favoritesMovies?.includes(movie.id || movie._id)}
            />
            <h2>{movie.title}</h2>
            <div className="stars__div">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={index <= startRate ? "gold__star" : ""}
                />
              ))}
            </div>
          </div>
        </motion.div>
      );
    });
  }

  useEffect(() => {
    setWidth(
      parseInt(
        outerCarousel.current.scrollWidth - outerCarousel.current.clientWidth
      )
    );
  }, [width, outerCarousel]);

  return (
    <div className="section__margin home__rated">
      <div className="home__rated__title">
        <FaBookmark />
        <h1>Top Rated</h1>
      </div>

      <div ref={outerCarousel} className="home__rated__outerBox">
        <motion.div
          drag={"x"}
          dragConstraints={{left: width * -1, right: 0}}
          whileTap={{cursor: "grabbing"}}
          className="home__rated__innerBox"
        >
          {content}
        </motion.div>
      </div>
    </div>
  );
};

export default Rated;
