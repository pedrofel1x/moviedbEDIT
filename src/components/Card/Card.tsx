import { useParams } from "react-router-dom";
import type { IMovie } from "../../types/movie";
import type { ISerie } from "../../types/Serie";
import style from "./card.module.css";
import Star from "../Icons/Star";

interface IMovieCard {
  content: IMovie | ISerie;
}

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.round(rating / 2); // Converte 10 em 5

  for (let i = 1; i <= 5; i++) {
    stars.push(<Star key={i} active={i <= fullStars} />);
  }
  return stars;
};
function Card({ content }: IMovieCard) {
  const name = `original_title` in content ? content.title : content.name;

  return (
    <div className={style.card}>
      <img src={`https://image.tmdb.org/t/p/w500${content.poster_path}`} />
      <div className={style.info}>
        <strong>{name}</strong>
        <div className={style.starsRow}>
          {renderStars(content.vote_average)}
        </div>
      </div>
    </div>
  );
}

export default Card;
