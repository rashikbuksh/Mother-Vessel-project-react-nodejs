import React, { useState, Fragment, useEffect, Suspense } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ReadOnlyRow from "./TableRows/ReadOnlyRow";
import EditableRow from "./TableRows/EditTableRow";
import { useAuth } from "../../hooks/auth";
import Axios from "axios";
import Loader from "../../utils/Loader";
import TableHead from "../../components/Table/TableHead"; // new
import Pagination from "../../components/Table/Pagination"; // new
import { useSortableTable } from "../../components/Table/useSortableTable"; // new

import { IoMdPersonAdd } from "react-icons/io";
import { MdClose } from "react-icons/md";

import Select from "../../components/Select";

//toast
import { generatedToast, Toast } from "../../components/Toast";

const TableHeader = [
    { id: 1, name: "Id", accessor: "id", sortable: true, sortByOrder: "asc" },
    {
        id: 2,
        name: "Order job Number",
        accessor: "order_job_number",
        sortable: true,
    },
    { id: 4, name: "Date", accessor: "date", sortable: true },
    { id: 5, name: "CP Number", accessor: "cp_number", sortable: true },
    {
        id: 6,
        name: "Date From Charpotro",
        accessor: "date_from_charpotro",
        sortable: true,
    },
    { id: 7, name: "Commodity", accessor: "commodity", sortable: true },
    { id: 8, name: "Capacity", accessor: "capacity", sortable: true },
    { id: 9, name: "LV Name", accessor: "LV_name", sortable: true },
    { id: 10, name: "MV Name", accessor: "MV_name", sortable: true },
    {
        id: 11,
        name: "Loading Location",
        accessor: "loading_location",
        sortable: true,
    },
    {
        id: 12,
        name: "Unloading Location",
        accessor: "unloading_location",
        sortable: true,
    },
    {
        id: 13,
        name: "Loading Started",
        accessor: "loading_started",
        sortable: true,
    },
    {
        id: 14,
        name: "Loading Completed",
        accessor: "loading_completed",
        sortable: true,
    },
    {
        id: 15,
        name: "Sailing",
        accessor: "sailing",
        sortable: true,
    },
    {
        id: 16,
        name: "Duration of Travel",
        accessor: "duration_of_travel",
        sortable: true,
    },
    {
        id: 17,
        name: "Unloading Started",
        accessor: "unloading_started",
        sortable: true,
    },
    {
        id: 18,
        name: "Unloading Completed",
        accessor: "unloading_completed",
        sortable: true,
    },
    { id: 19, name: "Others", accessor: "others", sortable: true },
    {
        id: 20,
        name: "Total Elapsed Time",
        accessor: "total_elapsed_time",
        sortable: true,
    },
    { id: 21, name: "Voyage Time", accessor: "voyage_time", sortable: true },
    { id: 22, name: "Free Time", accessor: "free_time", sortable: true },
    {
        id: 23,
        name: "Total Despatch",
        accessor: "total_despatch",
        sortable: true,
    },
    {
        id: 24,
        name: "Daily Despatch",
        accessor: "daily_despatch",
        sortable: true,
    },
    { id: 25, name: "Action" },
];

