import React from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { FcBullish } from "react-icons/fc";
import { HiOutlineLogout } from "react-icons/hi";
import {
    DASHBOARD_SIDEBAR_LINKS,
    DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "./data";

const linkClass =
    "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export default function Sidebar() {
    const logout = () => {
        const logout = () => {
            localStorage.removeItem("user");
            window.location.href = "/login";
        };
    };
    return (
        <div className="flex flex-col bg-neutral-900 p-3">
            <div className="flex items-center gap-2 px-1 py-3">
                <FcBullish fontSize={24} />
                <span className="text-lg text-neutral-200">LVTS</span>
            </div>
            <div className="flex flex-1 flex-col gap-0.5 py-8">
                {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
            </div>
            <div className="flex flex-col gap-0.5 border-t border-neutral-700 pt-2">
                {/* {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))} */}
                <button onClick={logout}>
                <div
                    className={classNames(
                        linkClass,
                        "cursor-pointer text-red-500"
                    )}
                >
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Logout
                </div>
                </button>
            </div>
        </div>
    );
}

function SidebarLink({ link }) {
    const { pathname } = useLocation();

    return (
        <Link
            to={link.path}
            className={classNames(
                pathname === link.path
                    ? "bg-neutral-700 text-white"
                    : "text-neutral-400",
                linkClass
            )}
        >
            <span className="text-xl">{link.icon}</span>
            {link.label}
        </Link>
    );
}
