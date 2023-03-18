import React, { useState, Fragment, useEffect, Suspense } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ReadOnlyRow from "./TableRows/ReadOnlyRow";
import EditableRow from "./TableRows/EditTableRow";
import { sha256 } from "js-sha256";
import Axios from "axios";
import Loader from "../../utils/Loader";
import { useAuth } from "../../hooks/auth";

import { IoMdPersonAdd } from "react-icons/io";

//toast
import { success, warning } from "../../components/Toast";
import { ToastContainer } from "react-toastify";

const TableHeader = [
    { id: 1, name: "Id", width: "w-8" },
    { id: 2, name: "Order Number", width: "w-16" },
    { id: 3, name: "Importer Name", width: "w-16" },
    { id: 4, name: "Mother Vessel Name", width: "w-16" },
    { id: 5, name: "ETA", width: "w-16" },
    { id: 6, name: "Commodity", width: "w-16" },
    { id: 7, name: "MV Location", width: "w-16" },
    { id: 8, name: "BL Quantity", width: "w-16" },
    { id: 9, name: "Stevedore Name", width: "w-16" },
    { id: 10, name: "Stevedore Contact Number", width: "w-16" },
    { id: 11, name: "Entry Time", width: "w-16" },
    { id: 12, name: "Actions", width: "w-16" },
];

const App = () => {
    const [JobList, setJobList] = useState([]);
    const { logout } = useAuth();

    useEffect(() => {
        fetch("http://localhost:3001/management/getjobentry")
            .then((res) => res.json())
            .then((data) => {
                setJobList(data);
            });
    }, [JobList]);

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

        const current = new Date();
        const order_number_auto =
            newJob.importer_name +
            "-" +
            current.getDate().toLocaleString() +
            "-" +
            newJob.mother_vessel_name +
            "-" +
            newJob.mv_location;
        console.log(order_number_auto);

        // api call
        Axios.post("http://localhost:3001/management/jobentry", {
            order_number: order_number_auto, //handleAddFormChange로 받은 새 데이터
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
        const newJobList = [...JobList, newJob];
        setJobList(newJobList);

        // close modal
        closeModal();

        // toast
        success("job added successfully");
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

        const newJobList = [...JobList]; //json.data + data added with setJobList above by receiving new input
        const index = JobList.findIndex((job) => job.id === editJobId);
        newJobList[index] = editedJob; // Assign the modified data object to the object of the index row of the jobList array, which is the entire data

        setJobList(newJobList);
        setEditJobId(null);
        success("job updated successfully");
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

    // search filter
    const [query, setQuery] = useState("");

    const filteredJob =
        query === ""
            ? JobList
            : JobList.filter((job) =>
                  job.order_number
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    // modal for add job
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
            <div className="flex flex-row justify-center">
                <button
                    className="flex flex-row items-center justify-center rounded-md bg-green-300 px-3 py-0 text-sm font-semibold text-gray-900 transition duration-500 ease-in-out hover:bg-green-400"
                    onClick={openModal}
                >
                    Add Job <IoMdPersonAdd className="ml-2 inline h-5 w-5" />
                </button>
                <input
                    className="mx-auto block w-1/2 rounded-md border-2 border-slate-300 bg-white py-2 shadow-lg placeholder:italic placeholder:text-slate-500 focus:border-green-500 focus:ring-0 sm:text-sm"
                    placeholder="Search for name..."
                    type="search"
                    name="search"
                    onChange={(event) => setQuery(event.target.value)}
                />
                <button
                    className="rounded-md bg-red-500 px-3 py-0 text-sm font-semibold text-white transition duration-500 ease-in-out hover:bg-red-700"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
            <br />
            <form onSubmit={handleEditFormSubmit}>
                <table className="w-full rounded-md">
                    <thead className="rounded-md border-b-2 border-gray-400 bg-orange-200">
                        <tr>
                            {TableHeader.map((header) => (
                                <th
                                    key={header.id}
                                    className={`border-r-2 px-2 text-left text-sm font-semibold tracking-wide ${header.width}`}
                                >
                                    {header.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 rounded-md">
                        {filteredJob.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredJob.map((job, idx) => (
                                <tr
                                    key={job.id}
                                    className={`bg-white ${
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
                            ))
                        )}
                    </tbody>
                </table>
            </form>

            {/* add item modal */}
            <Suspense fallback={<Loader />}>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={closeModal}
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
                                        <Dialog.Title
                                            as="h3"
                                            className="mb-4 text-center text-3xl font-medium text-gray-900"
                                        >
                                            Add Job
                                        </Dialog.Title>
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
                                                    placeholder="Will be Auto Generated"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

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
