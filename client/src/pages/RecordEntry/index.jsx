import React, { useState, Fragment, useEffect, Suspense } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ReadOnlyRow from "./TableRows/ReadOnlyRow";
import EditableRow from "./TableRows/EditTableRow";
import TableHead from "../../components/Table/TableHead"; // new
import Pagination from "../../components/Table/Pagination"; // new
import { useSortableTable } from "../../components/Table/useSortableTable"; // new
import { useAuth } from "../../hooks/auth";
import Axios from "axios";
import Loader from "../../utils/Loader";

import { IoMdPersonAdd } from "react-icons/io";
import { MdClose } from "react-icons/md";

//toast
import { success, warning } from "../../components/Toast";
import { ToastContainer } from "react-toastify";

const TableHeader = [
    {
        id: 1,
        name: "Id",
        accessor: "id",
        sortable: true,
        sortByOrder: "asc",
    },
    {
        id: 2,
        name: "Order Number",
        accessor: "order_number",
        sortable: true,
    },
    {
        id: 3,
        name: "Job Number",
        accessor: "job_number",
        sortable: true,
    },
    { 
        id: 4, 
        name: "Date From Charpotro",
        accessor: "date_from_charpotro",
        sortable: true, 
    },
    { id: 5, name: "CP Number From Charpotro", accessor: "cp_number_from_charpotro", },
    { id: 6, name: "LA Name", accessor: "LA_name", },
    { id: 7, name: "LV Name", accessor: "LV_name", sortable: true },
    { id: 8, name: "Destination From", accessor: "dest_from", },
    { id: 9, name: "Destination To", accessor: "dest_to", },
    { id: 10, name: "Commodity", accessor: "commodity", },
    { id: 11, name: "Capacity", accessor: "capacity", },
    { id: 12, name: "Rate", accessor: "rate", },
    { id: 13, name: "LV Master Name", accessor: "LV_master_name", },
    { id: 14, name: "LV Master Contact Number", accessor: "LV_master_contact_number", },
    { id: 15, name: "Created Date", accessor: "created_date", },
    { id: 16, name: "Actions" },
];

