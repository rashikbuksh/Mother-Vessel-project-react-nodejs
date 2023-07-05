import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import {
	AccountsManagerRoutes,
	AccountsRoutes,
	AdminRoutes,
	OperationRoutes,
} from "./hooks/routes";

import { Toast } from "./components/Toast";
import Loader from "./utils/Loader";

const NotFound = lazy(() => import("./layout/NotFound"));
const NoAccess = lazy(() => import("./utils/NoAccess"));

// Login
const Login = lazy(() => import("./pages/Login"));

//admin panel
const AdminPanel = lazy(() => import("./pages/Admin"));
const JobEntry = lazy(() => import("./pages/JobEntry"));
const RecordEntry = lazy(() => import("./pages/RecordEntry"));
const CurrentStatus = lazy(() => import("./pages/CurrentStatus"));
const PreDefinedAdmin = lazy(() => import("./pages/PreDefinedAdmin"));
const DamarageCalculation = lazy(() => import("./pages/DamarageCalculation"));
const ChqDueList = lazy(() => import("./pages/ChqDueList"));
const ChqApproval = lazy(() => import("./pages/ChqApproval"));
const Payment = lazy(() => import("./pages/Payment"));
const Profile = lazy(() => import("./pages/PreDefinedAdmin/Profile"));

// table
const DeletePopup = lazy(() => import("./components/DeletePopup"));
const Navbar = lazy(() => import("./components/Navbar"));

const PublicRoutesList = [
	{
		link: "/",
		component: Login,
	},
	{
		link: "/login",
		component: Login,
	},
	{
		link: "/no-access",
		component: NoAccess,
	},
	{
		link: "/*",
		component: NotFound,
	},
	// {
	//     link: "/test",
	//     component: Navbar,
	// },
];

const OperationRoutesList = [
	{
		link: "/record-entry",
		component: RecordEntry,
	},
	{
		link: "/record-entry/:jobOrderNumber",
		component: RecordEntry,
	},
	{
		link: "/current-status",
		component: CurrentStatus,
	},
	{
		link: "/damarage-calculation",
		component: DamarageCalculation,
	},
	{
		link: "/own-ship",
		component: PreDefinedAdmin,
	},
	{
		link: "/own-ship/:shipName",
		component: Profile,
	},
];

const AccountsRoutesList = [
	{
		link: "/job-entry",
		component: JobEntry,
	},
	{
		link: "/own-ship/:shipName",
		component: Profile,
	},
];

const AccountsManagerRoutesList = [
	{
		link: "/chq-due-list",
		component: ChqDueList,
	},
	{
		link: "/payment",
		component: Payment,
	},
	{
		link: "/chq-approval",
		component: ChqApproval,
	},
	{
		link: "/own-ship/:shipName",
		component: Profile,
	},
];

const AdminRoutesList = [
	{
		link: "/admin-panel",
		component: AdminPanel,
	},
	{
		link: "/record-entry",
		component: RecordEntry,
	},
	{
		link: "/record-entry/:jobOrderNumber",
		component: RecordEntry,
	},
	{
		link: "/current-status",
		component: CurrentStatus,
	},
	{
		link: "/own-ship",
		component: PreDefinedAdmin,
	},
	{
		link: "/own-ship/:shipName",
		component: Profile,
	},
	{
		link: "/damarage-calculation",
		component: DamarageCalculation,
	},
	{
		link: "/chq-duelist",
		component: ChqDueList,
	},
	{
		link: "/chq-approval",
		component: ChqApproval,
	},
	{
		link: "/payment",
		component: Payment,
	},
	{
		link: "/job-entry",
		component: JobEntry,
	},
];

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				{OperationRoutesList.map((route, index) => (
					<Route
						key={index}
						path={route.link}
						element={
							<OperationRoutes>
								<Suspense fallback={<Loader />}>
									<route.component />
								</Suspense>
							</OperationRoutes>
						}
					/>
				))}
				{AccountsManagerRoutesList.map((route, index) => (
					<Route
						key={index}
						path={route.link}
						element={
							<AccountsManagerRoutes>
								<Suspense fallback={<Loader />}>
									<route.component />
								</Suspense>
							</AccountsManagerRoutes>
						}
					/>
				))}
				{AccountsRoutesList.map((route, index) => (
					<Route
						key={index}
						path={route.link}
						element={
							<AccountsRoutes>
								<Suspense fallback={<Loader />}>
									<route.component />
								</Suspense>
							</AccountsRoutes>
						}
					/>
				))}

				{AdminRoutesList.map((route, index) => (
					<Route
						key={index}
						path={route.link}
						element={
							<AdminRoutes>
								<Suspense fallback={<Loader />}>
									<route.component />
								</Suspense>
							</AdminRoutes>
						}
					/>
				))}

				{PublicRoutesList.map((route, index) => (
					<Route
						key={index}
						path={route.link}
						element={
							<Suspense fallback={<Loader />}>
								<route.component />
							</Suspense>
						}
					/>
				))}

				<Route
					path="/own-ship/:shipName"
					element={
						<Suspense fallback={<Loader />}>
							<Profile />
						</Suspense>
					}
				/>
				<Route
					path="/test"
					element={
						<Suspense fallback={<Loader />}>
							<DeletePopup />
						</Suspense>
					}
				/>
			</Routes>
			<Toast />
		</>
	);
}

export default App;
