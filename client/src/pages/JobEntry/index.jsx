import Axios from "axios";
import { Suspense, lazy, useEffect, useState } from "react";
import TableHead from "../../components/Table/TableHead";
import EditableRow from "./Table/EditTableRow";
import ReadOnlyRow from "./Table/ReadOnlyRow";

import { useSortableTable } from "../../components/Table/useSortableTable";

import { generatedToast } from "../../components/Toast";
import { fetchData } from "../../hooks/fetchData";
import { errorCheck, errorData } from "./Error";

import LoadMore from "../../utils/LoadMore";
import NoDataFound from "../../utils/NoDataFound";
import PingLoader from "../../utils/PingLoader";

import { IoMdPersonAdd } from "react-icons/io";

const TableHeader = [
	{
		id: 2,
		name: "Order Number",
		accessor: "order_number",
	},
	{
		id: 3,
		name: "Importer Name",
		accessor: "importer_name",
		sortable: true,
	},
	{
		id: 4,
		name: "Mother Vessel Name",
		accessor: "mother_vessel_name",
		sortable: true,
	},

	{
		id: 5,
		name: "ETA",
		accessor: "eta",
		sortable: true,
	},
	{
		id: 6,
		name: "Commodity",
		accessor: "commodity",
		sortable: true,
	},
	{
		id: 7,
		name: "MV Location",
		accessor: "mv_location",
		sortable: true,
	},
	{
		id: 8,
		name: "BL Quantity",
		accessor: "bl_quantity",
		sortable: true,
	},
	{
		id: 9,
		name: "Stevedore Name",
		accessor: "stevedore_name",
		sortable: true,
	},
	{
		id: 10,
		name: "Stevedore Number",
		accessor: "stevedore_contact_number",
		sortable: true,
	},
	{
		id: 11,
		name: "Entry Time",
		accessor: "time_stamp",
		sortable: true,
		sortByOrder: "desc",
	},
	{ id: 12, name: "Actions" },
];

const AddJob = lazy(() => import("./AddJob"));

