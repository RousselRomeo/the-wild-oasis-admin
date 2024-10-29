/*eslint-disable react/prop-types*/

import { createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
export const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme:dark)").matches,
    "isDarkMode"
  ); //if operatin systemmin darkmode  ,application will be indarkmode
  // const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  useEffect(function () {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  });

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// function useDarkMode() {
//   const context = useContext(DarkModeContext);
//   if (context === undefined)
//     throw new Error("DarkModeContext was used outside of DarkModeProvider");
//   return context;
// }

export { DarkModeProvider };
