import { Navigate } from "react-router-dom";
import { useAuth } from "../auth";

export function AccountsManagerRoutes({ children }) {
    const { cookies } = useAuth();
    if (cookies.token === "undefined") return <Navigate to="/login" />;

    return cookies.token === "accounts-manager" || cookies.token === "admin" ? (
        children
    ) : (
        <Navigate to="/noaccess" />
    );
}

export function AccountsRoutes({ children }) {
    const { cookies } = useAuth();
    if (cookies.token === "undefined") return <Navigate to="/login" />;

    return cookies.token === "accounts" || cookies.token === "admin" ? (
        children
    ) : (
        <Navigate to="/noaccess" />
    );
}

export function OperationRoutes({ children }) {
    const { cookies } = useAuth();
    if (cookies.token === "undefined") return <Navigate to="/login" />;
    return cookies.token === "operations" || cookies.token === "admin" ? (
        children
    ) : (
        <Navigate to="/noaccess" />
    );
}

export function AdminRoutes({ children }) {
    const { cookies } = useAuth();
    if (cookies.token === "undefined") return <Navigate to="/login" />;
    return cookies.token === "admin" ? children : <Navigate to="/noaccess" />;
}
