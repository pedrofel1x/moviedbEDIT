import { Link } from "react-router-dom";
import Botao from "../Botao/Botao";
import styles from "./navbar.module.css";

function NavBar() {
  return (
    <nav>
      <div className={styles.navHome}>
        <Link to="/">
          <Botao variant="primary">MovieDB</Botao>
        </Link>
      </div>
      <div className={styles.navButtons}>
        <Link to="moviesList">
          <Botao variant="secondary">Filmes</Botao>
        </Link>
        <Link to="seriesList">
          <Botao variant="secondary">Séries</Botao>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
