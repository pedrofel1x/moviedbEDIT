import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { IMovie } from "../types/movie";
import Card from "../components/Card/Card";
import Actors from "../components/Actors/Actors";
import styles from "./detailspage.module.css";
import Botao from "../components/Botao/Botao";

function DetailsPage() {
  const { filme, serie } = useParams();
  console.log(filme);

  const selected = filme || serie;
  const [item, setItem] = useState<IMovie>();

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
      const type = filme ? "movie" : "tv";
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${selected}`,
        options,
      );
      const data = await response.json();
      console.log("movie", data);
      setItem(data);
    };
    fetchData();
  }, [selected]);

  return (
    <div className={styles.content}>
      <Link to={filme ? "/moviesList" : "/seriesList"}>
        <Botao variant="primary"> Back to list</Botao>
      </Link>
      <div className={styles.poster}>
        <h1>Imagem</h1>
      </div>
      <div className={styles.chips}>Chips</div>
      <div className={styles.title}>
        <h2>{item?.original_title || item?.name}</h2>
        <h4>{item?.overview}</h4>
      </div>
      <div className={styles.casting}>
        Actors
        <Actors filme_id={selected} />
      </div>
    </div>
  );
}

export default DetailsPage;
