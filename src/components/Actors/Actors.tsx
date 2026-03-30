import { useParams } from "react-router-dom";
import type { IActor } from "../../types/movie";
import { useEffect, useState } from "react";

interface IActors {
  filme_id: number;
}
function Actors({ filme_id }: IActors) {
  const [actors, setActors] = useState<IActor[]>([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzRjM2ZlOWIyZGQ5YmQxNTQzYzhlZWRiYTU0ZTkzMSIsIm5iZiI6MTc0MjE1NzE2My4wMjksInN1YiI6IjY3ZDczNTZiMzE1MzhkZTYwOGYxYmFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g1NFgZQFkQCTa6A5ffKDJXyLcmnKxXKA2xoTRTViHcE",
      },
    };
    const fetchActors = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${filme_id}/credits`,
        options,
      );
      const data = await response.json();
      setActors(data.cast);
    };
    fetchActors();
  }, []);

  return (
    <div>
      {actors.slice(0, 10).map((actor) => (
        <p>{actor.original_name}</p>
      ))}
    </div>
  );
}
export default Actors;
