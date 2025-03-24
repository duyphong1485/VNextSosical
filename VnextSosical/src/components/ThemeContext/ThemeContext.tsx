import React, { createContext, useState, useContext, ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from "styled-components";

// Định nghĩa kiểu cho theme
interface Theme {
  background: string;
  text: string;
  cardBackground: string;
}

// Định nghĩa các theme với kiểu
const lightTheme: Theme = {
  background: "#fafafa",
  text: "#333",
  cardBackground: "#ffffff",
};

const darkTheme: Theme = {
  background: "#2a2a2a",
  text: "#ffffff",
  cardBackground: "#333333",
};

// Global Style áp dụng theme cho toàn bộ trang
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    margin: 0;
    padding: 0;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <StyledThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};