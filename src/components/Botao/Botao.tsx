import styles from "./botao.module.css";

interface IBotao {
  children: string;
  variant: "primary" | "secondary";
}

function Botao({ children, variant }: IBotao) {
  return <button className={styles[variant]}>{children}</button>;
  console.log("botao");
}

export default Botao;
