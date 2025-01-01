import React from "react";
import styles from "./Switcher.module.css";

const Content = () => {
  return (
    <main className={styles.content}>
      <p className={styles.text}>
        This is the main content area. The background and text color should
        change based on the selected theme.
      </p>
    </main>
  );
};

export default Content;
