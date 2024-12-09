import React from "react";
import styles from "./Switcher.module.css";
import { useContext } from "react";
import { ThemeContext } from "./SwitcherApp";

const Header = () => {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Theme Switcher</h1>
      <button onClick={toggleTheme} className={styles.button}>
        Toggle Theme
      </button>
    </header>
  );
};

export default Header;
