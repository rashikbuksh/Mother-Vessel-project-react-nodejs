import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useAuthContext } from "./layout/Routing/useAuthContext";
import ProtectedRoute from "./layout/Routing";

import Loader from "./utils/Loader";
const NotFound = lazy(() => import("./layout/NotFound"));

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
// const AddUser = lazy(() => import("./pages/Test/AddUser"));
// const UpdateUser = lazy(() => import("./pages/Test/Update/Info"));

// table
const Table = lazy(() => import("./components/Tables"));

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

function App() {
    const { user } = useAuthContext();

    console.log(user?.position);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* <Route element={<ProtectedRoute isAllowed={!!user} />}>
                        <Route
                            path="/"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <Home />
                                </Suspense>
                            }
                        >
                            <Route index element={<Dashboard />} />
                            <Route path="adminpanel" element={<AdminPanel />} />
                        </Route>
                    </Route> */}
                    {/* <Route
                        element={
                            <ProtectedRoute
                                redirectPath="/login"
                                isAllowed={user && user?.position === "admin"}
                            />
                        }
                    >
                        <Route path="/adminpanel" element={<AdminPanel />} />
                    </Route> */}

                    <Route
                        path="/adminpanel"
                        element={
                            <ProtectedRoute role={user?.position}>
                                <AdminPanel />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <Suspense fallback={<Loader />}>
                                <Login />
                            </Suspense>
                        }
                    />
                    {/* {RoutePages.map((route, index) => (
                        <Route
                            key={index}
                            path={route.link}
                            element={
                                <Suspense fallback={<Loader />}>
                                    <route.component />
                                </Suspense>
                            }
                        />
                    ))} */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