const App = () => {
    // new start
    const [RecordList, setRecordList] = useState([]);
    const [tableData, handleSorting] = useSortableTable(RecordList, TableHeader); // data, columns // new
    const [cursorPos, setCursorPos] = useState(1);
    const [pageSize, setPageSize] = useState(2);

    const { logout } = useAuth();

    // search filter for all fields
    const [query, setQuery] = useState("");

    const data = Object.values(tableData);
    function search(items) {
        const res = items.filter((item) =>
            Object.keys(Object.assign({}, ...data)).some((parameter) =>
                item[parameter]?.toString().toLowerCase().includes(query)
            )
        );
        return res.slice(
            (cursorPos - 1) * pageSize,
            (cursorPos - 1) * pageSize + pageSize
        );
    }

    useEffect(() => {
        fetch("http://localhost:3001/management/getrecordentry")
            .then((res) => res.json())
            .then((data) => {
                setRecordList(data);
            });
    }, []);

    // new end

    // add state
    //id is randomly generated with nanoid generator
    const [addFormData, setAddFormData] = useState({
        order_number: "",
        job_number: "",
        date_from_charpotro: "",
        cp_number_from_charpotro: "",
        LA_name: "",
        LV_name: "",
        dest_from: "",
        dest_to: "",
        commodity: "",
        capacity: "",
        rate: "",
        LV_master_name: "",
        LV_master_contact_number: "",
    });

    //edit status
    const [editFormData, setEditFormData] = useState({
        order_number: "",
        job_number: "",
        date_from_charpotro: "",
        cp_number_from_charpotro: "",
        LA_name: "",
        LV_name: "",
        dest_from: "",
        dest_to: "",
        commodity: "",
        capacity: "",
        rate: "",
        LV_master_name: "",
        LV_master_contact_number: "",
    });

    //modified id status
    const [editRecordId, setEditRecordId] = useState(null);

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

    //submit handler
    //Clicking the Add button adds a new data row to the existing row
    const handleAddFormSubmit = (event) => {
        event.preventDefault(); // ???

        //data.json으로 이루어진 기존 행에 새로 입력받은 데이터 행 덧붙이기
        const newRecord = {
            order_number: addFormData.order_number, //handleAddFormChange로 받은 새 데이터
            job_number: addFormData.job_number,
            date_from_charpotro: addFormData.date_from_charpotro,
            cp_number_from_charpotro: addFormData.cp_number_from_charpotro,
            LA_name: addFormData.LA_name,
            LV_name: addFormData.LV_name,
            dest_from: addFormData.dest_from,
            dest_to: addFormData.dest_to,
            commodity: addFormData.commodity,
            capacity: addFormData.capacity,
            rate: addFormData.rate,
            LV_master_name: addFormData.LV_master_name,
            LV_master_contact_number: addFormData.LV_master_contact_number,
        };

        // const current = new Date();
        // const order_number_auto = newRecord.importer_name+'-'+current.getDate().toLocaleString()+'-'+newRecord.mother_vessel_name+'-'+newRecord.mv_location
        // console.log(order_number_auto)

        // api call
        Axios.post("http://localhost:3001/management/recordentry", {
            order_number: "order_number_forign_key", //handleAddFormChange로 받은 새 데이터
            job_number: "job_number_auto",
            date_from_charpotro: newRecord.date_from_charpotro,
            cp_number_from_charpotro: newRecord.cp_number_from_charpotro,
            LA_name: newRecord.LA_name,
            LV_name: newRecord.LV_name,
            dest_from: newRecord.dest_from,
            dest_to: newRecord.dest_to,
            commodity: newRecord.commodity,
            capacity: newRecord.capacity,
            rate: newRecord.rate,
            LV_master_name: newRecord.LV_master_name,
            LV_master_contact_number: newRecord.LV_master_contact_number,
        });

        //RecordList의 초기값은 data.json 데이터
        // new start
        const newTableData = [...tableData, newRecord];
        // new end

        setRecordList(newTableData);

        // close modal
        closeModal();

        // toast
        success("Record added successfully");
    };

    //save modified data (App component)
    const handleEditFormSubmit = (event) => {
        event.preventDefault(); // prevent submit

        const editedRecord = {
            id: editRecordId, //initial value null
            order_number: editFormData.order_number, //handleAddFormChange로 받은 새 데이터
            job_number: editFormData.job_number,
            date_from_charpotro: editFormData.date_from_charpotro,
            cp_number_from_charpotro: editFormData.cp_number_from_charpotro,
            LA_name: editFormData.LA_name,
            LV_name: editFormData.LV_name,
            dest_from: editFormData.dest_from,
            dest_to: editFormData.dest_to,
            commodity: editFormData.commodity,
            capacity: editFormData.capacity,
            rate: editFormData.rate,
            LV_master_name: editFormData.LV_master_name,
            LV_master_contact_number: editFormData.LV_master_contact_number,
        };

        Axios.post("http://localhost:3001/management/updaterecordentry", {
            id: editedRecord.id,
            order_number: editedRecord.order_number, //handleAddFormChange로 받은 새 데이터
            job_number: editedRecord.job_number,
            date_from_charpotro: editedRecord.date_from_charpotro,
            cp_number_from_charpotro: editedRecord.cp_number_from_charpotro,
            LA_name: editedRecord.LA_name,
            LV_name: editedRecord.LV_name,
            dest_from: editedRecord.dest_from,
            dest_to: editedRecord.dest_to,
            commodity: editedRecord.commodity,
            capacity: editedRecord.capacity,
            rate: editedRecord.rate,
            LV_master_name: editedRecord.LV_master_name,
            LV_master_contact_number: editedRecord.LV_master_contact_number,
        });

        // these 3 lines will be replaced // new start
        const index = tableData.findIndex((td) => td.id === editRecordId);
        tableData[index] = editedRecord;
        setRecordList(tableData);
        // new end

        setEditRecordId(null);
        success("Record updated successfully");
    };

    //Read-only data If you click the edit button, the existing data is displayed
    const handleEditClick = (event, Record) => {
        event.preventDefault(); // ???

        setEditRecordId(Record.id);
        const formValues = {
            order_number: Record.order_number,
            job_number: Record.job_number,
            date_from_charpotro: Record.date_from_charpotro,
            cp_number_from_charpotro: Record.cp_number_from_charpotro,
            LA_name: Record.LA_name,
            LV_name: Record.LV_name,
            dest_from: Record.dest_from,
            dest_to: Record.dest_to,
            commodity: Record.commodity,
            capacity: Record.capacity,
            rate: Record.rate,
            LV_master_name: Record.LV_master_name,
            LV_master_contact_number: Record.LV_master_contact_number,
        };
        setEditFormData(formValues);
    };

    //Cancel button when clicked on edit
    const handleCancelClick = () => {
        setEditRecordId(null);
    };

    // delete
    const handleDeleteClick = (RecordId) => {
        const newRecordList = [...RecordList];
        const index = RecordList.findIndex((Record) => Record.id === RecordId);
        //console.log("Deleting Record with id: " + RecordId);
        Axios.post("http://localhost:3001/management/deleterecord", {
            record_id: RecordId,
        }).then((response) => {
            if (response.data == "success") {
                success("Record deleted successfully");
            }
        });

        newRecordList.splice(index, 1);
        setRecordList(newRecordList);
    };

    const filteredRecord =
        query === ""
            ? RecordList
            : RecordList.filter((Record) =>
                  Record.order_number
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    // modal for add Record
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
                    Add Job <IoMdPersonAdd className="ml-2 inline h-5 w-5" />
                </button>
            </div>
            <form onSubmit={handleEditFormSubmit}>
                <table className="table">
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
                            {search(tableData).map((record, idx) => (
                                <tr
                                    key={record.id}
                                    className={`my-auto items-center justify-center ${
                                        idx % 2 === 1 ? "bg-gray-200" : ""
                                    }`}
                                >
                                    {editRecordId === record.id ? (
                                        <EditableRow
                                            editFormData={editFormData}
                                            handleEditFormChange={
                                                handleEditFormChange
                                            }
                                            handleCancelClick={
                                                handleCancelClick
                                            }
                                        />
                                    ) : (
                                        <ReadOnlyRow
                                            record={record}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={
                                                handleDeleteClick
                                            }
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
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="z-10 overflow-y-auto"
                        // new start
                        onClose={() => {}}
                        // new end
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        {/* // new start */}
                                        <Dialog.Title
                                            as="h3"
                                            className="mb-4 text-left text-3xl font-medium text-gray-900"
                                        >
                                            Add Record 
                                            <button
                                                className="float-right"
                                                onClick={closeModal}
                                            >
                                                <MdClose className="inline text-red-600" />
                                            </button>
                                        </Dialog.Title>
                                        {/* // new end */}
                                        <form
                                            onSubmit={handleAddFormSubmit}
                                            className="flex flex-col gap-4"
                                        >
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Order Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="order_number"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    disabled
                                                    placeholder="Foriegn Key"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Job Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="job_number"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    disabled
                                                    placeholder="Auto Generated"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Date From Charpotro
                                                </label>
                                                <input
                                                    type="date"
                                                    name="date_from_charpotro"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    placeholder="Date From Charpotro"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    CP Number From Charpotro
                                                </label>
                                                <input
                                                    type="number"
                                                    name="cp_number_from_charpotro"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    placeholder="CP Number From Charpotro"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    LA Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="LA_name"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    placeholder="LA Number"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    LV Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="LV_name"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    placeholder="LV Number"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Destination From
                                                </label>
                                                <input
                                                    type="text"
                                                    name="dest_from"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    placeholder="Destination From"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Destination To
                                                </label>
                                                <input
                                                    type="text"
                                                    name="dest_to"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    placeholder="Destination To"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Commodity
                                                </label>
                                                <input
                                                    type="text"
                                                    name="commodity"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    placeholder="Commodity"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Capacity
                                                </label>
                                                <input
                                                    type="number"
                                                    name="capacity"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    placeholder="Capacity"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Rate
                                                </label>
                                                <input
                                                    type="number"
                                                    name="rate"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    placeholder="Rate"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    LV Master Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="LV_master_name"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    placeholder="LV Master Name"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    LV Master Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="LV_master_contact_number"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    placeholder="LV Master Number"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-green-300 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                            >
                                                Add
                                            </button>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </Suspense>

            {/* toast  */}
            <ToastContainer closeOnClick />
        </div>
    );
};

export default App;