const App = () => {
	const [JobList, setJobList] = useState([]);
	const [tableData, handleSorting] = useSortableTable(JobList, TableHeader);
	const [cursorPos, setCursorPos] = useState(1);
	const [pageSize, setPageSize] = useState(3);

	// fetch data
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchData(
			`${process.env.REACT_APP_API_URL}/management/getjobentry`,
			setJobList,
			setLoading,
			setError
		);
	}, []);

	// search filter for all fields
	const [query, setQuery] = useState("");

	const data = Object.values(tableData);
	function search(items) {
		if (query !== "" && cursorPos !== 1) {
			setCursorPos(1);
		}
		const res = items.filter((item) =>
			Object.keys(Object.assign({}, ...data)).some((parameter) =>
				item[parameter]
					?.toString()
					.toLowerCase()
					.includes(query.toLowerCase())
			)
		);
		return res.slice(
			(cursorPos - 1) * pageSize,
			(cursorPos - 1) * pageSize + pageSize
		);
	}

	// add state
	const [addFormData, setAddFormData] = useState({
		order_number: "",
		importer_name: "",
		mother_vessel_name: "",
		eta: "",
		commodity: "",
		mv_location: "",
		bl_quantity: "",
		stevedore_name: "",
		stevedore_contact_number: "",
	});

	//edit status
	const [editFormData, setEditFormData] = useState({
		order_number: "",
		importer_name: "",
		mother_vessel_name: "",
		eta: "",
		commodity: "",
		mv_location: "",
		bl_quantity: "",
		stevedore_name: "",
		stevedore_contact_number: "",
	});

	//modified id status
	const [editJobId, setEditJobId] = useState(null);

	//changeHandler
	const handleAddFormChange = (event) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute("name");
		var fieldValue = event.target.value;

		errorCheck(fieldValue, fieldName);

		const newFormData = { ...addFormData };
		newFormData[fieldName] = fieldValue;

		setAddFormData(newFormData);
	};

	//Update status with correction data
	const handleEditFormChange = (event) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;

		const newFormData = { ...editFormData };
		newFormData[fieldName] = fieldValue;

		setEditFormData(newFormData);
	};

	//submit handler
	const handleAddFormSubmit = (event) => {
		event.preventDefault(); // ???

		const newJob = {
			order_number: addFormData.order_number,
			importer_name: addFormData.importer_name,
			mother_vessel_name: addFormData.mother_vessel_name,
			eta: addFormData.eta,
			commodity: addFormData.commodity,
			mv_location: addFormData.mv_location,
			bl_quantity: addFormData.bl_quantity,
			stevedore_name: addFormData.stevedore_name,
			stevedore_contact_number: addFormData.stevedore_contact_number,
		};

		const current = new Date(newJob.eta);
		const order_number_auto =
			newJob.importer_name +
			"-" +
			current.getDate() +
			"/" +
			current.getMonth() +
			"/" +
			current.getFullYear() +
			"-" +
			newJob.mother_vessel_name +
			"-" +
			newJob.mv_location;

		newJob.order_number = order_number_auto;

		// api call
		Axios.post(
			`${process.env.REACT_APP_API_URL}/management/jobentry`,
			newJob
		)
			.then((response) => {
				generatedToast(response);
			})
			.then(() => {
				closeModal();
			});

		const newTableData = [...tableData, newJob];
		setJobList(newTableData);
	};

	//save modified data (App component)
	const handleEditFormSubmit = (event) => {
		event.preventDefault();

		const editedJob = {
			id: editJobId,
			order_number: editFormData.order_number,
			importer_name: editFormData.importer_name,
			mother_vessel_name: editFormData.mother_vessel_name,
			eta: editFormData.eta,
			commodity: editFormData.commodity,
			mv_location: editFormData.mv_location,
			bl_quantity: editFormData.bl_quantity,
			stevedore_name: editFormData.stevedore_name,
			stevedore_contact_number: editFormData.stevedore_contact_number,
		};

		Axios.post(
			`${process.env.REACT_APP_API_URL}/management/updatejobentry`,
			editedJob
		).then((response) => {
			generatedToast(response);
		});

		const index = tableData.findIndex((td) => td.id === editJobId);
		tableData[index] = editedJob;
		setJobList(tableData);

		setEditJobId(null);
	};

	//Read-only data If you click the edit button, the existing data is displayed
	const handleEditClick = (event, job) => {
		event.preventDefault();

		setEditJobId(job.id);

		const formValues = {
			order_number: job.order_number,
			importer_name: job.importer_name,
			mother_vessel_name: job.mother_vessel_name,
			eta: job.eta,
			commodity: job.commodity,
			mv_location: job.mv_location,
			bl_quantity: job.bl_quantity,
			stevedore_name: job.stevedore_name,
			stevedore_contact_number: job.stevedore_contact_number,
		};
		setEditFormData(formValues);
	};

	//Cancel button when clicked on edit
	const handleCancelClick = () => {
		setEditJobId(null);
	};

	// delete
	const handleDeleteClick = (jobId) => {
		const newJobList = [...JobList];
		const index = JobList.findIndex((job) => job.id === jobId);

		Axios.post(`${process.env.REACT_APP_API_URL}/management/deletejob`, {
			job_id: jobId,
			job_order_number: JobList[index].order_number,
		}).then((response) => {
			generatedToast(response);
		});

		newJobList.splice(index, 1);
		setJobList(newJobList);
	};

	// modal for add job
	let [isOpen, setIsOpen] = useState(false);
	const closeModal = () => setIsOpen(false);
	const openModal = () => setIsOpen(true);

	// loading and error
	if (loading) {
		return <PingLoader />;
	}
	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div className="m-2 mt-4">
			<div className="my-2 mx-auto flex justify-center">
				<input
					className="mx-auto block w-1/2 rounded-md border-2 border-slate-300 bg-white py-2 shadow-lg placeholder:italic placeholder:text-slate-500 focus:border-green-500 focus:ring-0 sm:text-sm"
					placeholder="Search for anything..."
					type="search"
					name="search"
					onChange={(event) => setQuery(event.target.value)}
				/>
				<button
					className="flex flex-row items-center justify-center rounded-md bg-green-600 px-3 py-0 text-sm font-semibold text-white transition duration-500 ease-in-out hover:bg-green-400"
					onClick={openModal}
				>
					Add Job <IoMdPersonAdd className="ml-2 inline h-5 w-5" />
				</button>
			</div>
			<form onSubmit={handleEditFormSubmit}>
				<table className="table">
					<TableHead
						columns={TableHeader}
						handleSorting={handleSorting}
					/>
					{search(tableData).length > 0 && (
						<tbody className="divide-y divide-gray-100 rounded-md">
							{search(tableData).map((_, index) => (
								<tr
									key={index}
									className={`my-auto items-center justify-center ${
										index % 2 === 1 ? "bg-gray-200" : ""
									}`}
								>
									{editJobId ===
									search(tableData)[index]?.id ? (
										<EditableRow
											{...{
												editFormData,
												handleEditFormChange,
												handleCancelClick,
											}}
										/>
									) : (
										<ReadOnlyRow
											job={search(tableData)[index]}
											handleEditClick={handleEditClick}
											handleDeleteClick={
												handleDeleteClick
											}
											{...{
												handleEditClick,
												handleDeleteClick,
											}}
										/>
									)}
								</tr>
							))}
						</tbody>
					)}
				</table>
				{search(tableData).length < 1 && <NoDataFound />}
			</form>

			{/* new start  */}
			{search(tableData).length < data.length && (
				<LoadMore
					onClick={() => {
						setPageSize((prevValue) =>
							cursorPos + prevValue > data.length
								? prevValue
								: prevValue + 20
						);
					}}
				/>
			)}

			<Suspense fallback={<PingLoader />}>
				<AddJob
					{...{
						isOpen,
						closeModal,
						handleAddFormSubmit,
						handleAddFormChange,
						addFormData,
						setAddFormData,
						errorData,
					}}
				/>
			</Suspense>
		</div>
	);
};

export default App;
