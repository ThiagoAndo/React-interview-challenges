import Header from "./Header";
import Content from "./Content";
import styles from "./Switcher.module.css";
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

const ThemePvovider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

   useEffect(() => {
     document.body.setAttribute("data-theme", theme);
   }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function SwitcherApp() {
  return (
    <ThemePvovider>
      <div className={styles.App}>
        <Header />
        <Content />
      </div>
    </ThemePvovider>
  );
}




// function SwitcherApp() {
//   return (
//     <div className={styles.App}>
//       <Header />
//       <Content />
//     </div>
//   );
// }
export default SwitcherApp;
