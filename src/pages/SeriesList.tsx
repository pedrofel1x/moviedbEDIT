import { useEffect, useState } from "react";
import type { ISerie } from "../types/Serie";
import Card from "../components/Card/Card";

import "./movielist.css";

function SeriesList() {
  const [series, setSeries] = useState<ISerie[]>([]);
  console.log("series", series);

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
    <>
      <h3>TV Shows</h3>
      <div className="list">
        {series.map((serie) => (
          <Card content={serie} />
        ))}
      </div>
    </>
  );
}

export default SeriesList;
