import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Home from "./Home.tsx";
import MoviesList from "./pages/MoviesList.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import SeriesList from "./pages/SeriesList.tsx";
import Card from "./components/Card/Card.tsx";
import DetailsPage from "./pages/DetailsPage.tsx";
import PopularList from "./pages/PopularList.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      {" "}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movieslist">
          <Route index element={<MoviesList />} />
          <Route path=":filme" element={<DetailsPage />} />
        </Route>
        <Route path="serieslist">
          <Route index element={<SeriesList />} />
          <Route path=":serie" element={<DetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    {/* <MoviesList />
    <SeriesList /> */}
  </StrictMode>,
);
