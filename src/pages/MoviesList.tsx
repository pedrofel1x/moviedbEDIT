import { useEffect, useState } from "react";
import type { IMovie } from "../types/movie";
import Card from "../components/Card/Card";
import styles from "./movielist.module.css";
import { Link } from "react-router-dom";
import ArrowLeft from "../components/Icons/ArrowLeft";
import ArrowRight from "../components/Icons/ArrowRight";

function MoviesList() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
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
      const url = inputText
        ? `https://api.themoviedb.org/3/search/movie?query=${inputText}&page=${page}`
        : `https://api.themoviedb.org/3/discover/movie?page=${page}`;
      const response = await fetch(url, options);
      const moviesList = await response.json();
      console.log("moviesList", moviesList);
      setMovies(moviesList.results);
      setTotalPages(moviesList.total_pages);
    };
    fetchData();
  }, [page, inputText]);

  useEffect(() => {
    setPage(1);
  }, [inputText]);

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
      />
      <div className={styles.list}>
        {filteredMovies.map((movie) => (
          <Link to={"/moviesList/" + movie.id}>
            <Card content={movie} />
          </Link>
        ))}
      </div>
      <div className={styles.pages}>
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          <ArrowLeft />
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

export default MoviesList;
