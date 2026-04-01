import { useEffect, useState } from "react";
import type { IMovie } from "../types/movie";
import Card from "../components/Card/Card";
import styles from "./movielist.module.css";
import { Link } from "react-router-dom";

function MoviesList() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  console.log("movies", movies);

  const [inputText, setInputText] = useState("");

  const filteredMovies = movies.filter((movie) => {
    const movieName = movie.original_title.toLowerCase();
    const input = inputText.toLowerCase();
    return movieName.includes(input);
  });
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzRjM2ZlOWIyZGQ5YmQxNTQzYzhlZWRiYTU0ZTkzMSIsIm5iZiI6MTc0MjE1NzE2My4wMjksInN1YiI6IjY3ZDczNTZiMzE1MzhkZTYwOGYxYmFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g1NFgZQFkQCTa6A5ffKDJXyLcmnKxXKA2xoTRTViHcE",
      },
    };

    const fetchData = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie",
        options,
      );
      const moviesList = await response.json();
      console.log("moviesList", moviesList);
      setMovies(moviesList.results);
    };
    fetchData();
  }, [movies, inputText]);

  return (
    <div className={styles.container}>
      <h3>Movies</h3>
      <input
        type="text"
        placeholder="Search Movie"
        onChange={(event) => {
          console.log("value", event.target.value);
          setInputText(event.target.value);
        }}
      ></input>
      <div className="list">
        {filteredMovies.map((movie) => (
          <Link to={"/moviesList/" + movie.id}>
            <Card content={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MoviesList;
