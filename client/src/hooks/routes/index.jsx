import { Navigate } from "react-router-dom";
import { useAuth } from "../auth";

export function AccountsManagerRoutes({ children }) {
    const { cookies } = useAuth();
    const myArray = cookies.token.split("-");
    const role = myArray[1];
    if (role === "undefined") return <Navigate to="/login" />;

    return role === "accounts-manager" || role === "admin" ? (
        children
    ) : (
        <Navigate to="/noaccess" />
    );
}

export function AccountsRoutes({ children }) {
    const { cookies } = useAuth();
    const myArray = cookies.token.split("-");
    const role = myArray[1];
    if (role === "undefined") return <Navigate to="/login" />;

    return role === "accounts" || role === "admin" ? (
        children
    ) : (
        <Navigate to="/noaccess" />
    );
}

export function OperationRoutes({ children }) {
    const { cookies } = useAuth();
    const myArray = cookies.token.split("-");
    const role = myArray[1];
    if (role === "undefined") return <Navigate to="/login" />;
    return role === "operations" || role === "admin" ? (
        children
    ) : (
        <Navigate to="/noaccess" />
    );
}

export function AdminRoutes({ children }) {
    const { cookies } = useAuth();
    const myArray = cookies.token.split("-");
    const role = myArray[1];
    if (role === "undefined") return <Navigate to="/login" />;
    return role === "admin" ? children : <Navigate to="/noaccess" />;
}
