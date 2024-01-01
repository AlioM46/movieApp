import React, {useState} from "react";
import DropImage from "../../../components/DropImage/DropImage";
import Input from "../../../components/Input/Input";
import genres from "../../../config/GENRE_IDS.json";
import {useUploadMovieMutation} from "../../../features/movies/moviesApiSlice";
import "./addMovie.css";
const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [lang, setLang] = useState("");
  const [year, setYear] = useState("");
  const [hours, setHours] = useState(0);
  const [poster, setPoster] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [movieDesc, setMovieDesc] = useState("");
  const [vidUrl, setVidUrl] = useState("");
  const [categories, setCategories] = useState([]);

  let categoryOptions = genres?.genres?.map((item) => {
    return <option value={item.name}>{item.name}</option>;
  });

  const handleSelect = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setCategories(values);
  };

  const [upload, {isLoading, isSuccess, isError, error}] =
    useUploadMovieMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await upload({
        title,
        lang,
        year,
        hours,
        poster,
        imageTitle,
        movieDesc,
        vidUrl,
        categories,
      }).unwrap();
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <div className="addMovie">
      <form onSubmit={handleSubmit}>
        <div className="form__container">
          <Input
            id={"title"}
            label={"Movie Title"}
            placeholder={"Make it short and sweet."}
            setter={setTitle}
            value={title}
          />
          <Input
            id={"lang"}
            label={"Language"}
            placeholder={""}
            setter={setLang}
            value={lang}
          />
          <Input
            id={"year"}
            label={"Years of Release"}
            placeholder={""}
            setter={setYear}
            value={year}
          />
          <Input
            id={"hours"}
            label={"Hours"}
            placeholder={""}
            setter={setHours}
            value={hours}
          />
          <Input
            id={"url"}
            label={"Video Link"}
            placeholder={"Put the video url."}
            setter={setVidUrl}
            value={vidUrl}
          />
        </div>

        {/* Images Drop */}

        <div className="form__container">
          <DropImage title={"Image With Title"} setter={setImageTitle} />
          <DropImage title={"Poster"} setter={setPoster} />
        </div>

        <div className="textArea__container">
          <label htmlFor="movieDesc">Movie Description</label>
          <textarea
            name=""
            id="movieDesc"
            cols="30"
            rows="10"
            value={movieDesc}
            onChange={(e) => setMovieDesc(e.target.value)}
            placeholder="Make it short and sweet."
          ></textarea>
        </div>

        <div className="addMovie__select">
          <select
            multiple={true}
            size={5}
            value={categories}
            onChange={(e) => handleSelect(e)}
          >
            {categoryOptions}
          </select>
        </div>
        <button>ADD</button>
      </form>
    </div>
  );
};

export default AddMovie;
