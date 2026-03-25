import { useEffect, useState } from "react";
import type { IMovie } from "../types/movie";
import Card from "../components/Card/Card";
import "./movielist.css"

function MoviesList() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  console.log("movies", movies);

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
  }, []);

  return (
    <div className="list">
      {movies.map((movie) => (
        <Card content={movie} />
      ))}
    </div>
  );
}

export default MoviesList;
