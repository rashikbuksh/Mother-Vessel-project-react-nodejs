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
    },
    {
        id: 3,
        name: "Job Number",
        accessor: "job_number",
    },
    {
        id: 4,
        name: "Date From Charpotro",
        accessor: "date_from_charpotro",
        sortable: true,
    },
    {
        id: 5,
        name: "CP Number From Charpotro",
        accessor: "cp_number_from_charpotro",
    },
    { id: 6, name: "LA Name", accessor: "LA_name" },
    { id: 7, name: "LV Name", accessor: "LV_name" },
    { id: 8, name: "MV Name", accessor: "MV_name" },
    { id: 9, name: "Destination From", accessor: "dest_from" },
    { id: 10, name: "Destination To", accessor: "dest_to" },
    { id: 11, name: "Capacity in Tons", accessor: "capacity_ton" },
    { id: 12, name: "Rate", accessor: "rate", sortable: true },
    {
        id: 13,
        name: "60 Percent Payment",
        accessor: "sixty_percent_payment",
        sortable: true,
    },
    { id: 14, name: "40 Percent Payment", accessor: "forty_percent_payment" },
    { id: 15, name: "Damarage", accessor: "damarage" },
    { id: 16, name: "2nd Trip", accessor: "second_trip" },
    { id: 17, name: "3rd Trip", accessor: "third_trip" },
    { id: 18, name: "Direct Trip", accessor: "direct_trip" },
    { id: 19, name: "Actions" },
];

