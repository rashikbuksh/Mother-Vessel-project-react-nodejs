import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import {
    AccountsManagerRoutes,
    AccountsRoutes,
    AdminRoutes,
    OperationRoutes,
} from "./hooks/routes";

import Loader from "./utils/Loader";
const NotFound = lazy(() => import("./layout/NotFound"));
const NoAccess = lazy(() => import("./utils/NoAccess"));

const Home = lazy(() => import("./pages/Home/Shared/Layout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Admin = lazy(() => import("./pages/Admin"));
// Login
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/Login/Forgot_Password"));
const ResetPassword = lazy(() => import("./pages/Login/Reset_password"));
//admin panel
const AdminPanel = lazy(() => import("./pages/Admin"));
const JobEntry = lazy(() => import("./pages/JobEntry"));
const RecordEntry = lazy(() => import("./pages/RecordEntry"));
const CurrentStatus = lazy(() => import("./pages/CurrentStatus"));
const DamarageCalculation = lazy(() => import("./pages/DamarageCalculation"));
const ChqDueList = lazy(() => import("./pages/ChqDueList"));
const ChqApproval = lazy(() => import("./pages/ChqApproval"));
const Payment = lazy(() => import("./pages/Payment"));
// const AddUser = lazy(() => import("./pages/Test/AddUser"));
// const UpdateUser = lazy(() => import("./pages/Test/Update/Info"));

// table
const Table = lazy(() => import("./components/Tables"));
// import AdminRoutes from "./hooks/routes/AdminRoutes";

const RoutePages = [
    {
        link: "/",
        component: Home,
    },
    {
        link: "/admin",
        component: Admin,
    },
    {
        link: "/login",
        component: Login,
    },
    {
        link: "/forgot_password",
        component: ForgotPassword,
    },
    {
        link: "/reset_password",
        component: ResetPassword,
    },
    {
        link: "/adminpanel",
        component: AdminPanel,
    },
    {
        link: "/jobentry",
        component: JobEntry,
    },
    {
        link: "/recordentry",
        component: RecordEntry,
    },
    {
        link: "/currentstatus",
        component: CurrentStatus,
    },
    {
        link: "/damaragecalculation",
        component: DamarageCalculation,
    },
    {
        link: "/test",
        component: Table,
    },
    {
        link: "/*",
        component: NotFound,
    },
];

const PublicRoutesList = [
    {
        link: "/login",
        component: Login,
    },
    {
        link: "/noaccess",
        component: NoAccess,
    },
    {
        link: "/*",
        component: NotFound,
    },
    {
        link: "/test",
        component: Table,
    },
];

const OperationRoutesList = [
    {
        link: "/recordentry",
        component: RecordEntry,
    },
    {
        link: "/currentstatus",
        component: CurrentStatus,
    },
    {
        link: "/damaragecalculation",
        component: DamarageCalculation,
    },
];

const AccountsRoutesList = [
    {
        link: "/jobentry",
        component: JobEntry,
    },
];

const AccountsManagerRoutesList = [
    {
        link: "/chqduelist",
        component: ChqDueList,
    },
    {
        link: "/chqapproval",
        component: ChqApproval,
    },
    {
        link: "/payment",
        component: Payment,
    },
];

const AdminRoutesList = [
    {
        link: "/adminpanel",
        component: AdminPanel,
    },
    {
        link: "/recordentry",
        component: RecordEntry,
    },
    {
        link: "/currentstatus",
        component: CurrentStatus,
    },
    {
        link: "/damaragecalculation", // problem is here ( not updating data)
        component: DamarageCalculation,
    },
    {
        link: "/chqduelist",
        component: ChqDueList,
    },
    {
        link: "/chqapproval",
        component: ChqApproval,
    },
    {
        link: "/payment",
        component: Payment,
    },
    {
        link: "/jobentry",
        component: JobEntry,
    },
];

function App() {
    return (
        <Routes>
            {OperationRoutesList.map((route, index) => (
                <Route
                    key={index}
                    path={route.link}
                    element={
                        <OperationRoutes>
                            <Suspense fallback={<Loader />}>
                                <route.component />
                            </Suspense>
                        </OperationRoutes>
                    }
                />
            ))}
            {AccountsRoutesList.map((route, index) => (
                <Route
                    key={index}
                    path={route.link}
                    element={
                        <AccountsRoutes>
                            <Suspense fallback={<Loader />}>
                                <route.component />
                            </Suspense>
                        </AccountsRoutes>
                    }
                />
            ))}
            {AdminRoutesList.map((route, index) => (
                <Route
                    key={index}
                    path={route.link}
                    element={
                        <AdminRoutes>
                            <Suspense fallback={<Loader />}>
                                <route.component />
                            </Suspense>
                        </AdminRoutes>
                    }
                />
            ))}
            {AccountsManagerRoutesList.map((route, index) => (
                <Route
                    key={index}
                    path={route.link}
                    element={
                        <AccountsManagerRoutes>
                            <Suspense fallback={<Loader />}>
                                <route.component />
                            </Suspense>
                        </AccountsManagerRoutes>
                    }
                />
            ))}

            {PublicRoutesList.map((route, index) => (
                <Route
                    key={index}
                    path={route.link}
                    element={
                        <Suspense fallback={<Loader />}>
                            <route.component />
                        </Suspense>
                    }
                />
            ))}
        </Routes>
    );
}

export default App;
