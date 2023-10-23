import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";

const ThemeContext = createContext({
  theme: "light",
  // @ts-ignore
  setTheme: (theme: string) => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const userPreferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    return localStorage.getItem("selectedTheme") || userPreferredTheme;
  });

  useEffect(() => {
    const currentTheme = localStorage.getItem("selectedTheme") || "light";
    document.querySelector("body")?.setAttribute("data-theme", currentTheme);
    setTheme(currentTheme);
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.setAttribute("data-theme", theme);
    }

    const userPreferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    setTheme(() => localStorage.getItem("selectedTheme") || userPreferredTheme);

    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleDarkModeChange = (event: MediaQueryListEvent) => {
      const newTheme = event.matches ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem("selectedTheme", newTheme);
    };

    darkModeMediaQuery.addEventListener("change", handleDarkModeChange);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
    };
  }, [theme]);

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
    localStorage.setItem("selectedTheme", selectedTheme);
    document.querySelector("body")?.setAttribute("data-theme", selectedTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme: theme, setTheme: handleThemeChange }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };
