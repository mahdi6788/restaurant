import { create } from "zustand";
import Cookies from "js-cookie";
import { useEffect } from "react";

interface ThemeState {
  theme: string;
  toggleTheme: () => void;
}

/// Use create from zustand to define a store that is a hook (useThemeStore) that holds state and actions. 
/// Use set to update state and get to access current state.
export const useThemeStore = create<ThemeState>((set, get) => ({
  /// state and its initial state from cookies or defaults
  theme: Cookies.get("theme") || "light",
  /// action: switches the theme, updates the dark class, and saves to cookies.
  toggleTheme: () => {
    const newTheme = get().theme === "dark" ? "light" : "dark";
    set({ theme: newTheme });
    /// Update the 'dark' class on the html element for CSS theming
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    /// persist the theme to cookies and valid for 1 year
    Cookies.set("theme", newTheme, { expires: 365 });
  },
}));

/// Initialize Theme on App Load
export function ThemeInitializer() {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return null;
}
