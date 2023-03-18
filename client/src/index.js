import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "./hooks";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <BrowserRouter>
            <AppProvider>
                <App />
            </AppProvider>
        </BrowserRouter>
    </StrictMode>
);
