import { useAuth } from "../../hooks/auth";
import { DefineRole } from "../../hooks/routes";

const NavLinks = [
    {
        id: 1,
        link: "/adminpanel",
        name: "Admin Panel",
        role: ["admin"],
    },
    {
        id: 2,
        link: "/recordentry",
        name: "Record Entry",
        role: ["admin", "operation"],
    },
    {
        id: 3,
        link: "/currentstatus",
        name: "Current Status",
        role: ["admin", "operation"],
    },
    {
        id: 4,
        link: "/predefinedship",
        name: "Pre Defined Ship",
        role: [],
    },
    {
        id: 5,
        link: "/damaragecalculation",
        name: "Damarage Calculation",
        role: ["admin", "operation"],
    },
    {
        id: 6,
        link: "/chqduelist",
        name: "Chq Due List",
        role: ["admin", "accounts-manager"],
    },
    {
        id: 7,
        link: "/chqapproval",
        name: "Chq Approval",
        role: ["admin", "accounts-manager"],
    },
    {
        id: 8,
        link: "/payment",
        name: "Payment",
        role: ["admin", "accounts-manager"],
    },
    {
        id: 9,
        link: "/jobentry",
        name: "Job Entry",
        role: ["admin", "accounts"],
    },
];

function Nav() {
    const { logout } = useAuth();
    const { original_role } = DefineRole();
    return (
        <div
            className={`flex flex-wrap place-items-center ${
                (window.location.pathname === "/login" ||
                    window.location.pathname === "/") &&
                "hidden"
            } `}
        >
            <section className="relative mx-auto">
                <nav className="flex w-screen justify-between rounded-b-md bg-green-700 text-white">
                    <div className="flex w-full items-center  px-5 py-2 xl:px-8">
                        <a
                            className="font-heading text-2xl font-bold"
                            href="/login"
                        >
                            KEL-BD
                        </a>
                        <ul className="font-heading mx-auto hidden space-x-12 px-4 font-semibold md:flex">
                            {NavLinks.filter((nav) => {
                                return nav.role.includes(original_role);
                            }).map((nav) => {
                                return (
                                    <li key={nav.id}>
                                        <a
                                            className={`rounded-md border-b-4 px-2 py-2 transition duration-500 ease-in-out hover:rounded-md hover:border-b-4 hover:border-gray-200 hover:text-gray-200
                                            ${
                                                window.location.pathname ===
                                                nav.link
                                                    ? "border-white"
                                                    : "border-green-700"
                                            }`}
                                            href={nav.link}
                                        >
                                            {nav.name}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="hidden items-center space-x-5 xl:flex ">
                            {/* <a
                                className="flex items-center hover:text-gray-200"
                                href="#"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 hover:text-gray-200"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </a> */}
                            <button
                                onClick={logout}
                                className="rounded-full bg-white px-6 py-2 font-sans font-semibold uppercase text-red-600 transition-all duration-500 ease-in-out hover:bg-gray-700"
                            >
                                logout
                            </button>
                        </div>
                    </div>
                    {/* <a className="mr-6 flex items-center xl:hidden" href="#">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 hover:text-gray-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        <span className="absolute -mt-5 ml-4 flex">
                            <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-pink-400 opacity-75"></span>
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-pink-500"></span>
                        </span>
                    </a>
                    <a
                        className="navbar-burger mr-12 self-center xl:hidden"
                        href="#"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 hover:text-gray-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                        <button className="bg-primary rounded-full  px-6 py-2 text-white">
                            Get Started
                        </button>
                    </a>*/}
                </nav>
            </section>
        </div>
    );
}

export default Nav;
