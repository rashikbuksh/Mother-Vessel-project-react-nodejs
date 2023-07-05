import Axios from "axios";
import FormData from "form-data";
import React, { Suspense, lazy, useEffect, useState } from "react";
import Pagination from "../../components/Table/Pagination"; // new
import TableHead from "../../components/Table/TableHead"; // new
import { useSortableTable } from "../../components/Table/useSortableTable"; // new
import Loader from "../../utils/Loader";
import AddModal from "./AddModal";
import EditableRow from "./TableRows/EditTableRow";
import ReadOnlyRow from "./TableRows/ReadOnlyRow";

import { IoMdPersonAdd } from "react-icons/io";

//toast
import { generatedToast } from "../../components/Toast";
import PingLoader from "../../utils/PingLoader";

const TableHeader = [
	{ id: 2, name: "LV Name", accessor: "LV_name", sortable: true },
	{ id: 3, name: "Capacity", accessor: "capacity", sortable: true },
	{
		id: 4,
		name: "Master Reg No",
		accessor: "master_reg_number",
		sortable: true,
	},
	{ id: 5, name: "Master's Name", accessor: "masters_name", sortable: true },
	{
		id: 6,
		name: "Master's Contact Number",
		accessor: "masters_contact_number",
		sortable: true,
	},
	// {
	// 	id: 7,
	// 	name: "Master's NID Image Attachment",
	// 	accessor: "masters_nid_image_attachment",
	// 	sortable: true,
	// },
	{
		id: 8,
		name: "Staffs Info",
		accessor: "staffs_info",
		sortable: true,
		width: "w-4",
	},
	{
		id: 10,
		name: "Leased (Yes/No)",
		accessor: "leased",
		sortable: true,
	},
	{
		id: 11,
		name: "Company Name",
		accessor: "company_name",
		sortable: true,
	},
	{
		id: 12,
		name: "Proprieter's Name",
		accessor: "proprietors_name",
		sortable: true,
	},
	{
		id: 13,
		name: "Office Address",
		accessor: "office_address",
		sortable: true,
		width: "max-w-10",
	},
	{
		id: 14,
		name: "AC Number",
		accessor: "ac_number",
		sortable: true,
	},
	{
		id: 15,
		name: "Contact Details",
		accessor: "contact_details",
		sortable: true,
	},
	// {
	// 	id: 16,
	// 	name: "L/V Documents Attachement",
	// 	accessor: "lv_documents_attachement",
	// 	sortable: true,
	// },
	{
		id: 17,
		name: "Status",
		accessor: "status",
		sortable: true,
	},
	{ id: 18, name: "Actions" },
];

const DeleteRecord = lazy(() => import("../../components/DeletePopup"));

