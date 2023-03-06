import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role, redirectPath = "/login", children }) => {
    if (role !== "admin") {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
