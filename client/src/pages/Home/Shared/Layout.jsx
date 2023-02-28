import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import React, { useEffect, useState } from "react";

export default function Layout() {
    if (localStorage.getItem("user_type") == "admin") {
        window.location.href = "/adminpanel";
    } else if (localStorage.getItem("user_type") == "Manager") {
    } else {
        window.location.href = "/login";
    }
    return (
        <div className="flex h-screen w-screen flex-row overflow-hidden bg-neutral-100">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <Header />
                <div className="min-h-0 flex-1 overflow-auto p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
