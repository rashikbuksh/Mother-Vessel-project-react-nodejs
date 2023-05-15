import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import {
    AccountsManagerRoutes,
    AccountsRoutes,
    AdminRoutes,
    OperationRoutes,
} from "./hooks/routes";

import Loader from "./utils/Loader";
import { Toast } from "./components/Toast";

const NotFound = lazy(() => import("./layout/NotFound"));
const NoAccess = lazy(() => import("./utils/NoAccess"));

const Home = lazy(() => import("./pages/Home/Shared/Layout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Admin = lazy(() => import("./pages/Admin"));
// Login
const Login = lazy(() => import("./pages/Login"));

//admin panel
const AdminPanel = lazy(() => import("./pages/Admin"));
const JobEntry = lazy(() => import("./pages/JobEntry"));
const RecordEntry = lazy(() => import("./pages/RecordEntry"));
const CurrentStatus = lazy(() => import("./pages/CurrentStatus"));
const PreDefinedShip = lazy(() => import("./pages/PreDefinedShip"));
const PreDefinedAdmin = lazy(() => import("./pages/PreDefinedAdmin"));
const DamarageCalculation = lazy(() => import("./pages/DamarageCalculation"));
const ChqDueList = lazy(() => import("./pages/ChqDueList"));
const ChqApproval = lazy(() => import("./pages/ChqApproval"));
const Payment = lazy(() => import("./pages/Payment"));
const Profile = lazy(() => import("./pages/PreDefinedShip/Profile"));

// table
const Table = lazy(() => import("./components/Tables"));
const Navbar = lazy(() => import("./components/Navbar"));
const PingLoader = lazy(() => import("./utils/PingLoader"));

const PublicRoutesList = [
    {
        link: "/",
        component: Login,
    },
    {
        link: "/login",
        component: Login,
    },
    {
        link: "/no-access",
        component: NoAccess,
    },
    {
        link: "/*",
        component: NotFound,
    },
    // {
    //     link: "/test",
    //     component: Navbar,
    // },
];

const OperationRoutesList = [
    {
        link: "/record-entry",
        component: RecordEntry,
    },
    {
        link: "/current-status",
        component: CurrentStatus,
    },
    {
        link: "/damarage-calculation",
        component: DamarageCalculation,
    },
    {
        link: "/own-ship",
        component: PreDefinedShip,
    },
];

const AccountsRoutesList = [
    {
        link: "/job-entry",
        component: JobEntry,
    },
];

const AccountsManagerRoutesList = [
    {
        link: "/chq-due-list",
        component: ChqDueList,
    },
    {
        link: "/chq-approval",
        component: ChqApproval,
    },
    {
        link: "/payment",
        component: Payment,
    },
];

const AdminRoutesList = [
    {
        link: "/admin-panel",
        component: AdminPanel,
    },
    {
        link: "/record-entry",
        component: RecordEntry,
    },
    {
        link: "/current-status",
        component: CurrentStatus,
    },
    {
        link: "/own-ship",
        component: PreDefinedShip,
    },
    {
        link: "/damarage-calculation",
        component: DamarageCalculation,
    },
    {
        link: "/chq-duelist",
        component: ChqDueList,
    },
    {
        link: "/chq-approval",
        component: ChqApproval,
    },
    {
        link: "/payment",
        component: Payment,
    },
    {
        link: "/job-entry",
        component: JobEntry,
    },
];

function App() {
    return (
        <>
            <Navbar />
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

                <Route
                    path="/test"
                    element={
                        <Suspense fallback={<Loader />}>
                            <Profile />
                        </Suspense>
                    }
                />
            </Routes>
            <Toast />
        </>
    );
}

export default App;
