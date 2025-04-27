import { StrictMode } from "react";
import { BrowserRouter} from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);
