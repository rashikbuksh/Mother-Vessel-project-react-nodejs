import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
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
