import React, { useState, Fragment, useEffect, Suspense } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ReadOnlyRow from "./TableRows/ReadOnlyRow";
import EditableRow from "./TableRows/EditTableRow";
import { sha256 } from "js-sha256";
import Axios from "axios";
import Loader from "../../utils/Loader";

import { IoMdPersonAdd } from "react-icons/io";

//toast
import { success, warning } from "../../components/Toast";
import { ToastContainer } from "react-toastify";

const TableHeader = [
    { id: 1, name: "Id", width: "w-8" },
    { id: 2, name: "LV Name", width: "w-16" },
    { id: 4, name: "Date From Charpotro", width: "w-16" },
    { id: 10, name: "Commodity", width: "w-16" },
    { id: 5, name: "LA", width: "w-16" },
    { id: 8, name: "Destination From", width: "w-16" },
    { id: 9, name: "Destination To", width: "w-16" },
    { id: 11, name: "Current Location", width: "w-16" },
    { id: 12, name: "Remark", width: "w-16" },
    { id: 15, name: "Created Date", width: "w-16" },
    { id: 16, name: "Actions", width: "w-16" },
];

const App = () => {
    const [CurrentStatus, setCurrentStatus] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/management/getcurrentstatus")
            .then((res) => res.json())
            .then((data) => {
                setCurrentStatus(data);
            });
    }, [CurrentStatus]);

    // add state
    //id is randomly generated with nanoid generator
    const [addFormData, setAddFormData] = useState({
        LV_name: "",
        date_from_charpotro: "",
        commodity: "",
        LA: "",
        dest_from: "",
        dest_to: "",
        current_location: "",
        remark: "",
        
    });

    //edit status
    const [editFormData, setEditFormData] = useState({
        LV_name: "",
        date_from_charpotro: "",
        commodity: "",
        LA: "",
        dest_from: "",
        dest_to: "",
        current_location: "",
        remark: "",
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

    //submit handler
    //Clicking the Add button adds a new data row to the existing row
    const handleAddFormSubmit = (event) => {
        event.preventDefault(); // ???

        //data.json으로 이루어진 기존 행에 새로 입력받은 데이터 행 덧붙이기
        const newStatus = {
            LV_name: addFormData.LV_name, //handleAddFormChange로 받은 새 데이터
            date_from_charpotro: addFormData.date_from_charpotro,
            commodity: addFormData.commodity,
            LA: addFormData.LA,
            dest_from: addFormData.dest_from,
            dest_to: addFormData.dest_to,
            current_location: addFormData.current_location,
            remark: addFormData.remark,
        };

        // const current = new Date();
        // const order_number_auto = newStatus.importer_name+'-'+current.getDate().toLocaleString()+'-'+newStatus.mother_vessel_name+'-'+newStatus.mv_location
        // console.log(order_number_auto)

        // api call
        Axios.post("http://localhost:3001/management/currentstatus", {
            LV_name: newStatus.LV_name, //handleAddFormChange로 받은 새 데이터
            date_from_charpotro: newStatus.date_from_charpotro,
            commodity: newStatus.commodity,
            LA: newStatus.LA,
            dest_from: newStatus.dest_from,
            dest_to: newStatus.dest_to,
            current_location: newStatus.current_location,
            remark: newStatus.remark,
        });

        //CurrentStatus의 초기값은 data.json 데이터
        const newCurrentStatus = [...CurrentStatus, newStatus];
        setCurrentStatus(newCurrentStatus);

        // close modal
        closeModal();

        // toast
        success("Status added successfully");
    };

    //save modified data (App component)
    const handleEditFormSubmit = (event) => {
        event.preventDefault(); // prevent submit

        const editedStatus = {
            id: editStatusId, //initial value null
            LV_name: editFormData.LV_name, 
            date_from_charpotro: editFormData.date_from_charpotro,
            commodity: editFormData.commodity,
            LA: editFormData.LA,
            dest_from: editFormData.dest_from,
            dest_to: editFormData.dest_to,
            current_location: editFormData.current_location,
            remark: editFormData.remark,
        };

        Axios.post("http://localhost:3001/management/updatecurrentstatus", {
            id: editedStatus.id,
            LV_name: editedStatus.LV_name, 
            date_from_charpotro: editedStatus.date_from_charpotro,
            commodity: editedStatus.commodity,
            LA: editedStatus.LA,
            dest_from: editedStatus.dest_from,
            dest_to: editedStatus.dest_to,
            current_location: editedStatus.current_location,
            remark: editedStatus.remark,
        });

        const newCurrentStatus = [...CurrentStatus]; //json.data + data added with setCurrentStatus above by receiving new input
        const index = CurrentStatus.findIndex((Status) => Status.id === editStatusId);
        newCurrentStatus[index] = editedStatus; // Assign the modified data object to the object of the index row of the CurrentStatus array, which is the entire data

        setCurrentStatus(newCurrentStatus);
        setEditStatusId(null);
        success("Status updated successfully");
    };

    //Read-only data If you click the edit button, the existing data is displayed
    const handleEditClick = (event, Status) => {
        event.preventDefault(); // ???

        setEditStatusId(Status.id);
        const formValues = {
            LV_name: Status.LV_name, 
            date_from_charpotro: Status.date_from_charpotro,
            commodity: Status.commodity,
            LA: Status.LA,
            dest_from: Status.dest_from,
            dest_to: Status.dest_to,
            current_location: Status.current_location,
            remark: Status.remark,
        };
        setEditFormData(formValues);
    };

    //Cancel button when clicked on edit
    const handleCancelClick = () => {
        setEditStatusId(null);
    };

    // delete
    const handleDeleteClick = (StatusId) => {
        const newCurrentStatus = [...CurrentStatus];
        const index = CurrentStatus.findIndex((Status) => Status.id === StatusId);
        //console.log("Deleting Status with id: " + StatusId);
        Axios.post("http://localhost:3001/management/deletecurrentstatus", {
            status_id: StatusId,
        }).then((response) => {
            if (response.data == "success") {
                success("Status deleted successfully");
            }
        });

        newCurrentStatus.splice(index, 1);
        setCurrentStatus(newCurrentStatus);
    };

    // search filter
    const [query, setQuery] = useState("");

    const filteredStatus =
        query === ""
            ? CurrentStatus
            : CurrentStatus.filter((Status) =>
                  Status.order_number
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    // modal for add Status
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    // logout
    if (localStorage.getItem("user_type") == "admin") {
    } else if (localStorage.getItem("user_type") == "operations") {
        window.location.href = "/";
    } else {
        window.location.href = "/login";
    }
    const logout = () => {
        localStorage.setItem("loggedin", "false");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_type");
        window.location.href = "/login";
    };

    //If save(submit) is pressed after editing is completed, submit > handleEditFormSubmit action
    return (
        <div className="m-2 mt-4">
            <div className="flex flex-row justify-center">
                <button
                    className="flex flex-row items-center justify-center rounded-md bg-green-300 px-3 py-0 text-sm font-semibold text-gray-900 transition duration-500 ease-in-out hover:bg-green-400"
                    onClick={openModal}
                >
                    Add Status <IoMdPersonAdd className="ml-2 inline h-5 w-5" />
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
                        {filteredStatus.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredStatus.map((status, idx) => (
                                <tr
                                    key={status.id}
                                    className={`bg-white ${
                                        idx % 2 === 1 ? "bg-gray-200" : ""
                                    }`}
                                >
                                    {editStatusId === status.id ? (
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
                                        status={status}
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
                                            Add Status
                                        </Dialog.Title>
                                        <form
                                            onSubmit={handleAddFormSubmit}
                                            className="flex flex-col gap-4"
                                        >
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    LV Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="LV_name"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    
                                                    placeholder="LV Name"
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
                                                    LA
                                                </label>
                                                <input
                                                    type="text"
                                                    name="LA"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    placeholder="LA"
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
                                                    Current Location
                                                </label>
                                                <input
                                                    type="text"           
                                                    name="current_location"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    placeholder="Current Location"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Remark
                                                </label>
                                                <input
                                                    type="text"
                                                    name="remark"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    placeholder="Remark"
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
