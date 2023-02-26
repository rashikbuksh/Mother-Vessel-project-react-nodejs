import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loader from "./utils/Loader";
const NotFound = lazy(() => import("./layout/NotFound"));

const Home = lazy(() => import("./pages/Home/Shared/Layout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
// Login
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/Login/Forgot_Password"));
const ResetPassword = lazy(() => import("./pages/Login/Reset_password"));

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
                        <Route path="products" element={<Products />} />
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
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
