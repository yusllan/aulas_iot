import React from "react";
import styles from "./Card.module.css";

const Card = ({ title, value, darkMode }) => (
  <div className={`${styles.card} ${darkMode ? styles.dark : styles.light}`}>
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

export default Card;
