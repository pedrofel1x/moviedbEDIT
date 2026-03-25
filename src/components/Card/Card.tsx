import type { IMovie } from "../../types/movie";
import type { ISerie } from "../../types/Serie";
import style from "./card.module.css";

interface IMovieCard {
  content: IMovie | ISerie;
}
function Card({ content }: IMovieCard) {
  const name =
    `original_title` in content
      ? content.original_title
      : content.original_name;
  return (
    <div className={style.card}>
      <img src={`https://image.tmdb.org/t/p/w500${content.poster_path}`} />
      <div className={style.info}>
        <strong>{name}</strong>
        <span>{content.vote_average.toFixed(1)}/10</span>
      </div>
    </div>
  );
}

export default Card;
