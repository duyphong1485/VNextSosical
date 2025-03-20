import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./utils/constants";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById("root")!).render(
	<StrictMode>

			<ThemeProvider theme={theme}>
				<GlobalStyles></GlobalStyles>
				<BrowserRouter>
				<App />
				<ToastContainer></ToastContainer>
				</BrowserRouter>
			</ThemeProvider>
	</StrictMode>
);
