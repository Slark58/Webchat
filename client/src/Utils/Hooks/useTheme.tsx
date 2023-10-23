import { useEffect } from "react";
import { useTheme } from "@/App/Providers/ThemeProvider";

const useTheme = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // @ts-ignore
    document.querySelector<HTMLBodyElement>("body").setAttribute("data-theme", theme);

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
  }, [theme, setTheme]);

  return { theme, setTheme };
};

export { useTheme };