const App = () => {
    // new start
    const [DamList, setDamList] = useState([]);
    const [tableData, handleSorting] = useSortableTable(DamList, TableHeader); // data, columns // new
    const [cursorPos, setCursorPos] = useState(1);
    const [pageSize, setPageSize] = useState(20);

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

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/management/getdamarage`)
            .then((res) => res.json())
            .then((data) => {
                setDamList(data);
                console.log("DamList: " + data);
            });
    }, []);

    // new end

    // add state
    //id is randomly generated with nanoid generator
    // const [addFormData, setAddFormData] = useState({
    //     order_job_number: "",
    //     date: "",
    //     cp_number: "",
    //     date_from_charpotro: "",
    //     commodity: "",
    //     capacity: "",
    //     LV_name: "",
    //     MV_name: "",
    //     loading_location: "",
    //     unloading_location: "",
    //     loading_start_time_stamp: "",
    //     loading_completion_time_stamp: "",
    //     sailing_time_stamp: "",
    //     duration_of_travel_time: "",
    //     unloading_start_time_stamp: "",
    //     unloading_completion_time_stamp: "",
    //     others: "",
    //     total_elapsed_time: "",
    //     voyage_time: "",
    //     free_time: "",
    //     total_despatch: "",
    //     daily_despatch: "",
    // });

    //edit status
    const [editFormData, setEditFormData] = useState({
        id: "",
        order_job_number: "",
        date: "",
        cp_number: "",
        date_from_charpotro: "",
        commodity: "",
        capacity: "",
        LV_name: "",
        MV_name: "",
        loading_location: "",
        unloading_location: "",
        loading_start_time_stamp: "",
        loading_completion_time_stamp: "",
        sailing_time_stamp: "",
        duration_of_travel_time: "",
        unloading_start_time_stamp: "",
        unloading_completion_time_stamp: "",
        others: "",
        total_elapsed_time: "",
        voyage_time: "",
        free_time: "",
        total_despatch: "",
        daily_despatch: "",
    });

    //modified id status
    const [editDamId, setEditDamId] = useState(null);

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
    //     const newDam = {
    //         order_job_number: addFormData.order_job_number, //handleAddFormChange로 받은 새 데이터
    //         date: addFormData.date,
    //         cp_number: addFormData.cp_number,
    //         date_from_charpotro: addFormData.date_from_charpotro,
    //         commodity: addFormData.commodity,
    //         capacity: addFormData.capacity,
    //         LV_name: addFormData.LV_name,
    //         MV_name: addFormData.MV_name,
    //         loading_location: addFormData.loading_location,
    //         unloading_location: addFormData.unloading_location,
    //         loading_start_time_stamp: addFormData.loading_start_time_stamp,
    //         loading_completion_time_stamp:
    //             addFormData.loading_completion_time_stamp,
    //         sailing_time_stamp: addFormData.sailing_time_stamp,
    //         duration_of_travel_time: addFormData.duration_of_travel_time,
    //         unloading_start_time_stamp: addFormData.unloading_start_time_stamp,
    //         unloading_completion_time_stamp:
    //             addFormData.unloading_completion_time_stamp,
    //         others: addFormData.others,
    //         total_elapsed_time: addFormData.total_elapsed_time,
    //         voyage_time: addFormData.voyage_time,
    //         free_time: addFormData.free_time,
    //         total_despatch: addFormData.total_despatch,
    //         daily_despatch: addFormData.daily_despatch,
    //     };
    //     console.log("New Dam : " + addFormData.job_number);
    //     // api call
    //     Axios.post(
    //         `${process.env.REACT_APP_API_URL}/management/insertdamarage`,
    //         {
    //             order_job_number: newDam.order_job_number, //handleAddFormChange로 받은 새 데이터
    //             date: newDam.date,
    //             cp_number: newDam.cp_number,
    //             date_from_charpotro: newDam.date_from_charpotro,
    //             commodity: newDam.commodity,
    //             capacity: newDam.capacity,
    //             LV_name: newDam.LV_name,
    //             MV_name: newDam.MV_name,
    //             loading_location: newDam.loading_location,
    //             unloading_location: newDam.unloading_location,
    //             loading_start_time_stamp: newDam.loading_start_time_stamp,
    //             loading_completion_time_stamp:
    //                 newDam.loading_completion_time_stamp,
    //             sailing_time_stamp: newDam.sailing_time_stamp,
    //             duration_of_travel_time: newDam.duration_of_travel_time,
    //             unloading_start_time_stamp: newDam.unloading_start_time_stamp,
    //             unloading_completion_time_stamp:
    //                 newDam.unloading_completion_time_stamp,
    //             others: newDam.others,
    //             total_elapsed_time: newDam.total_elapsed_time,
    //             voyage_time: newDam.voyage_time,
    //             free_time: newDam.free_time,
    //             total_despatch: newDam.total_despatch,
    //             daily_despatch: newDam.daily_despatch,
    //         }
    //     );

    //     //DamList의 초기값은 data.json 데이터
    //     // new start
    //     const newTableData = [...tableData, newDam];
    //     // new end

    //     setDamList(newTableData);

    //     // close modal
    //     closeModal();

    //     // toast
    //     success("Dam added successfully");
    // };

    //save modified data (App component)
    const handleEditFormSubmit = (event) => {
        event.preventDefault(); // prevent submit

        const editedDam = {
            id: editDamId, //handleAddFormChange로 받은 새 데이터
            order_job_number: editFormData.order_job_number,
            date: editFormData.date,
            cp_number: editFormData.cp_number,
            date_from_charpotro: editFormData.date_from_charpotro,
            commodity: editFormData.commodity,
            capacity: editFormData.capacity,
            LV_name: editFormData.LV_name,
            MV_name: editFormData.MV_name,
            loading_location: editFormData.loading_location,
            unloading_location: editFormData.unloading_location,
            loading_start_time_stamp: editFormData.loading_start_time_stamp,
            loading_completion_time_stamp:
                editFormData.loading_completion_time_stamp,
            sailing_time_stamp: editFormData.sailing_time_stamp,
            duration_of_travel_time: editFormData.duration_of_travel_time,
            unloading_start_time_stamp: editFormData.unloading_start_time_stamp,
            unloading_completion_time_stamp:
                editFormData.unloading_completion_time_stamp,
            others: editFormData.others,
            total_elapsed_time: editFormData.total_elapsed_time,
            voyage_time: editFormData.voyage_time,
            free_time: editFormData.free_time,
            total_despatch: editFormData.total_despatch,
            daily_despatch: editFormData.daily_despatch,
        };
        console.log("Edited Dam ID : " + editedDam.id);

        Axios.post(
            `${process.env.REACT_APP_API_URL}/management/updatedamarage`,
            {
                id: editedDam.id, //handleAddFormChange로 받은 새 데이터
                date: editedDam.date,
                loading_location: editedDam.loading_location,
                unloading_location: editedDam.unloading_location,
                loading_start_time_stamp: editedDam.loading_start_time_stamp,
                loading_completion_time_stamp:
                    editedDam.loading_completion_time_stamp,
                sailing_time_stamp: editedDam.sailing_time_stamp,
                duration_of_travel_time: editedDam.duration_of_travel_time,
                unloading_start_time_stamp:
                    editedDam.unloading_start_time_stamp,
                unloading_completion_time_stamp:
                    editedDam.unloading_completion_time_stamp,
                others: editedDam.others,
                total_elapsed_time: editedDam.total_elapsed_time,
                voyage_time: editedDam.voyage_time,
                free_time: editedDam.free_time,
                total_despatch: editedDam.total_despatch,
                daily_despatch: editedDam.daily_despatch,
            }
        ).then((response) => {
            generatedToast(response);
        });
        // these 3 lines will be replaced // new start
        const index = tableData.findIndex((td) => td.id === editDamId);
        tableData[index] = editedDam;
        setDamList(tableData);
        // new end

        setEditDamId(null);
        // success("Dam updated successfully");
    };

    //Read-only data If you click the edit button, the existing data is displayed
    const handleEditClick = (event, Dam) => {
        event.preventDefault(); // ???

        setEditDamId(Dam.id);
        const formValues = {
            order_job_number: Dam.order_job_number,
            date: Dam.date,
            cp_number: Dam.cp_number,
            date_from_charpotro: Dam.date_from_charpotro,
            commodity: Dam.commodity,
            capacity: Dam.capacity,
            LV_name: Dam.LV_name,
            MV_name: Dam.MV_name,
            loading_location: Dam.loading_location,
            unloading_location: Dam.unloading_location,
            loading_start_time_stamp: Dam.loading_start_time_stamp,
            loading_completion_time_stamp: Dam.loading_completion_time_stamp,
            sailing_time_stamp: Dam.sailing_time_stamp,
            duration_of_travel_time: Dam.duration_of_travel_time,
            unloading_start_time_stamp: Dam.unloading_start_time_stamp,
            unloading_completion_time_stamp:
                Dam.unloading_completion_time_stamp,
            others: Dam.others,
            total_elapsed_time: Dam.total_elapsed_time,
            voyage_time: Dam.voyage_time,
            free_time: Dam.free_time,
            total_despatch: Dam.total_despatch,
            daily_despatch: Dam.daily_despatch,
        };
        setEditFormData(formValues);
    };

    //Cancel button when clicked on edit
    const handleCancelClick = () => {
        setEditDamId(null);
    };

    // delete
    const handleDeleteClick = (DamId) => {
        const newDamList = [...DamList];
        const index = DamList.findIndex((Dam) => Dam.id === DamId);
        //console.log("Deleting Dam with id: " + DamId);
        Axios.post(
            `${process.env.REACT_APP_API_URL}/management/deletedamarage`,
            {
                Dam_id: DamId,
            }
        ).then((response) => {
            generatedToast(response);
        });

        newDamList.splice(index, 1);
        setDamList(newDamList);
    };

    // modal for add Dam
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
    //         `${process.env.REACT_APP_API_URL}/management/getCharpotroCpLaLvRate?order_job_number=${addFormData.order_job_number}`
    //     )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             data?.map((item) => {
    //                 addFormData.date_from_charpotro = item.date_from_charpotro;
    //                 addFormData.LV_name = item.LV_name;
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
    //     fetch(
    //         `${process.env.REACT_APP_API_URL}/management/getMvNameToPayment?order_job_number=${addFormData.order_job_number}`
    //     )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             data?.map((item) => {
    //                 addFormData.MV_name = item.MV_name;
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
                    Add Job <IoMdPersonAdd className="ml-2 inline h-5 w-5" />
                </button> */}
            </div>
            <br />
            <form onSubmit={handleEditFormSubmit}>
                <table className="table w-full">
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
                            {search(tableData).map((Dam, idx) => (
                                <tr
                                    key={Dam.id}
                                    className={`my-auto items-center justify-center ${
                                        idx % 2 === 1 ? "bg-gray-200" : ""
                                    }`}
                                >
                                    {editDamId === Dam.id ? (
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
                                            Dam={Dam}
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
                                            className="mb-4 text-left text-3xl font-medium text-gray-900"
                                        >
                                            Add Dam
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
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Order Job Number
                                                </label>
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
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Date
                                                </label>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    CP Number
                                                </label>
                                                <input
                                                    type="number"
                                                    name="cp_number"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
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
                                                    capacity
                                                </label>
                                                <input
                                                    type="number"
                                                    name="capacity"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
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
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    MV Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="MV_name"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Loading Location
                                                </label>
                                                <input
                                                    type="text"
                                                    name="loading_location"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Unloading Location
                                                </label>
                                                <input
                                                    type="text"
                                                    name="unloading_location"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Loading Start Time Stamp
                                                </label>
                                                <input
                                                    type="date"
                                                    name="loading_start_time_stamp"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Loading Completion Time
                                                    Stamp
                                                </label>
                                                <input
                                                    type="date"
                                                    name="loading_completion_time_stamp"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Sailing Time Stamp
                                                </label>
                                                <input
                                                    type="date"
                                                    name="sailing_time_stamp"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Duration of Travel Time
                                                </label>
                                                <input
                                                    type="time"
                                                    name="duration_of_travel_time"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Unloading Start Time Stamp
                                                </label>
                                                <input
                                                    type="date"
                                                    name="unloading_start_time_stamp"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Unloading Completion Time
                                                    Stamp
                                                </label>
                                                <input
                                                    type="date"
                                                    name="unloading_completion_time_stamp"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Others
                                                </label>
                                                <input
                                                    type="text"
                                                    name="others"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Total Elapsed Time
                                                </label>
                                                <input
                                                    type="time"
                                                    name="total_elapsed_time"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Voyage Time
                                                </label>
                                                <input
                                                    type="time"
                                                    name="voyage_time"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Free Time
                                                </label>
                                                <input
                                                    type="time"
                                                    name="free_time"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Total Dispatch
                                                </label>
                                                <input
                                                    type="number"
                                                    name="total_despatch"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Daily Dispatch
                                                </label>
                                                <input
                                                    type="number"
                                                    name="daily_despatch"
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
            </Suspense> */}

            {/* toast  */}
            <Toast />
        </div>
    );
};

export default App;
