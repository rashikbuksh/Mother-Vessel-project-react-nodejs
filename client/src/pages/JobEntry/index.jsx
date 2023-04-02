import React, { useState, Fragment, useEffect, Suspense } from "react";
import Axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import ReadOnlyRow from "./Table/ReadOnlyRow";
import EditableRow from "./Table/EditTableRow";
import TableHead from "../../components/Table/TableHead"; // new
import Pagination from "../../components/Table/Pagination"; // new
import { useSortableTable } from "../../components/Table/useSortableTable"; // new
import Loader from "../../utils/Loader";

import { IoMdPersonAdd } from "react-icons/io";
import { MdClose } from "react-icons/md";

//toast
import { success } from "../../components/Toast";
import { ToastContainer } from "react-toastify";
import PingLoader from "../../utils/PingLoader";

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
        accessor: "entry_time",
        sortable: true,
    },
    { id: 12, name: "Actions" },
];

const App = () => {
    const [JobList, setJobList] = useState([]);
    const [tableData, handleSorting] = useSortableTable(JobList, TableHeader); // data, columns // new
    const [cursorPos, setCursorPos] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    // new start
    // fetch data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = "http://localhost:3001/management/getjobentry";
    useEffect(() => {
        const abortCont = new AbortController();

        try {
            fetch(url, { signal: abortCont.signal })
                .then((res) => {
                    if (!res.ok) {
                        throw Error(
                            "Could not fetch the data for that resource"
                        );
                    }
                    return res.json();
                })
                .then((res) => {
                    setJobList(res);
                    setLoading(false);
                    setError(null);
                });
        } catch (err) {
            if (err.name === "AbortError") {
                console.log("Fetch Aborted");
            } else {
                setLoading(false);
                setError(err.message);
            }
        }

        return () => abortCont.abort();
    }, []);
    // new end

    // search filter for all fields
    const [query, setQuery] = useState("");

    const data = Object.values(tableData);
    function search(items) {
        if (query !== "" && cursorPos !== 1) {
            setCursorPos(1);
        }
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

    // add state
    //id is randomly generated with nanoid generator
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
        const newJob = {
            order_number: addFormData.order_number, //handleAddFormChange로 받은 새 데이터
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
        console.log(order_number_auto);
        newJob.order_number = order_number_auto;

        // api call
        Axios.post("http://localhost:3001/management/jobentry", {
            order_number: newJob.order_number, //handleAddFormChange로 받은 새 데이터
            importer_name: newJob.importer_name,
            mother_vessel_name: newJob.mother_vessel_name,
            eta: newJob.eta,
            commodity: newJob.commodity,
            mv_location: newJob.mv_location,
            bl_quantity: newJob.bl_quantity,
            stevedore_name: newJob.stevedore_name,
            stevedore_contact_number: newJob.stevedore_contact_number,
        });

        //jobList의 초기값은 data.json 데이터
        // new start
        const newTableData = [...tableData, newJob];
        // new end

        setJobList(newTableData);

        // close modal
        closeModal();

        // toast
        success("Job added successfully");
    };

    //save modified data (App component)
    const handleEditFormSubmit = (event) => {
        event.preventDefault(); // prevent submit

        const editedJob = {
            id: editJobId, //initial value null
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

        Axios.post("http://localhost:3001/management/updatejobentry", {
            id: editedJob.id,
            new_order_number: editedJob.order_number,
            new_importer_name: editedJob.importer_name,
            new_mother_vessel_name: editedJob.mother_vessel_name,
            new_eta: editedJob.eta,
            new_commodity: editedJob.commodity,
            new_mv_location: editedJob.mv_location,
            new_bl_quantity: editedJob.bl_quantity,
            new_stevedore_name: editedJob.stevedore_name,
            new_stevedore_contact_number: editedJob.stevedore_contact_number,
        });
        // these 3 lines will be replaced // new start
        const index = tableData.findIndex((td) => td.id === editJobId);
        tableData[index] = editedJob;
        setJobList(tableData);
        // new end

        setEditJobId(null);
        success("Job updated successfully");
    };

    //Read-only data If you click the edit button, the existing data is displayed
    const handleEditClick = (event, job) => {
        event.preventDefault(); // ???

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
        //console.log("Deleting job with id: " + jobId);
        Axios.post("http://localhost:3001/management/deletejob", {
            job_id: jobId,
        }).then((response) => {
            if (response.data == "success") {
                success("job deleted successfully");
            }
        });

        newJobList.splice(index, 1);
        setJobList(newJobList);
    };

    // modal for add job
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    // loading and error
    if (loading) {
        return <PingLoader />;
    }
    if (error) {
        return <div>{error}</div>;
    }

    // <button
    //     className="rounded-md bg-red-500 px-3 py-0 text-sm font-semibold text-white transition duration-500 ease-in-out hover:bg-red-700"
    //     onClick={logout}
    // >
    //     Logout
    // </button>

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
                            {search(tableData).map((job, idx) => (
                                <tr
                                    key={job.id}
                                    className={`my-auto items-center justify-center ${
                                        idx % 2 === 1 ? "bg-gray-200" : ""
                                    }`}
                                >
                                    {editJobId === job.id ? (
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
                                            job={job}
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
                                            Add Job
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
                                                    Importer Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="importer_name"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Mother Vessel Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="mother_vessel_name"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    ETA
                                                </label>
                                                <input
                                                    type="date"
                                                    name="eta"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
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
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    MV Location
                                                </label>
                                                <input
                                                    type="text"
                                                    name="mv_location"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    BL Quantity
                                                </label>
                                                <input
                                                    type="number"
                                                    name="bl_quantity"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Stevedore Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="stevedore_name"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Stevedore Contact Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="stevedore_contact_number"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
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
