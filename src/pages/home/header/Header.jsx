import React, {useEffect, useState} from "react";
import {IoMdHeart} from "react-icons/io";
import {MdLanguage, MdOutlineDateRange} from "react-icons/md";
import {Link} from "react-router-dom";
import LikeBtn from "../../../components/LikeBtn/LikeBtn";
import "./header.css";
const Header = ({movies}) => {
  const [section, setSection] = useState(0);
  const [width, setWidth] = useState(384);
  const [dir, setDir] = useState(1); // 1 => Increase -1 => Decrease
  useEffect(() => {
    let countInterval;

    if (movies?.length) {
      countInterval = setInterval(() => {
        if (section > 6 && dir == 1) {
          setDir(1);
        } else if (section == 6 && section != 0) {
          setDir(-1);
        } else if (section == 6 && dir == -1) {
          setDir(1);
        }
        setSection((prev) => prev + dir);
      }, 2000);
    }
    return () => {
      clearInterval(countInterval);
    };
  }, [section, movies]);

  useEffect(() => {
    if (screen.availWidth <= 760) {
      setWidth(200);
    } else {
      setWidth(384);
    }
  }, [screen.availWidth]);

  let content;

  if (movies.length) {
    content = movies.map((movie, index) => {
      let YearsDate = new Date(movie.releaseDate).getFullYear();

      let url;
      if (movie.backdropImage.length > 500) {
        url = movie.backdropImage;
      } else {
        url = `https://image.tmdb.org/t/p/original/${movie.backdropImage}`;
      }

      return (
        <div className="header__movie" key={index}>
          <img src={url} alt={movie.overview} />
          <div className="header__overview">
            <h1>{movie.title}</h1>
            <ul>
              <li className="genreList">
                {movie.genreList.toString().replaceAll(",", " , ")}
              </li>
              <li>
                <MdOutlineDateRange />
                {YearsDate}
              </li>
              <li>
                <MdLanguage />
                <span>{movie.originalLanguage}</span>
              </li>
            </ul>
            <div>
              <Link to={`movie/${movie.id}`}>Watch</Link>
              <LikeBtn type={"icon"} movieId={movie.id} />
            </div>
          </div>
        </div>
      );
    });
  }
  const transformStyle = {
    transform: `translateY(-${width * section}px)`,
  };
  return (
    <div className="header">
      <div className="header__outerBox ">
        <div className="header__innerBox " style={transformStyle}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default Header;
