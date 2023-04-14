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
import Select from "../../components/Select";

//toast
import { generatedToast, Toast } from "../../components/Toast";

const TableHeader = [
    {
        id: 1,
        name: "Id",
        accessor: "id",
        sortable: true,
        sortByOrder: "asc",
    },
    {
        id: 3,
        name: "Order Job Number",
        accessor: "order_job_number",
        sortable: true,
    },
    { id: 5, name: "Local Agency", accessor: "LA_name", sortable: true },
    { id: 2, name: "LV Name", accessor: "LV_name" },
    {
        id: 4,
        name: "Date From Charpotro",
        accessor: "date_from_charpotro",
        sortable: true,
    },
    { id: 10, name: "Commodity", accessor: "commodity" },
    { id: 8, name: "Destination From", accessor: "dest_from" },
    { id: 9, name: "Destination To", accessor: "dest_to" },
    { id: 11, name: "Current Location", accessor: "current_location" },
    { id: 12, name: "Remark", accessor: "current_location" },
    { id: 13, name: "Trip Completed", accessor: "trip_completed" },
    { id: 15, name: "Updated Date", accessor: "updated_date", sortable: true },
    { id: 16, name: "Actions" },
];

const App = () => {
    // new start
    const [CurrentStatus, setCurrentStatus] = useState([]);
    const [tableData, handleSorting] = useSortableTable(
        CurrentStatus,
        TableHeader
    ); // data, columns // new
    const [cursorPos, setCursorPos] = useState(1);
    const [pageSize, setPageSize] = useState(20);

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
        fetch(`${process.env.REACT_APP_API_URL}/management/getcurrentstatus`)
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
        date_from_charpotro: "",
        commodity: "",
        LA_name: "",
        dest_from: "",
        dest_to: "",
        current_location: "",
        remark: "",
    });

    //edit status
    const [editFormData, setEditFormData] = useState({
        order_job_number: "",
        LV_name: "",
        date_from_charpotro: "",
        commodity: "",
        LA_name: "",
        dest_from: "",
        dest_to: "",
        current_location: "",
        trip_completed: "",
        remark: "",
    });

    //modified id status
    const [editStatusId, setEditStatusId] = useState(null);

    //changeHandler
    //Update state with input data
    // const handleAddFormChange = (event) => {
    //     event.preventDefault();

    //     //fullname, address, phoneNumber, email
    //     const fieldName = event.target.getAttribute("name");
    //     //각 input 입력값
    //     const fieldValue = event.target.value;

    //     const newFormData = { ...addFormData };
    //     newFormData[fieldName] = fieldValue;
    //     //addFormData > event.target(input)
    //     //fullName:"" > name="fullName", value=fullName input 입력값

    //     setAddFormData(newFormData);
    // };

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
    // const handleAddFormSubmit = (event) => {
    //     event.preventDefault(); // ???

    //     //data.json으로 이루어진 기존 행에 새로 입력받은 데이터 행 덧붙이기
    //     const newStatus = {
    //         LV_name: addFormData.LV_name, //handleAddFormChange로 받은 새 데이터
    //         date_from_charpotro: addFormData.date_from_charpotro,
    //         commodity: addFormData.commodity,
    //         LA_name: addFormData.LA_name,
    //         dest_from: addFormData.dest_from,
    //         dest_to: addFormData.dest_to,
    //         current_location: addFormData.current_location,
    //         remark: addFormData.remark,
    //     };

    //     // const current = new Date();
    //     // const order_number_auto = newStatus.importer_name+'-'+current.getDate().toLocaleString()+'-'+newStatus.mother_vessel_name+'-'+newStatus.mv_location
    //     // console.log(order_number_auto)

    //     // api call
    //     Axios.post(
    //         `${process.env.REACT_APP_API_URL}/management/currentstatus`,
    //         {
    //             LV_name: newStatus.LV_name, //handleAddFormChange로 받은 새 데이터
    //             date_from_charpotro: newStatus.date_from_charpotro,
    //             commodity: newStatus.commodity,
    //             LA_name: newStatus.LA_name,
    //             dest_from: newStatus.dest_from,
    //             dest_to: newStatus.dest_to,
    //             current_location: newStatus.current_location,
    //             remark: newStatus.remark,
    //         }
    //     );

    //     //CurrentStatus의 초기값은 data.json 데이터
    //     // new start
    //     const newTableData = [...tableData, newStatus];
    //     // new end

    //     setCurrentStatus(newTableData);

    //     // close modal
    //     closeModal();

    //     // toast
    //     success("Status added successfully");
    // };

    //save modified data (App component)
    const handleEditFormSubmit = (event) => {
        event.preventDefault(); // prevent submit

        const editedStatus = {
            id: editStatusId, //initial value null
            order_job_number: editFormData.order_job_number,
            LA_name: editFormData.LA_name,
            LV_name: editFormData.LV_name,
            date_from_charpotro: editFormData.date_from_charpotro,
            commodity: editFormData.commodity,
            dest_from: editFormData.dest_from,
            dest_to: editFormData.dest_to,
            current_location: editFormData.current_location,
            remark: editFormData.remark,
            trip_completed: editFormData.trip_completed,
        };

        Axios.post(
            `${process.env.REACT_APP_API_URL}/management/updatecurrentstatus`,
            {
                id: editedStatus.id,
                current_location: editedStatus.current_location,
                remark: editedStatus.remark,
                trip_completed: editedStatus.trip_completed,
            }
        ).then((response) => {
            console.log(response);
            generatedToast(response);
        });

        // these 3 lines will be repLA_nameced // new start
        const index = tableData.findIndex((td) => td.id === editStatusId);
        tableData[index] = editedStatus;
        setCurrentStatus(tableData);
        // new end
        setEditStatusId(null);
        // success("Status updated successfully");
    };

    //Read-only data If you click the edit button, the existing data is dispLA_nameyed
    const handleEditClick = (event, Status) => {
        event.preventDefault(); // ???

        setEditStatusId(Status.id);
        const formValues = {
            order_job_number: Status.order_job_number,
            LA_name: Status.LA_name,
            LV_name: Status.LV_name,
            date_from_charpotro: Status.date_from_charpotro,
            commodity: Status.commodity,
            dest_from: Status.dest_from,
            dest_to: Status.dest_to,
            current_location: Status.current_location,
            remark: Status.remark,
            trip_completed: Status.trip_completed,
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
        const index = CurrentStatus.findIndex(
            (Status) => Status.id === StatusId
        );
        //console.log("Deleting Status with id: " + StatusId);
        Axios.post(
            `${process.env.REACT_APP_API_URL}/management/deletecurrentstatus`,
            {
                status_id: StatusId,
            }
        ).then((response) => {
            console.log(response);
            generatedToast(response);
        });

        newCurrentStatus.splice(index, 1);
        setCurrentStatus(newCurrentStatus);
    };

    // modal for add Status
    // let [isOpen, setIsOpen] = useState(false);

    // function closeModal() {
    //     setIsOpen(false);
    // }

    // function openModal() {
    //     fetch(`${process.env.REACT_APP_API_URL}/management/getorderjob`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setOrderJobList(data);
    //             console.log(data);
    //         });
    //     setIsOpen(true);
    // }
    // useEffect(() => {
    //     fetch(
    //         `${process.env.REACT_APP_API_URL}/management/getCharpotroCpLA_nameLvRate?order_job_number=${addFormData.order_job_number}`
    //     )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             data?.map((item) => {
    //                 addFormData.date_from_charpotro = item.date_from_charpotro;
    //                 addFormData.LA_name = item.LA_name_name;
    //                 addFormData.LV_name = item.LV_name;
    //                 addFormData.dest_from = item.dest_from;
    //                 addFormData.dest_to = item.dest_to;
    //             });
    //         });
    //     fetch(
    //         `${process.env.REACT_APP_API_URL}/management/getComodityToPayment?order_job_number=${addFormData.order_job_number}`
    //     )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             data?.map((item) => {
    //                 addFormData.commodity = item.commodity;
    //             });
    //         });
    //     console.log("addFormData", addFormData);
    // }, [addFormData.order_job_number]);

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
                {/* <button
                    // new start // job change copy paste the className
                    className="flex flex-row items-center justify-center rounded-md bg-green-600 px-3 py-0 text-sm font-semibold text-white transition duration-500 ease-in-out hover:bg-green-400"
                    onClick={openModal}
                >
                    Add Status <IoMdPersonAdd className="ml-2 inline h-5 w-5" />
                </button> */}
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
                            {search(tableData).map((status, idx) => (
                                <tr
                                    status={status.id}
                                    className={`my-auto items-center justify-center ${
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
                            ))}
                        </tbody>
                    )}
                </table>
            </form>

            {/* // new end */}

            {/* add item modal */}
            {/* <Suspense fallback={<Loader />}>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="z-10 overflow-y-auto"
                        onClose={() => {}}
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
                            <div className="fixed inset-0 bg-bLA_nameck bg-opacity-25" />
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
                                            className="mb-4 text-left text-3xl font-medium text-gray-900"
                                        >
                                            Add Status
                                            <button
                                                className="float-right"
                                                onClick={closeModal}
                                            >
                                                <MdClose className="inline text-red-600" />
                                            </button>
                                        </Dialog.Title>
                                        <form
                                            onSubmit={handleAddFormSubmit}
                                            className="flex flex-col gap-4"
                                        >
                                            <div className="group reLA_nametive w-72 md:w-80 lg:w-96">
                                                <LA_namebel className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Order Job Number
                                                </LA_namebel>
                                                {orderJobList && (
                                                    <Select
                                                        options={orderJobList}
                                                        name="order_job_number"
                                                        addFormData={
                                                            addFormData
                                                        }
                                                        setAddFormData={
                                                            setAddFormData
                                                        }
                                                        isAddFromData={true}
                                                    />
                                                )}
                                            </div>
                                            <div className="group reLA_nametive w-72 md:w-80 lg:w-96">
                                                <LA_namebel className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    LV Name
                                                </LA_namebel>
                                                <input
                                                    type="text"
                                                    name="LV_name"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    pLA_nameceholder="LV Name"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group reLA_nametive w-72 md:w-80 lg:w-96">
                                                <LA_namebel className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Date From Charpotro
                                                </LA_namebel>
                                                <input
                                                    type="date"
                                                    name="date_from_charpotro"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    pLA_nameceholder="Date From Charpotro"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group reLA_nametive w-72 md:w-80 lg:w-96">
                                                <LA_namebel className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Commodity
                                                </LA_namebel>
                                                <input
                                                    type="text"
                                                    name="commodity"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    pLA_nameceholder="Commodity"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group reLA_nametive w-72 md:w-80 lg:w-96">
                                                <LA_namebel className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    LA_name
                                                </LA_namebel>
                                                <input
                                                    type="text"
                                                    name="LA_name"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    pLA_nameceholder="LA_name"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group reLA_nametive w-72 md:w-80 lg:w-96">
                                                <LA_namebel className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Destination From
                                                </LA_namebel>
                                                <input
                                                    type="text"
                                                    name="dest_from"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    pLA_nameceholder="Destination From"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group reLA_nametive w-72 md:w-80 lg:w-96">
                                                <LA_namebel className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Destination To
                                                </LA_namebel>
                                                <input
                                                    type="text"
                                                    name="dest_to"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    pLA_nameceholder="Destination To"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group reLA_nametive w-72 md:w-80 lg:w-96">
                                                <LA_namebel className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Current Location
                                                </LA_namebel>
                                                <input
                                                    type="text"
                                                    name="current_location"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    pLA_nameceholder="Current Location"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group reLA_nametive w-72 md:w-80 lg:w-96">
                                                <LA_namebel className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Remark
                                                </LA_namebel>
                                                <input
                                                    type="text"
                                                    name="remark"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    pLA_nameceholder="Remark"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="inline-flex w-72 justify-center rounded-md border border-transparent bg-green-300 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 md:w-80 lg:w-96"
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
            </Suspense> */}

            {/* toast  */}
            <Toast />
        </div>
    );
};

export default App;