const App = () => {
	// new start
	const [CurrentStatus, setCurrentStatus] = useState([]);
	const [tableData, handleSorting] = useSortableTable(
		CurrentStatus,
		TableHeader
	); // data, columns // new
	const [cursorPos, setCursorPos] = useState(1);
	const [pageSize, setPageSize] = useState(10);

	//Image upload
	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState("");

	// dynamic add staff
	const [addStaff, setAddStaff] = useState(["#"]);

	// leased ship
	const [leased, setLeased] = useState(false);

	// active status
	const [active, setActive] = useState(false);
	const [lv_documents_attachementFile, setlv_documents_attachementFile] =
		useState();
	const [
		lv_documents_attachementFileName,
		setlv_documents_attachementFileName,
	] = useState("");

	// search filter for all fields
	const [query, setQuery] = useState("");

	const data = Object.values(tableData);
	function search(items) {
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

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/management/getpredefinedship`)
			.then((res) => res.json())
			.then((data) => {
				setCurrentStatus(data);
			});
	}, []);

	// new end

	// add state
	//id is randomly generated with nanoid generator
	const [addFormData, setAddFormData] = useState({
		LV_name: "",
		capacity: "",
		master_reg_number: "",
		masters_name: "",
		masters_contact_number: "",
		masters_nid_image_attachment: "",
		staff_name: "",
		staff_nid_number: "",
		leased: "",
		company_name: "",
		proprietors_name: "",
		office_address: "",
		ac_number: "",
		contact_details: "",
		lv_documents_attachement: "",
		status: "",
	});

	//edit status
	const [editFormData, setEditFormData] = useState({
		LV_name: "",
		capacity: "",
		master_reg_number: "",
		masters_name: "",
		masters_contact_number: "",
		masters_nid_image_attachment: "",
		staff_info: "",
		staff_nid_number: "",
		leased: "",
		company_name: "",
		proprietors_name: "",
		office_address: "",
		ac_number: "",
		contact_details: "",
		lv_documents_attachement: "",
		status: "",
	});

	//modified id status
	const [editStatusId, setEditStatusId] = useState(null);

	//changeHandler
	//Update state with input data
	const handleAddFormChange = (event) => {
		event.preventDefault();

		//fullname, address, phoneNumber, email
		const fieldName = event.target.getAttribute("name");
		//각 input 입력값
		const fieldValue = event.target.value;

		const newFormData = { ...addFormData };
		newFormData[fieldName] = fieldValue;
		//addFormData > event.target(input)
		//fullName:"" > name="fullName", value=fullName input 입력값

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

	//Saving File
	const saveFile = (e) => {
		setFile(e.target.files[0]);
		setFileName(e.target.files[0].name);
	};

	// Saving lv_documents_attachementFile
	const saveLv_documents_attachementFile = (e) => {
		setlv_documents_attachementFile(e.target.files[0]);
		setlv_documents_attachementFileName(e.target.files[0].name);
	};

	//submit handler
	//Clicking the Add button adds a new data row to the existing row
	const handleAddFormSubmit = async (event) => {
		event.preventDefault(); // ???
		let staffVAl = "";
		for (let i = 0; i < addStaff.length; i++) {
			if (addStaff[i] !== "#") {
				if (i === addStaff.length - 1) {
					staffVAl += addStaff[i];
				} else {
					staffVAl += addStaff[i] + ",";
				}
			}
		}

		const newStatus = {
			LV_name: addFormData.LV_name,
			capacity: addFormData.capacity,
			master_reg_number: addFormData.master_reg_number,
			masters_name: addFormData.masters_name,
			masters_contact_number: addFormData.masters_contact_number,
			staffs_info: staffVAl,
			leased: leased ? 1 : 0,
			company_name: addFormData.company_name,
			proprietors_name: addFormData.proprietors_name,
			office_address: addFormData.office_address,
			ac_number: addFormData.ac_number,
			contact_details: addFormData.contact_details,
			status: active ? 1 : 0,
		};

		let formData = new FormData();
		formData.append("uploadFiles", file);
		formData.append("uploadFiles", lv_documents_attachementFile);

		await Axios.post(
			`${process.env.REACT_APP_API_URL}/management/upload`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data;",
				},
			}
		)
			.then((response) => {
				generatedToast(response);
			})
			.then(() => {
				closeModal();
			});

		await Axios.post(
			`${process.env.REACT_APP_API_URL}/management/predefinedship`,
			{
				...newStatus,
				fileName,
				lv_documents_attachementFileName,
			}
		).then((response) => {
			generatedToast(response);
		});

		//CurrentStatus의 초기값은 data.json 데이터
		// new start
		const newTableData = [newStatus, ...tableData];
		setCurrentStatus(newTableData);
	};

	//save modified data (App component)
	const handleEditFormSubmit = (event) => {
		event.preventDefault(); // prevent submit

		const editedStatus = {
			id: editStatusId, //initial value null
			LV_name: editFormData.LV_name,
			capacity: editFormData.capacity,
			master_reg_number: editFormData.master_reg_number,
			masters_name: editFormData.masters_name,
			masters_contact_number: editFormData.masters_contact_number,
			staffs_info: editFormData?.staffs_info,
			leased: editFormData.leased,
			company_name: editFormData.company_name,
			proprietors_name: editFormData.proprietors_name,
			office_address: editFormData.office_address,
			ac_number: editFormData.ac_number,
			contact_details: editFormData.contact_details,
			status: editFormData.status,
		};

		Axios.post(
			`${process.env.REACT_APP_API_URL}/management/updatepredefinedship`,
			{
				status: editedStatus.status,
				id: editedStatus.id,
			}
		).then((response) => {
			generatedToast(response);
		});

		// these 3 lines will be replaced // new start
		const index = tableData.findIndex((td) => td.id === editStatusId);
		tableData[index] = editedStatus;
		setCurrentStatus(tableData);
		// new end

		setEditStatusId(null);
		// success("Status updated successfully");
	};

	//Read-only data If you click the edit button, the existing data is displayed
	const handleEditClick = (event, Status) => {
		event.preventDefault(); // ???

		setEditStatusId(Status.id);
		const formValues = {
			LV_name: Status.LV_name,
			capacity: Status.capacity,
			master_reg_number: Status.master_reg_number,
			masters_name: Status.masters_name,
			masters_contact_number: Status.masters_contact_number,
			staffs_info: Status.staffs_info,
			leased: Status.leased,
			company_name: Status.company_name,
			proprietors_name: Status.proprietors_name,
			office_address: Status.office_address,
			ac_number: Status.ac_number,
			contact_details: Status.contact_details,
			status: Status.status,
		};
		setEditFormData(formValues);
	};

	//Cancel button when clicked on edit
	const handleCancelClick = () => {
		setEditStatusId(null);
	};

	// delete
	// modal for delete job
	let [isOpenDelete, setIsOpenDelete] = useState(false);
	const closeModalDelete = () => {
		setDeleteID(null);
		setIsOpenDelete(false);
	};
	const openModalDelete = () => setIsOpenDelete(true);

	const [deleteID, setDeleteID] = useState(null);
	const handleDeleteClick = (jobId) => {
		setDeleteID(jobId);
		openModalDelete();
	};

	const handleDeleteModal = () => {
		const newCurrentStatus = [...CurrentStatus];
		const index = CurrentStatus.findIndex(
			(Status) => Status.id === deleteID
		);
		Axios.post(
			`${process.env.REACT_APP_API_URL}/management/deletepredefinedship`,
			{
				status_id: deleteID,
			}
		).then((response) => {
			generatedToast(response);
		});
		newCurrentStatus.splice(index, 1);
		setCurrentStatus(newCurrentStatus);
	};

	// modal for add Status
	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	//If save(submit) is pressed after editing is completed, submit > handleEditFormSubmit action
	return (
		<div className="m-2 mt-4">
			{/* // new start */}
			<div className="my-2 mx-auto flex justify-center">
				<Pagination
					pageSize={pageSize}
					cursorPos={cursorPos}
					setCursorPos={setCursorPos}
					rowsCount={data.length}
				/>
				<input
					className="mx-auto block w-1/2 rounded-md border-2 border-slate-300 bg-white py-2 shadow-lg placeholder:italic placeholder:text-slate-500 focus:border-green-500 focus:ring-0 sm:text-sm"
					placeholder="Search for anything..."
					type="search"
					name="search"
					onChange={(event) => setQuery(event.target.value)}
				/>
				<button
					// new start // job change copy paste the className
					className="flex flex-row items-center justify-center rounded-md bg-green-600 px-3 py-0 text-sm font-semibold text-white transition duration-500 ease-in-out hover:bg-green-400"
					onClick={openModal}
				>
					Add Ship <IoMdPersonAdd className="ml-2 inline h-5 w-5" />
				</button>
			</div>
			<form onSubmit={handleEditFormSubmit}>
				<table className="min-w-full border-separate text-sm">
					<TableHead
						columns={TableHeader}
						handleSorting={handleSorting}
					/>
					{search(tableData).length === 0 && query !== "" ? (
						<div className="py-2 px-4 text-gray-700">
							Nothing found.
						</div>
					) : (
						<tbody className="divide-y divide-gray-100 rounded-md">
							{search(tableData).map((status, idx) => (
								<tr
									key={status.id}
									className={`my-auto items-center justify-center ${
										idx % 2 === 1 ? "bg-gray-200" : ""
									}`}
								>
									{editStatusId === status.id ? (
										<EditableRow
											{...{
												editFormData,
												handleEditFormChange,
												handleCancelClick,
											}}
										/>
									) : (
										<ReadOnlyRow
											{...{
												status,
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
			</form>

			{/* // new end */}

			{/* add item modal */}
			<Suspense fallback={<Loader />}>
				<AddModal
					{...{
						isOpen,
						closeModal,
						handleAddFormChange,
						handleAddFormSubmit,
						saveFile,
						addStaff,
						setAddStaff,
						leased,
						setLeased,
						active,
						setActive,
						saveLv_documents_attachementFile,
					}}
				/>
			</Suspense>
			<Suspense fallback={<PingLoader />}>
				<DeleteRecord
					{...{
						isOpenDelete,
						closeModalDelete,
						handleDeleteModal,
					}}
					deleteInfo={{
						title: "Delete Cheque Due Record",
						body: "Are you sure you want to delete this Cheque Due Record?",
					}}
				/>
			</Suspense>
		</div>
	);
};

export default App;
