import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./layout/Routing/AuthProvider";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>
);
