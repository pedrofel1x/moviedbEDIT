import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Home from "./Home.tsx";
import MovieList from "./pages/MovieList.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <NavBar />
    <Home />
    <MovieList />
  </StrictMode>,
);
