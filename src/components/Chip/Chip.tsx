import { useEffect, useState } from "react";
import styles from "./chip.module.css";
import type { IMovie } from "../../types/movie";
import { useParams } from "react-router-dom";

interface IValue {
  name: string;

  onClick?: () => void;
  active?: boolean;
  icon?: React.ReactNode;
}

function Chip({ name, onClick, active, icon }: IValue) {
  return (
    <div>
      <button
        className={`${styles.chip} ${active ? styles.active : ""}`}
        onClick={onClick}
      >
        {name}
        {icon}
      </button>
    </div>
  );
}

export default Chip;
