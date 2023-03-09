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
    { id: 2, name: "Job Number", width: "w-16" },
    { id: 3, name: "LV Name", width: "w-16" },
    { id: 4, name: "Date From Charpotro", width: "w-16" },
    { id: 5, name: "MV Name", width: "w-16" },
    { id: 6, name: "Commodity", width: "w-16" },
    { id: 7, name: "Chq No", width: "w-16" },
    { id: 8, name: "Chq Issue Date", width: "w-16" },
    { id: 9, name: "Amount", width: "w-16" },
    { id: 10, name: "Part Pay", width: "w-16" },
    { id: 11, name: "Payment Approved", width: "w-16" },
    { id: 12, name: "Balance", width: "w-16" },
    { id: 13, name: "Payment Chq No", width: "w-16" },
    { id: 14, name: "Payment Chq Amount", width: "w-16" },
    { id: 15, name: "Payment Chq Date", width: "w-16" },
    { id: 16, name: "Added Date", width: "w-16" },
    { id: 17, name: "Actions", width: "w-16" },
];

const App = () => {
    const [PayList, setPayList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/management/getpayment")
            .then((res) => res.json())
            .then((data) => {
                setPayList(data);
            });
    }, [PayList]);

    // add state
    //id is randomly generated with nanoid generator
    const [addFormData, setAddFormData] = useState({
        job_number: "",
        LV_name: "",
        date_from_charpotro: "",
        MV_name: "",
        commodity: "",
        chq_no: "",
        chq_issue_date: "",
        amount: "",
        part_pay: "",
        payment_approved: "",
        balance: "",
        payment_chq_no: "",
        payment_chq_amount: "",
        payment_chq_date: "",
        added_date: "",
    });

    //edit status
    const [editFormData, setEditFormData] = useState({
        job_number: "",
        LV_name: "",
        date_from_charpotro: "",
        MV_name: "",
        commodity: "",
        chq_no: "",
        chq_issue_date: "",
        amount: "",
        part_pay: "",
        payment_approved: "",
        balance: "",
        payment_chq_no: "",
        payment_chq_amount: "",
        payment_chq_date: "",
        added_date: "",
    });

    //modified id status
    const [editPayId, setEditPayId] = useState(null);

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
        const newPay = {
            job_number: addFormData.job_number,  //handleAddFormChange로 받은 새 데이터
            LV_name: addFormData.LV_name,
            date_from_charpotro: addFormData.date_from_charpotro,
            MV_name: addFormData.MV_name,
            commodity: addFormData.commodity,
            chq_no: addFormData.chq_no,
            chq_issue_date: addFormData.chq_issue_date,
            amount: addFormData.amount,
            part_pay: addFormData.part_pay,
            payment_approved: addFormData.payment_approved,
            balance: addFormData.balance,
            payment_chq_no: addFormData.payment_chq_no,
            payment_chq_amount: addFormData.payment_chq_amount,
            payment_chq_date: addFormData.payment_chq_date,
            added_date: addFormData.added_date,
        };

        //const current = new Date();
        //const order_number_auto = newPay.importer_name+'-'+current.getDate().toLocaleString()+'-'+newPay.mother_vessel_name+'-'+newPay.mv_location
        //console.log(order_number_auto)

        // api call
        Axios.post("http://localhost:3001/management/insertpayment", {
            job_number: newPay.job_number,  //handleAddFormChange로 받은 새 데이터
            LV_name: newPay.LV_name,
            date_from_charpotro: newPay.date_from_charpotro,
            MV_name: newPay.MV_name,
            commodity: newPay.commodity,
            chq_no: newPay.chq_no,
            chq_issue_date: newPay.chq_issue_date,
            amount: newPay.amount,
            part_pay: newPay.part_pay,
            payment_approved: newPay.payment_approved,
            balance: newPay.balance,
            payment_chq_no: newPay.payment_chq_no,
            payment_chq_amount: newPay.payment_chq_amount,
            payment_chq_date: newPay.payment_chq_date,
            added_date: newPay.added_date,
        });

        //PayList의 초기값은 data.json 데이터
        const newPayList = [...PayList, newPay];
        setPayList(newPayList);

        // close modal
        closeModal();

        // toast
        success("Pay added successfully");
    };

    //save modified data (App component)
    const handleEditFormSubmit = (event) => {
        event.preventDefault(); // prevent submit

        const editedPay = {
            id: editPayId, //initial value null
            job_number: editFormData.job_number,
            LV_name: editFormData.LV_name,
            date_from_charpotro: editFormData.date_from_charpotro,
            MV_name: editFormData.MV_name,
            commodity: editFormData.commodity,
            chq_no: editFormData.chq_no,
            chq_issue_date: editFormData.chq_issue_date,
            amount: editFormData.amount,
            part_pay: editFormData.part_pay,
            payment_approved: editFormData.payment_approved,
            balance: editFormData.balance,
            payment_chq_no: editFormData.payment_chq_no,
            payment_chq_amount: editFormData.payment_chq_amount,
            payment_chq_date: editFormData.payment_chq_date,
            added_date: editFormData.added_date,
        };

        Axios.post("http://localhost:3001/management/updatepayment", {
            id: editedPay.id,
            new_job_number: editedPay.job_number,
            new_LV_name: editedPay.LV_name,
            new_date_from_charpotro: editedPay.date_from_charpotro,
            new_MV_name: editedPay.MV_name,
            new_commodity: editedPay.commodity,
            new_chq_no: editedPay.chq_no,
            new_chq_issue_date: editedPay.chq_issue_date,
            new_amount: editedPay.amount,
            new_part_pay: editedPay.part_pay,
            new_payment_approved: editedPay.payment_approved,
            new_balance: editedPay.balance,
            new_payment_chq_no: editedPay.payment_chq_no,
            new_payment_chq_amount: editedPay.payment_chq_amount,
            new_payment_chq_date: editedPay.payment_chq_date,
            new_added_date: editedPay.added_date,
        });

        const newPayList = [...PayList]; //json.data + data added with setPayList above by receiving new input
        const index = PayList.findIndex((Pay) => Pay.id === editPayId);
        newPayList[index] = editedPay; // Assign the modified data object to the object of the index row of the PayList array, which is the entire data

        setPayList(newPayList);
        setEditPayId(null);
        success("Pay updated successfully");
    };

    //Read-only data If you click the edit button, the existing data is displayed
    const handleEditClick = (event, Pay) => {
        event.preventDefault(); // ???

        setEditPayId(Pay.id);
        const formValues = {
            job_number: Pay.job_number,
            LV_name: Pay.LV_name,
            date_from_charpotro: Pay.date_from_charpotro,
            MV_name: Pay.MV_name,
            commodity: Pay.commodity,
            chq_no: Pay.chq_no,
            chq_issue_date: Pay.chq_issue_date,
            amount: Pay.amount,
            part_pay: Pay.part_pay,
            payment_approved: Pay.payment_approved,
            balance: Pay.balance,
            payment_chq_no: Pay.payment_chq_no,
            payment_chq_amount: Pay.payment_chq_amount,
            payment_chq_date: Pay.payment_chq_date,
            added_date: Pay.added_date,
        };
        setEditFormData(formValues);
    };

    //Cancel button when clicked on edit
    const handleCancelClick = () => {
        setEditPayId(null);
    };

    // delete
    const handleDeleteClick = (PayId) => {
        const newPayList = [...PayList];
        const index = PayList.findIndex((Pay) => Pay.id === PayId);
        //console.log("Deleting Pay with id: " + PayId);
        Axios.post("http://localhost:3001/management/deletepayment", {
            Pay_id: PayId,
        }).then((response) => {
            if (response.data == "success") {
                success("Pay deleted successfully");
            }
        });

        newPayList.splice(index, 1);
        setPayList(newPayList);
    };

    // search filter
    const [query, setQuery] = useState("");

    const filteredPay =
        query === ""
            ? PayList
            : PayList.filter((Pay) =>
                  Pay.order_number
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    // modal for add Pay
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
                    Add Pay Approval <IoMdPersonAdd className="ml-2 inline h-5 w-5" />
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
                        {filteredPay.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredPay.map((Pay, idx) => (
                                <tr
                                    key={Pay.id}
                                    className={`bg-white ${
                                        idx % 2 === 1 ? "bg-gray-200" : ""
                                    }`}
                                >
                                    {editPayId === Pay.id ? (
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
                                            Pay={Pay}
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
                                            Add Pay
                                        </Dialog.Title>
                                        <form
                                            onSubmit={handleAddFormSubmit}
                                            className="flex flex-col gap-4"
                                        >
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
                                                    Chq No
                                                </label>
                                                <input
                                                    type="number"
                                                    name="chq_no"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Chq Issue Date
                                                </label>
                                                <input
                                                    type="date"
                                                    name="chq_issue_date"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Amount
                                                </label>
                                                <input
                                                    type="number"
                                                    name="amount"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Part Pay
                                                </label>
                                                <input
                                                    type="number"
                                                    name="part_pay"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Payment Approved
                                                </label>
                                                <input
                                                    type="number"
                                                    name="payment_approved"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Balance
                                                </label>
                                                <input
                                                    type="number"
                                                    name="balance"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Payment Chq No
                                                </label>
                                                <input
                                                    type="number"
                                                    name="payment_chq_no"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Payment Chq Amount
                                                </label>
                                                <input
                                                    type="number"
                                                    name="payment_chq_amount"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Payment Chq Date
                                                </label>
                                                <input
                                                    type="date"
                                                    name="payment_chq_date"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Added Date
                                                </label>
                                                <input
                                                    type="date"
                                                    name="added_date"
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
