import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Home from "./Home.tsx";
import MoviesList from "./pages/MoviesList.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import SeriesList from "./pages/SeriesList.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <NavBar />
    <Home />
    <MoviesList />
    <SeriesList />
  </StrictMode>,
);