const App = () => {
    // new start
    const [ChqList, setChqList] = useState([]);
    const [tableData, handleSorting] = useSortableTable(ChqList, TableHeader); // data, columns // new
    const [cursorPos, setCursorPos] = useState(1);
    const [pageSize, setPageSize] = useState(2);

    const { logout } = useAuth();

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
        fetch("http://localhost:3001/management/getchqapproval")
            .then((res) => res.json())
            .then((data) => {
                setChqList(data);
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
        MV_name: "",
        dest_from: "",
        dest_to: "",
        capacity_ton: "",
        rate: "",
        sixty_percent_payment: "",
        forty_percent_payment: "",
        damarage: "",
        second_trip: "",
        third_trip: "",
        direct_trip: "",
    });

    //edit status
    const [editFormData, setEditFormData] = useState({
        order_number: "",
        job_number: "",
        date_from_charpotro: "",
        cp_number_from_charpotro: "",
        LA_name: "",
        LV_name: "",
        MV_name: "",
        dest_from: "",
        dest_to: "",
        capacity_ton: "",
        rate: "",
        sixty_percent_payment: "",
        forty_percent_payment: "",
        damarage: "",
        second_trip: "",
        third_trip: "",
        direct_trip: "",
    });

    //modified id status
    const [editChqId, setEditChqId] = useState(null);

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
        const newChq = {
            order_number: addFormData.order_number, //handleAddFormChange로 받은 새 데이터
            job_number: addFormData.job_number,
            date_from_charpotro: addFormData.date_from_charpotro,
            cp_number_from_charpotro: addFormData.cp_number_from_charpotro,
            LA_name: addFormData.LA_name,
            LV_name: addFormData.LV_name,
            MV_name: addFormData.MV_name,
            dest_from: addFormData.dest_from,
            dest_to: addFormData.dest_to,
            capacity_ton: addFormData.capacity_ton,
            rate: addFormData.rate,
            sixty_percent_payment: addFormData.sixty_percent_payment,
            forty_percent_payment: addFormData.forty_percent_payment,
            damarage: addFormData.damarage,
            second_trip: addFormData.second_trip,
            third_trip: addFormData.third_trip,
            direct_trip: addFormData.direct_trip,
        };

        //const current = new Date();
        //const order_number_auto = newChq.importer_name+'-'+current.getDate().toLocaleString()+'-'+newChq.mother_vessel_name+'-'+newChq.mv_location
        //console.log(order_number_auto)

        // api call
        Axios.post("http://localhost:3001/management/insertchq_approval", {
            order_number: newChq.order_number, //handleAddFormChange로 받은 새 데이터
            job_number: newChq.job_number,
            date_from_charpotro: newChq.date_from_charpotro,
            cp_number_from_charpotro: newChq.cp_number_from_charpotro,
            LA_name: newChq.LA_name,
            LV_name: newChq.LV_name,
            MV_name: newChq.MV_name,
            dest_from: newChq.dest_from,
            dest_to: newChq.dest_to,
            capacity_ton: newChq.capacity_ton,
            rate: newChq.rate,
            sixty_percent_payment: newChq.sixty_percent_payment,
            forty_percent_payment: newChq.forty_percent_payment,
            damarage: newChq.damarage,
            second_trip: newChq.second_trip,
            third_trip: newChq.third_trip,
            direct_trip: newChq.direct_trip,
        });

        //ChqList의 초기값은 data.json 데이터
        // new start
        const newTableData = [...tableData, newChq];
        // new end
        setChqList(newTableData);

        // close modal
        closeModal();

        // toast
        success("Chq added successfully");
    };

    //save modified data (App component)
    const handleEditFormSubmit = (event) => {
        event.preventDefault(); // prevent submit

        const editedChq = {
            id: editChqId, //initial value null
            order_number: editFormData.order_number,
            job_number: editFormData.job_number,
            date_from_charpotro: editFormData.date_from_charpotro,
            cp_number_from_charpotro: editFormData.cp_number_from_charpotro,
            LA_name: editFormData.LA_name,
            LV_name: editFormData.LV_name,
            MV_name: editFormData.MV_name,
            dest_from: editFormData.dest_from,
            dest_to: editFormData.dest_to,
            capacity_ton: editFormData.capacity_ton,
            rate: editFormData.rate,
            sixty_percent_payment: editFormData.sixty_percent_payment,
            forty_percent_payment: editFormData.forty_percent_payment,
            damarage: editFormData.damarage,
            second_trip: editFormData.second_trip,
            third_trip: editFormData.third_trip,
            direct_trip: editFormData.direct_trip,
        };

        Axios.post("http://localhost:3001/management/updatechq_approval", {
            id: editedChq.id,
            new_order_number: editedChq.order_number,
            new_job_number: editedChq.job_number,
            new_date_from_charpotro: editedChq.date_from_charpotro,
            new_cp_number_from_charpotro: editedChq.cp_number_from_charpotro,
            new_LA_name: editedChq.LA_name,
            new_LV_name: editedChq.LV_name,
            new_MV_name: editedChq.MV_name,
            new_dest_from: editedChq.dest_from,
            new_dest_to: editedChq.dest_to,
            new_capacity_ton: editedChq.capacity_ton,
            new_rate: editedChq.rate,
            new_sixty_percent_payment: editedChq.sixty_percent_payment,
            new_forty_percent_payment: editedChq.forty_percent_payment,
            new_damarage: editedChq.damarage,
            new_second_trip: editedChq.second_trip,
            new_third_trip: editedChq.third_trip,
            new_direct_trip: editedChq.direct_trip,
        });

        // these 3 lines will be replaced // new start
        const index = tableData.findIndex((td) => td.id === editChqId);
        tableData[index] = editedChq;
        setChqList(tableData);
        // new end

        setEditChqId(null);
        success("Chq updated successfully");
    };

    //Read-only data If you click the edit button, the existing data is displayed
    const handleEditClick = (event, Chq) => {
        event.preventDefault(); // ???

        setEditChqId(Chq.id);
        const formValues = {
            order_number: Chq.order_number,
            job_number: Chq.job_number,
            date_from_charpotro: Chq.date_from_charpotro,
            cp_number_from_charpotro: Chq.cp_number_from_charpotro,
            LA_name: Chq.LA_name,
            LV_name: Chq.LV_name,
            MV_name: Chq.MV_name,
            dest_from: Chq.dest_from,
            dest_to: Chq.dest_to,
            capacity_ton: Chq.capacity_ton,
            rate: Chq.rate,
            sixty_percent_payment: Chq.sixty_percent_payment,
            forty_percent_payment: Chq.forty_percent_payment,
            damarage: Chq.damarage,
            second_trip: Chq.second_trip,
            third_trip: Chq.third_trip,
            direct_trip: Chq.direct_trip,
        };
        setEditFormData(formValues);
    };

    //Cancel button when clicked on edit
    const handleCancelClick = () => {
        setEditChqId(null);
    };

    // delete
    const handleDeleteClick = (ChqId) => {
        const newChqList = [...ChqList];
        const index = ChqList.findIndex((Chq) => Chq.id === ChqId);
        //console.log("Deleting Chq with id: " + ChqId);
        Axios.post("http://localhost:3001/management/deletechq_approval", {
            Chq_id: ChqId,
        }).then((response) => {
            if (response.data == "success") {
                success("Chq deleted successfully");
            }
        });

        newChqList.splice(index, 1);
        setChqList(newChqList);
    };

    const filteredChq =
        query === ""
            ? ChqList
            : ChqList.filter((Chq) =>
                  Chq.order_number
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    // modal for add Chq
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
                    // new start // Chq change copy paste the className
                    className="flex flex-row items-center justify-center rounded-md bg-green-600 px-3 py-0 text-sm font-semibold text-white transition duration-500 ease-in-out hover:bg-green-400"
                    onClick={openModal}
                >
                    Add Chq <IoMdPersonAdd className="ml-2 inline h-5 w-5" />
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
                            {search(tableData).map((Chq, idx) => (
                                <tr
                                    key={Chq.id}
                                    className={`my-auto items-center justify-center ${
                                        idx % 2 === 1 ? "bg-gray-200" : ""
                                    }`}
                                >
                                    {editChqId === Chq.id ? (
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
                                            Chq={Chq}
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
                                            Add Chq
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
                                                    placeholder="Will be fetched"
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
                                                    placeholder="Will be fetched"
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
                                                    CP Number From Charpotro
                                                </label>
                                                <input
                                                    type="number"
                                                    name="cp_number_from_charpotro"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    LA Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="LA_name"
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
                                                    Destination From
                                                </label>
                                                <input
                                                    type="text"
                                                    name="dest_from"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
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
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Capacity in Ton
                                                </label>
                                                <input
                                                    type="number"
                                                    name="capacity_ton"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
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
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    60 Percent Payment
                                                </label>
                                                <input
                                                    type="text"
                                                    name="sixty_percent_payment"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    40 Percent Payment
                                                </label>
                                                <input
                                                    type="text"
                                                    name="forty_percent_payment"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Damarage
                                                </label>
                                                <input
                                                    type="text"
                                                    name="damarage"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    2nd Trip
                                                </label>
                                                <input
                                                    type="text"
                                                    name="second_trip"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    3rd Trip
                                                </label>
                                                <input
                                                    type="text"
                                                    name="third_trip"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Direct Trip
                                                </label>
                                                <input
                                                    type="text"
                                                    name="direct_trip"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
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
