import { useEffect, useState } from "react";
import type { IMovie } from "../types/movie";
import Card from "../components/Card/Card";
import styles from "./movielist.module.css";
import { Link } from "react-router-dom";

function PopularList() {
  const [popular, setPopular] = useState<IMovie[]>([]);
  console.log("movies", popular);

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
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        options,
      );
      const popularList = await response.json();
      console.log("popularList", popularList);
      setPopular(popularList.results);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h3>Upcoming</h3>
      <div className={styles.list}>
        {popular.map((popular) => (
          <Link to={"/moviesList/" + popular.id}>
            <Card content={popular} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularList;
