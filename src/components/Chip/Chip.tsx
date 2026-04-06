import { useEffect, useState } from "react";
import styles from "./chip.module.css";
import type { IMovie } from "../../types/movie";
import { useParams } from "react-router-dom";

interface IValue {
  name: string;
}

function Chip({ name }: IValue) {
  return (
    <div>
      <button className={styles.chip}>
        <span>{name}</span>
      </button>
    </div>
  );
}

export default Chip;
