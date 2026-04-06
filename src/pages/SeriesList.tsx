import { useEffect, useState } from "react";
import type { ISerie } from "../types/Serie";
import Card from "../components/Card/Card";

import styles from "./movielist.module.css";
import { Link } from "react-router-dom";

function SeriesList() {
  const [series, setSeries] = useState<ISerie[]>([]);
  console.log("series", series);

  const [inputText, setInputText] = useState("");

  const filteredSeries = series.filter((serie) => {
    const serieName = serie.original_name.toLowerCase();
    const input = inputText.toLowerCase();
    return serieName.includes(input);
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
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/tv",
        options,
      );
      const seriesList = await response.json();
      console.log("seriesList", seriesList);
      setSeries(seriesList.results);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h3>TV Shows</h3>
      <input
        type="text"
        placeholder="Search Movie"
        onChange={(event) => {
          console.log("value", event.target.value);
          setInputText(event.target.value);
        }}
      />{" "}
      <div className={styles.list}>
        {filteredSeries.map((serie) => (
          <Link to={"/seriesList/" + serie.id}>
            <Card content={serie} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SeriesList;
