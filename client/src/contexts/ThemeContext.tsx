/* eslint-disable react/prop-types */
/**
 * @author nikhilkrdwivedi
 *
 *
 */
import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};
const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }:any) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext) as ThemeContextType;
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
