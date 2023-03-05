import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
// const AddUser = lazy(() => import("./pages/Test/AddUser"));
// const UpdateUser = lazy(() => import("./pages/Test/Update/Info"));

// table
const Table = lazy(() => import("./components/Tables"));

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Suspense fallback={<Loader />}>
                                <Home />
                            </Suspense>
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="admin" element={<Admin />} />
                    </Route>
                    <Route
                        path="/*"
                        element={
                            <Suspense fallback={<Loader />}>
                                <NotFound />
                            </Suspense>
                        }
                    />
                    // Login
                    <Route
                        path="/login"
                        element={
                            <Suspense fallback={<Loader />}>
                                <Login />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/forgot_password"
                        element={
                            <Suspense fallback={<Loader />}>
                                <ForgotPassword />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/reset_password"
                        element={
                            <Suspense fallback={<Loader />}>
                                <ResetPassword />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/adminpanel"
                        element={
                            <Suspense fallback={<Loader />}>
                                <AdminPanel />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/jobentry"
                        element={
                            <Suspense fallback={<Loader />}>
                                <JobEntry />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/recordentry"
                        element={
                            <Suspense fallback={<Loader />}>
                                <RecordEntry />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/currentstatus"
                        element={
                            <Suspense fallback={<Loader />}>
                                <CurrentStatus />
                            </Suspense>
                        }
                    />
                    {/* <Route
                        path="/adminpanel/update-info/:userId"
                        element={
                            <Suspense fallback={<Loader />}>
                                <AdminPanel />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/adduser"
                        element={
                            <Suspense fallback={<Loader />}>
                                <AddUser />
                            </Suspense>
                        }
                    /> */}
                    // test
                    <Route
                        path="/test"
                        element={
                            <Suspense fallback={<Loader />}>
                                <Table />
                            </Suspense>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
