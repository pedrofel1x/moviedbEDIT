import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { IMovie } from "../types/movie";
import Card from "../components/Card/Card";
import Actors from "../components/Actors/Actors";
import styles from "./detailspage.module.css";
import Botao from "../components/Botao/Botao";
import Chip from "../components/Chip/Chip";
import type { ISerie } from "../types/Serie";
import Star from "../components/Icons/Star";
import ArrowLeft from "../components/Icons/ArrowLeft";

import ArrowRight from "../components/Icons/ArrowRight";
import Heart from "../components/Icons/Heart";

function DetailsPage() {
  const { filme, serie } = useParams();
  console.log(filme);

  const selected = filme || serie;
  const [item, setItem] = useState<IMovie | ISerie>();
  const [similarMovies, setSimilarMovies] = useState<IMovie[]>([]);
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

      const similarResponse = await fetch(
        `https://api.themoviedb.org/3/${type}/${selected}/recommendations`,
        options,
      );
      const similarData = await similarResponse.json();
      setSimilarMovies(similarData.results.slice(0, 8));
    };
    fetchData();
  }, [selected]);

  return (
    <div className={styles.content}>
      <div className={styles.botao}>
        <Link to={filme ? "/moviesList" : "/seriesList"}>
          <Botao variant="primary">
            {" "}
            <ArrowLeft />
          </Botao>
        </Link>
      </div>
      <div className={styles.hero}>
        <div
          className={styles.backdrop}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item?.backdrop_path})`,
          }}
        />
        <div className={styles.poster}>
          <img src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`} />
        </div>
        <div className={styles.info}></div>
      </div>

      <div className={styles.chipcontent}>
        <div className={styles.chips}>
          <Chip
            name={item?.vote_average.toFixed(1)}
            icon={<Star active={true} />}
          />

          {item?.genres?.map((genre) => (
            <Chip key={genre.id} name={genre.name} />
          ))}
        </div>
        <div className={styles.heart}>
          <Heart />
        </div>
      </div>
      <div className={styles.title}>
        <h2>{item?.title || item?.name}</h2>
        <h4>{item?.overview}</h4>
      </div>
      <div className={styles.casting}>
        <h3>Actors</h3>
        <Actors
          key={selected}
           filme_id={selected}
          type={filme ? "movie" : "tv"}
        />
      </div>
      <div className={styles.similar}>
        <h3>Recommended</h3>
        <div className={styles.similarList}>
          {similarMovies.map((movie) => (
            <Link
              key={movie.id}
              to={`/${filme ? "moviesList" : "seriesList"}/${movie.id}`}
            >
              <Card content={movie} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
