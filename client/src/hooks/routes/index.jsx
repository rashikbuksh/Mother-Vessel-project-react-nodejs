import { Navigate } from "react-router-dom";
import { useAuth } from "../auth";

export function AccountsManagerRoutes({ children }) {
    const { cookies } = useAuth();
    const session_token = localStorage.getItem('token')
    const cookies_value = cookies.token.split("-");
    const cookies_token = cookies_value[0];
    const role = cookies_value[1];
    if (role === "undefined" || session_token!=cookies_token) return <Navigate to="/login" />;

    return role === "accounts-manager" || role === "admin" ? (
        children
    ) : (
        <Navigate to="/noaccess" />
    );
}

export function AccountsRoutes({ children }) {
    const { cookies } = useAuth();
    const session_token = localStorage.getItem('token')
    const cookies_value = cookies.token.split("-");
    const cookies_token = cookies_value[0];
    const role = cookies_value[1];
    if (role === "undefined" || session_token!=cookies_token) return <Navigate to="/login" />;

    return role === "accounts" || role === "admin" ? (
        children
    ) : (
        <Navigate to="/noaccess" />
    );
}

export function OperationRoutes({ children }) {
    const { cookies } = useAuth();
    const session_token = localStorage.getItem('token')
    const cookies_value = cookies.token.split("-");
    const cookies_token = cookies_value[0];
    const role = cookies_value[1];
    if (role === "undefined" || session_token!=cookies_token) return <Navigate to="/login" />;
    return role === "operations" || role === "admin" ? (
        children
    ) : (
        <Navigate to="/noaccess" />
    );
}

export function AdminRoutes({ children }) {
    const { cookies } = useAuth();
    const session_token = localStorage.getItem('token')
    const cookies_value = cookies.token.split("-");
    const cookies_token = cookies_value[0];
    const role = cookies_value[1];
    if (role === "undefined" || session_token!=cookies_token) return <Navigate to="/login" />;
    return role === "admin" ? children : <Navigate to="/noaccess" />;
}
