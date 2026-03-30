import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IMovie } from "../types/movie";
import Card from "../components/Card/Card";
import Actors from "../components/Actors/Actors";
import styles from "./detailspage.module.css";

function DetailsPage() {
  const { filme } = useParams();
  console.log(filme);

  const [movie, setMovie] = useState<IMovie>();

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
        `https://api.themoviedb.org/3/movie/${filme}`,
        options,
      );
      const data = await response.json();
      console.log("movie", data);
      setMovie(data);
    };
    fetchData();
  }, [filme]);

  return (
    <div className={styles.content}>
      <div className={styles.poster}>
        <h1>Imagem</h1>
      </div>
      <div className={styles.chips}>Chips</div>
      <div className={styles.title}>
        <h2>{movie?.original_title}</h2>
        <h4>{movie?.overview}</h4>
      </div>
      <div className={styles.casting}>
        Actors
        <Actors filme_id={filme} />
      </div>
    </div>
  );
}

export default DetailsPage;
