import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./utils/constants";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<GlobalStyles></GlobalStyles>
				<App />
			</ThemeProvider>
		</BrowserRouter>
	</StrictMode>
);
