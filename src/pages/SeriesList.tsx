import { useEffect, useState } from "react";
import type { ISerie } from "../types/Serie";

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
    <div>
      {series.map((serie) => (
        <div>
          <h1>{serie.original_name}</h1>
        </div>
      ))}
    </div>
  );
}

export default SeriesList;
