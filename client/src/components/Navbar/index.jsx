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
        name: "Current Status (Others)",
        role: ["admin", "operation"],
    },
    {
        id: 5,
        link: "/damaragecalculation",
        name: "Damarage Calculation",
        role: ["admin", "operation"],
    },
    {
        id: 6,
        link: "/predefinedship",
        name: "Current Status (Own)",
        role: ["admin", "operation"],
    },
    {
        id: 7,
        link: "/predefinedadmin",
        name: "Add LV",
        role: ["admin"],
    },
    {
        id: 8,
        link: "/chqduelist",
        name: "Chq Due List",
        role: ["admin", "accounts-manager"],
    },
    {
        id: 9,
        link: "/chqapproval",
        name: "Chq Approval",
        role: ["admin", "accounts-manager"],
    },
    {
        id: 10,
        link: "/payment",
        name: "Payment",
        role: ["admin", "accounts-manager"],
    },
    {
        id: 11,
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
                            <button
                                onClick={logout}
                                className="hover:border-red rounded-full border-2 border-red-600 bg-white px-6 py-2 font-sans font-semibold capitalize text-red-600 transition-all duration-500 ease-in-out hover:bg-red-600 hover:text-white"
                            >
                                {original_role}
                            </button>
                        </div>
                    </div>
                </nav>
            </section>
        </div>
    );
}

export default Nav;
