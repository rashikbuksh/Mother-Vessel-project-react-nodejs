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
//product
const AdminPanel = lazy(() => import("./pages/Admin/AdminPanel"));
const AddUser = lazy(() => import("./pages/Admin/AddUser"));
const UpdateUser = lazy(() => import("./pages/Admin/Update/Info"));

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
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
