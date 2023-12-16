import React, { useState, useEffect, createContext, useContext } from "react";

type ModeType = "light" | "dark";
interface ThemeContextProps {
  mode: ModeType;
  setMode: (mode: ModeType) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ModeType>("light");

  useEffect(() => {
    if (mode === "dark") {
      //   setMode("dark");
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      //   setMode("light");
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
