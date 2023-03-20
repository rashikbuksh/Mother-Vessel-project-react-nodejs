import { Navigate } from "react-router-dom";
import { useAuth } from "../auth";

export function AccountsManagerRoutes({ children }) {
    const { cookies } = useAuth();
    const session_token = localStorage.getItem('token')
    const cookies_value = cookies.token.split("-");
    const cookies_token = cookies_value[0];
    const role = cookies_value[1];
    const substitute = parseInt(cookies_value[2]);
    const original_ascii = [];
    for(var i=0;i<role.length;i++){
        original_ascii.push(role.codePointAt(i)+substitute);
        //console.log(response.data.position.codePointAt(i));
    }
    const original_role = String.fromCharCode(...original_ascii);

    if (original_role === "undefined" || session_token!=cookies_token) return <Navigate to="/login" />;

    return original_role === "accounts-manager" || original_role === "admin" ? (
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
    const substitute = parseInt(cookies_value[2]);
    const original_ascii = [];
    for(var i=0;i<role.length;i++){
        original_ascii.push(role.codePointAt(i)+substitute);
        //console.log(response.data.position.codePointAt(i));
    }
    const original_role = String.fromCharCode(...original_ascii);

    if (original_role === "undefined" || session_token!=cookies_token) return <Navigate to="/login" />;

    return original_role === "accounts" || original_role === "admin" ? (
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
    const substitute = parseInt(cookies_value[2]);
    const original_ascii = [];
    for(var i=0;i<role.length;i++){
        original_ascii.push(role.codePointAt(i)+substitute);
        //console.log(response.data.position.codePointAt(i));
    }
    const original_role = String.fromCharCode(...original_ascii);

    if (original_role === "undefined" || session_token!=cookies_token) return <Navigate to="/login" />;
    return original_role === "operations" || original_role === "admin" ? (
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
    const substitute = parseInt(cookies_value[2]);
    const original_ascii = [];
    for(var i=0;i<role.length;i++){
        original_ascii.push(role.codePointAt(i)+substitute);
        //console.log(response.data.position.codePointAt(i));
    }
    const original_role = String.fromCharCode(...original_ascii);

    if (original_role == "undefined" || session_token!=cookies_token) return <Navigate to="/login" />;
    return original_role == "admin" ? children : <Navigate to="/noaccess" />;
}
