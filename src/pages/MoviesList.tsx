import { useEffect, useState } from "react";
import type { IMovie } from "../types/movie";
import Card from "../components/Card/Card";
import styles from "./movielist.module.css";
import { Link } from "react-router-dom";
import ArrowLeft from "../components/Icons/ArrowLeft";
import ArrowRight from "../components/Icons/ArrowRight";
import Lupa from "../components/Icons/Lupa";
import Chip from "../components/Chip/Chip";

function MoviesList() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [genreList, setGenreList] = useState<IMovie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [movies, setMovies] = useState<IMovie[]>([]);
  console.log("movies", movies);

  const [inputText, setInputText] = useState("");

  const filteredMovies = movies.filter((movie) => {
    const movieName = movie.title.toLowerCase();
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
        : `https://api.themoviedb.org/3/discover/movie?page=${page}${selectedGenre ? `&with_genres=${selectedGenre}` : ""}`;
      const response = await fetch(url, options);
      const moviesList = await response.json();
      console.log("moviesList", moviesList);
      setMovies(moviesList.results);
      setTotalPages(moviesList.total_pages);
    };
    fetchData();
  }, [page, inputText, selectedGenre]);

  useEffect(() => {
    setPage(1);
  }, [inputText]);

  useEffect(() => {
    const fetchGenres = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzRjM2ZlOWIyZGQ5YmQxNTQzYzhlZWRiYTU0ZTkzMSIsIm5iZiI6MTc0MjE1NzE2My4wMjksInN1YiI6IjY3ZDczNTZiMzE1MzhkZTYwOGYxYmFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g1NFgZQFkQCTa6A5ffKDJXyLcmnKxXKA2xoTRTViHcE",
        },
      };
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list",
        options,
      );
      const data = await response.json();
      setGenreList(data.genres);
    };
    fetchGenres();
  }, []);

  return (
    <div className={styles.container}>
      <h3>Movies</h3>
      <div className={styles.searchBar}>
        <Lupa />
        <input
          type="text"
          placeholder="Search Movie"
          className={styles.input}
          onChange={(event) => {
            console.log("value", event.target.value);
            setInputText(event.target.value);
          }}
        />
      </div>

      <div className={styles.genres}>
        <Chip
          key="all"
          name="All"
          onClick={() => setSelectedGenre(null)}
          active={selectedGenre === null}
        />
        {genreList.map((genre) => (
          <Chip
            key={genre.id}
            name={genre.name}
            onClick={() => setSelectedGenre(genre.id)}
            active={selectedGenre === genre.id}
          />
        ))}
      </div>
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
