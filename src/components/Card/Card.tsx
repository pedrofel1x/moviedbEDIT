import type { IMovie } from "../../types/movie";
import type { ISerie } from "../../types/Serie";
import "./card.css";

interface IMovieCard {
  content: IMovie;
}
function Card({ content }: IMovieCard) {
  return (
    <div className="card">
      <h3>{content.original_title}</h3>
      <img src={`https://image.tmdb.org/t/p/w500${content.poster_path}`} />
    </div>
  );
}

export default Card;
