import Botao from "../Botao/Botao";
import styles from "./navbar.module.css";

function NavBar() {
  return (
    <nav>
      <div className={styles.navHome}>
        <Botao variant="primary">MovieDB</Botao>
      </div>
      <div className={styles.navButtons}>
        <Botao variant="secondary">Filmes</Botao>
        <Botao variant="secondary">Séries</Botao>
      </div>
    </nav>
  );
}

export default NavBar;
