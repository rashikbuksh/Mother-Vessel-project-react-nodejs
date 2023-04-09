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

import Tabs from "./Tabs";

//toast
import { success, warning } from "../../components/Toast";
import { ToastContainer } from "react-toastify";

const TableHeader = [
    {
        id: 2,
        name: "Order Job Number",
        accessor: "order_job_number",
    },
    {
        id: 3,
        name: "LA name",
        accessor: "LA_name",
        sortable: true,
    },
    { id: 4, name: "LV Name", accessor: "LV_name", sortable: true },
    { id: 5, name: "Commodity", accessor: "commodity", sortable: true },
    { id: 6, name: "Mode", accessor: "mode", sortable: true },
    {
        id: 10,
        name: "Chq Issue Date",
        accessor: "chq_issue_date",
        sortable: true,
    },
    { id: 7, name: "Chq Amount", accessor: "chq_amount" },
    { id: 8, name: "Part Pay", accessor: "part_pay" },
    { id: 9, name: "Balance", accessor: "balance", sortable: true },
    // { id: 11, name: "Amount", accessor: "init_amount" },
    { id: 12, name: "Payment", accessor: "payment" },
    { id: 13, name: "Amount", accessor: "final_amount" },
    { id: 14, name: "Actions" },
];

const App = () => {
    // new start
    const [ChqList, setChqList] = useState([]);
    const [laNames, setLaNames] = useState([]);
    const [filterByLA, setFilterByLA] = useState("");
    const [btnPayClicked, setBtnPayClicked] = useState(false);
    const [tableData, handleSorting] = useSortableTable(ChqList, TableHeader); // data, columns // new
    const [cursorPos, setCursorPos] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [orderJobList, setOrderJobList] = useState([]);

    // search filter for all fields
    const [query, setQuery] = useState("");

    const data = Object.values(tableData);
    function search(items) {
        if (query !== "" && cursorPos !== 1) {
            setCursorPos(1);
        }
        const res = items.filter(
            (item) =>
                item.LA_name.includes(filterByLA) &&
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
        fetch(`${process.env.REACT_APP_API_URL}/management/getchqlist`)
            .then((res) => res.json())
            .then((data) => {
                setChqList(data);
            });
        fetch(`${process.env.REACT_APP_API_URL}/management/getLANames`)
            .then((res) => res.json())
            .then((data) => {
                setLaNames(data);
            });
    }, []);

    // new end

    // add state
    //id is randomly generated with nanoid generator
    const [addFormData, setAddFormData] = useState({
        order_number: "",
        LA_name: "",
        LV_name: "",
        commodity: "",
        mode: "",
        chq_amount: "",
        part_pay: "",
        balance: "",
        chq_issue_date: "",
        init_amount: "",
        payment: "",
        final_amount: "",
    });

    //edit status
    const [editFormData, setEditFormData] = useState({
        order_job_number: "",
        LA_name: "",
        LV_name: "",
        commodity: "",
        mode: "",
        chq_amount: "",
        chq_issue_date: "",
        part_pay: "",
        payment: "Part",
        amount: "",
    });

    const [paymentModalData, setPaymentModalData] = useState({
        order_job_number: "",
        LA_name: "",
        LV_name: "",
        commodity: "",
        mode: "",
        chq_issue_date: "",
        chq_amount: "",
        part_pay: "",
        balance: "",
        payment: "",
        amount: "",
        payment_chq_no: "",
        payment_chq_amount: "",
        payment_chq_date: "",
    });

    //modified id status
    const [editChqOrderJobNumber, setEditChqOrderJobNumber] = useState(null);
    const [editChqMode, setEditChqMode] = useState(null);

    //changeHandler
    //Update state with input data

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

    //save modified data (App component)
    const handleEditFormSubmit = (event) => {
        event.preventDefault(); // prevent submit

        const editedChq = {
            order_job_number: editFormData.order_job_number,
            LA_name: editFormData.LA_name,
            LV_name: editFormData.LV_name,
            commodity: editFormData.commodity,
            mode: editFormData.mode,
            chq_amount: editFormData.chq_amount,
            chq_issue_date: editFormData.chq_issue_date,
            part_pay: editFormData.part_pay,
            balance: editFormData.chq_amount - editFormData.part_pay,
            payment: editFormData.payment,
            amount: editFormData.amount,
        };
        editedChq.payment =
            editedChq.payment == null ? "Part" : editedChq.payment;

        Axios.post(`${process.env.REACT_APP_API_URL}/management/updatechq`, {
            new_order_job_number: editedChq.order_job_number,
            new_mode: editedChq.mode,
            new_payment: editedChq.payment,
            new_amount: editedChq.amount,
        });

        // these 3 lines will be replaced // new start
        const index = tableData.findIndex(
            (td) =>
                td.order_job_number === editChqOrderJobNumber &&
                td.mode === editChqMode
        );
        tableData[index] = editedChq;
        setChqList(tableData);
        // new end

        setEditChqOrderJobNumber(null);
        setEditChqMode(null);
        success("Chq updated successfully");
    };

    //Read-only data If you click the edit button, the existing data is displayed
    const handleEditClick = (event, Chq) => {
        event.preventDefault(); // ???

        setEditChqOrderJobNumber(Chq.order_job_number);
        setEditChqMode(Chq.mode);

        const formValues = {
            order_job_number: Chq.order_job_number,
            LA_name: Chq.LA_name,
            LV_name: Chq.LV_name,
            commodity: Chq.commodity,
            mode: Chq.mode,
            chq_amount: Chq.chq_amount,
            chq_issue_date: Chq.chq_issue_date,
            part_pay: Chq.part_pay,
            balance: Chq.balance,
            payment: Chq.payment,
            amount: Chq.amount,
        };
        setEditFormData(formValues);
    };

    //Cancel button when clicked on edit
    const handleCancelClick = () => {
        setEditChqOrderJobNumber(null);
        setEditChqMode(null);
    };

    // delete
    const handleDeleteClick = (ChqId) => {
        const newChqList = [...ChqList];
        const index = ChqList.findIndex((Chq) => Chq.id === ChqId);
        //console.log("Deleting Chq with id: " + ChqId);
        Axios.post(`${process.env.REACT_APP_API_URL}/management/deletechq`, {
            Chq_id: ChqId,
        }).then((response) => {
            if (response.data == "success") {
                success("Chq deleted successfully");
            }
        });

        newChqList.splice(index, 1);
        setChqList(newChqList);
    };

    const handlePaymentOpenModal = (event, Chq) => {
        event.preventDefault(); // ???

        setEditChqOrderJobNumber(Chq.order_job_number);
        setEditChqMode(Chq.mode);

        const formValues = {
            order_job_number: Chq.order_job_number,
            LA_name: Chq.LA_name,
            LV_name: Chq.LV_name,
            commodity: Chq.commodity,
            mode: Chq.mode,
            chq_issue_date: Chq.chq_issue_date,
            chq_amount: Chq.chq_amount,
            part_pay: Chq.part_pay,
            balance: Chq.chq_amount - Chq.part_pay,
            payment: Chq.payment,
            amount: Chq.amount,
            payment_chq_no: "",
            payment_chq_amount: Chq.amount,
            payment_chq_date: "",
        };
        setPaymentModalData(formValues);
        openModal();
    };

    const handlePaymentModalFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");

        const fieldValue = event.target.value;

        const newFormData = { ...paymentModalData };
        newFormData[fieldName] = fieldValue;

        setPaymentModalData(newFormData);
    };

    const handlePaymentModalFormSubmit = (event) => {
        event.preventDefault(); // ???

        //data.json으로 이루어진 기존 행에 새로 입력받은 데이터 행 덧붙이기
        const newPay = {
            order_job_number: paymentModalData.order_job_number, //handleAddFormChange로 받은 새 데이터
            LA_name: paymentModalData.LA_name,
            LV_name: paymentModalData.LV_name,
            commodity: paymentModalData.commodity,
            mode: paymentModalData.mode,
            chq_issue_date: paymentModalData.chq_issue_date,
            chq_amount: paymentModalData.chq_amount,
            part_pay: paymentModalData.part_pay,
            balance: paymentModalData.balance,
            payment: paymentModalData.payment,
            amount: paymentModalData.amount,
            payment_chq_no: paymentModalData.payment_chq_no,
            payment_chq_amount: paymentModalData.payment_chq_amount,
            payment_chq_date: paymentModalData.payment_chq_date,
        };

        // api call
        Axios.post(
            `${process.env.REACT_APP_API_URL}/management/insertpayment`,
            {
                order_job_number: newPay.order_job_number, //handleAddFormChange로 받은 새 데이터
                LA_name: newPay.LA_name,
                LV_name: newPay.LV_name,
                commodity: newPay.commodity,
                mode: newPay.mode,
                chq_issue_date: newPay.chq_issue_date,
                chq_amount: newPay.chq_amount,
                part_pay: newPay.part_pay,
                balance: newPay.balance,
                payment: newPay.payment,
                amount: newPay.amount,
                payment_chq_no: newPay.payment_chq_no,
                payment_chq_amount: newPay.payment_chq_amount,
                payment_chq_date: newPay.payment_chq_date,
            }
        );

        const editedChq = {
            order_job_number: newPay.order_job_number,
            LA_name: newPay.LA_name,
            LV_name: newPay.LV_name,
            commodity: newPay.commodity,
            mode: newPay.mode,
            chq_amount: newPay.chq_amount,
            chq_issue_date: newPay.chq_issue_date,
            part_pay: newPay.part_pay + +newPay.amount,
            balance: newPay.chq_amount - (newPay.part_pay + newPay.amount),
            payment: null,
            amount: null,
        };
        console.log("editedChq Part Pay: ", editedChq.part_pay);

        Axios.post(
            `${process.env.REACT_APP_API_URL}/management/updatechqPartPay`,
            {
                new_order_job_number: editedChq.order_job_number,
                new_mode: editedChq.mode,
                new_part_pay: editedChq.part_pay,
                new_payment: editedChq.payment,
                new_amount: editedChq.amount,
            }
        );

        // these 3 lines will be replaced // new start
        const index = tableData.findIndex(
            (td) =>
                td.order_job_number === editChqOrderJobNumber &&
                td.mode === editChqMode
        );
        tableData[index] = editedChq;
        setChqList(tableData);

        setBtnPayClicked(false);
        setEditChqOrderJobNumber(null);
        setEditChqMode(null);

        // close modal
        closeModal();

        // toast
        success("Pay added successfully");
    };

    // modal for add Chq
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
        setBtnPayClicked(true);
    }

    //If save(submit) is pressed after editing is completed, submit > handleEditFormSubmit action
    return (
        <div className="m-2 mt-2">
            {/* {laNames && <Tabs tabHeaders={laNames} />} */}
            <div className="my-2 mx-auto flex justify-between">
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
                    // new start // Chq change copy paste the className
                    className="flex flex-row items-center justify-center rounded-md bg-green-600 px-3 py-0 text-sm font-semibold text-white transition duration-500 ease-in-out hover:bg-green-400"
                    onClick={openModal}
                >
                    Add Chq <IoMdPersonAdd className="ml-2 inline h-5 w-5" />
                </button> */}
                {laNames && (
                    <Select
                        options={laNames}
                        isSetItems={true}
                        setItems={setFilterByLA}
                    />
                )}
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
                                    key={idx}
                                    className={`my-auto items-center justify-center ${
                                        idx % 2 === 1 ? "bg-gray-200" : ""
                                    }`}
                                >
                                    {editChqOrderJobNumber ===
                                        Chq.order_job_number &&
                                    editChqMode === Chq.mode &&
                                    !btnPayClicked ? (
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
                                            handlePaymentOpenModal={
                                                handlePaymentOpenModal
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
                                            Add Payment
                                            <button
                                                className="float-right"
                                                onClick={closeModal}
                                            >
                                                <MdClose className="inline text-red-600" />
                                            </button>
                                        </Dialog.Title>
                                        {/* // new end */}

                                        <form
                                            onSubmit={
                                                handlePaymentModalFormSubmit
                                            }
                                            className="flex flex-col gap-4"
                                        >
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Order Job Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="order_job_number"
                                                    onChange={
                                                        handlePaymentModalFormChange
                                                    }
                                                    disabled
                                                    value={
                                                        paymentModalData.order_job_number
                                                    }
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
                                                        handlePaymentModalFormChange
                                                    }
                                                    disabled
                                                    value={
                                                        paymentModalData.LV_name
                                                    }
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
                                                        handlePaymentModalFormChange
                                                    }
                                                    disabled
                                                    value={
                                                        paymentModalData.LA_name
                                                    }
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
                                                        handlePaymentModalFormChange
                                                    }
                                                    disabled
                                                    value={
                                                        paymentModalData.commodity
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    chq_issue_date
                                                </label>
                                                <input
                                                    type="text"
                                                    name="chq_issue_date"
                                                    onChange={
                                                        handlePaymentModalFormChange
                                                    }
                                                    disabled
                                                    value={paymentModalData.chq_issue_date.slice(
                                                        0,
                                                        10
                                                    )}
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Mode
                                                </label>
                                                <input
                                                    type="text"
                                                    name="mode"
                                                    onChange={
                                                        handlePaymentModalFormChange
                                                    }
                                                    disabled
                                                    value={
                                                        paymentModalData.mode
                                                    }
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
                                                        handlePaymentModalFormChange
                                                    }
                                                    disabled
                                                    value={
                                                        paymentModalData.amount
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Part payment
                                                </label>
                                                <input
                                                    type="number"
                                                    name="part_pay"
                                                    onChange={
                                                        handlePaymentModalFormChange
                                                    }
                                                    disabled
                                                    value={
                                                        paymentModalData.part_pay
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    payment
                                                </label>
                                                <input
                                                    type="text"
                                                    name="payment"
                                                    onChange={
                                                        handlePaymentModalFormChange
                                                    }
                                                    disabled
                                                    value={
                                                        paymentModalData.payment
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    balance
                                                </label>
                                                <input
                                                    type="text"
                                                    name="balance"
                                                    onChange={
                                                        handlePaymentModalFormChange
                                                    }
                                                    disabled
                                                    value={
                                                        paymentModalData.balance
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    payment chq no
                                                </label>
                                                <input
                                                    type="text"
                                                    name="payment_chq_no"
                                                    onChange={
                                                        handlePaymentModalFormChange
                                                    }
                                                    required
                                                    value={
                                                        paymentModalData.payment_chq_no
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    payment_chq_amount
                                                </label>
                                                <input
                                                    type="text"
                                                    name="payment_chq_amount"
                                                    onChange={
                                                        handlePaymentModalFormChange
                                                    }
                                                    disabled
                                                    value={
                                                        paymentModalData.payment_chq_amount
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    payment_chq_date
                                                </label>
                                                <input
                                                    type="date"
                                                    name="payment_chq_date"
                                                    onChange={
                                                        handlePaymentModalFormChange
                                                    }
                                                    required
                                                    value={
                                                        paymentModalData.payment_chq_date
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
