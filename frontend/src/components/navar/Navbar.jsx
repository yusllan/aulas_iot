import React from "react";
import styles from "./Navbar.module.css";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const Navbar = ({ title, darkMode, setDarkMode }) => (
  <div className={`${styles.navbar} ${darkMode ? styles.dark : styles.light}`}>
    <h1>{title}</h1>
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={darkMode ? styles.darkButton : styles.lightButton}
    >
      {darkMode ? (
        <>
          <Brightness7Icon />
        </>
      ) : (
        <>
          <DarkModeIcon />
        </>
      )}
    </button>
  </div>
);

export default Navbar;
