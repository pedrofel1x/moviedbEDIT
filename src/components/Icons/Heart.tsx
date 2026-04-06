import { useState } from "react";

function Heart() {
  const [active, setActive] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Impede que o clique no coração abra o filme, se estiver dentro de um Link
    setActive(!active);
  };

  return (
    <div
      onClick={toggleFavorite}
      style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        /* A lógica da cor está aqui */
        fill={active ? "red" : "none"}
        stroke={active ? "red" : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "all 0.3s ease" }}
      >
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
      </svg>
    </div>
  );
}

export default Heart;
