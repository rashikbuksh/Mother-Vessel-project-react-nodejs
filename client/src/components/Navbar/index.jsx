import shipLogo from "../../assets/img/shipLogo.svg";
import { useAuth } from "../../hooks/auth";
import { DefineRole } from "../../hooks/routes";
import { useTitle } from "../../hooks/useTitle";

const NavLinks = [
	{
		id: 1,
		link: "/admin-panel",
		name: "Admin Panel",
		role: ["admin"],
	},
	{
		id: 11,
		link: "/job-entry",
		name: "Job Entry",
		role: ["admin", "accounts"],
	},
	{
		id: 2,
		link: "/record-entry",
		name: "Record Entry",
		role: ["admin", "operations"],
	},
	{
		id: 9,
		link: "/chq-approval",
		name: "Chq Approval",
		role: ["admin", "accounts-manager"],
	},
	{
		id: 3,
		link: "/current-status",
		name: "Current Status",
		role: ["admin", "operations"],
	},
	{
		id: 5,
		link: "/damarage-calculation",
		name: "Damarage Calculation",
		role: ["admin", "operations"],
	},
	{
		id: 8,
		link: "/chq-duelist",
		name: "Chq Due List",
		role: ["admin", "accounts-manager"],
	},
	{
		id: 7,
		link: "/own-ship",
		name: "Add LV",
		role: ["admin"],
	},
	{
		id: 10,
		link: "/payment",
		name: "Payment",
		role: ["admin", "accounts-manager"],
	},
];

function Nav() {
	const { logout } = useAuth();
	const { original_role } = DefineRole();
	console.log(window.location);

	const pageName = NavLinks.filter((nav) => {
		return nav.link.includes(window.location.pathname);
	});

	useTitle(`${pageName[0]?.name} | KEL-BD`);

	return (
		<div
			className={`flex w-full ${
				(window.location?.pathname === "/login" ||
					window.location?.pathname === "/") &&
				"hidden"
			} `}
		>
			<nav className="flex min-w-full justify-between rounded-b-md bg-green-700 text-sm text-white">
				<div className="flex w-full items-center px-5 py-2 xl:px-8">
					<a
						className="font-heading flex items-center justify-center text-2xl font-bold"
						href="/"
					>
						<img
							className="mr-1 h-10 w-10 text-white"
							src={shipLogo}
							alt="KEL-BD"
						/>
						KEL-BD
					</a>
					<ul className="font-heading mx-auto flex space-x-12 px-4 font-semibold">
						{NavLinks.filter((nav) => {
							return nav.role.includes(original_role);
						}).map(({ id, link, name }) => {
							return (
								<li key={id}>
									<a
										className={`rounded-md border-b-4 py-2 text-center transition duration-500 ease-in-out hover:rounded-md hover:border-b-4 hover:border-gray-200 hover:text-gray-200
                                            ${
												window.location?.pathname ===
												link
													? "border-white"
													: "border-green-700"
											}`}
										href={link}
									>
										{name}
									</a>
								</li>
							);
						})}
					</ul>

					<button
						onClick={logout}
						className="hover:border-red rounded-full border-2 border-red-600 bg-white px-6 py-2 font-sans font-semibold capitalize text-red-600 transition-all duration-500 ease-in-out hover:bg-red-600 hover:text-white"
					>
						{original_role}
					</button>
				</div>
			</nav>
		</div>
	);
}

export default Nav;
