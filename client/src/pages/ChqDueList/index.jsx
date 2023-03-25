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
        name: "LA", 
        accessor: "la", 
        sortable: true, 
    },
    { id: 4, name: "LV Name", accessor: "LV_name", sortable: true },
    { id: 5, name: "Commodity", accessor: "commodity", sortable: true },
    { id: 6, name: "Mode", accessor: "mode", sortable: true },
    { id: 7, name: "Chq Amount", accessor: "chq_amount" },
    { id: 8, name: "Part Pay", accessor: "part_pay" },
    { id: 9, name: "Balance", accessor: "balance", sortable: true },
    { id: 10, name: "Chq Issue Date", accessor: "chq_issue_date", sortable: true },
    { id: 11, name: "Initial amount", accessor: "init_amount" },
    { id: 12, name: "Payment", accessor: "payment" },
    { id: 13, name: "Final Amount", accessor: "final_amount" },
    { id: 14, name: "Actions" },
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
        fetch("http://localhost:3001/management/getchqlist")
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
        LA: "",
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
        order_number: "",
        LA: "",
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
            LA: addFormData.LA,
            LV_name: addFormData.LV_name,
            commodity: addFormData.commodity,
            mode: addFormData.mode,
            chq_amount: addFormData.chq_amount,
            part_pay: addFormData.part_pay,
            balance: addFormData.balance,
            chq_issue_date: addFormData.chq_issue_date,
            init_amount: addFormData.init_amount,
            payment: addFormData.payment,
            final_amount: addFormData.final_amount,
        };

        //const current = new Date();
        //const order_number_auto = newChq.importer_name+'-'+current.getDate().toLocaleString()+'-'+newChq.mother_vessel_name+'-'+newChq.mv_location
        //console.log(order_number_auto)

        // api call
        Axios.post("http://localhost:3001/management/insertchq", {
            order_number: newChq.order_number, //handleAddFormChange로 받은 새 데이터
            LA: newChq.LA,
            LV_name: newChq.LV_name,
            commodity: newChq.commodity,
            mode: newChq.mode,
            chq_amount: newChq.chq_amount,
            part_pay: newChq.part_pay,
            balance: newChq.balance,
            chq_issue_date: newChq.chq_issue_date,
            init_amount: newChq.init_amount,
            payment: newChq.payment,
            final_amount: newChq.final_amount,
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
            LA: editFormData.LA,
            LV_name: editFormData.LV_name,
            commodity: editFormData.commodity,
            mode: editFormData.mode,
            chq_amount: editFormData.chq_amount,
            part_pay: editFormData.part_pay,
            balance: editFormData.balance,
            chq_issue_date: editFormData.chq_issue_date,
            init_amount: editFormData.init_amount,
            payment: editFormData.payment,
            final_amount: editFormData.final_amount,
        };

        Axios.post("http://localhost:3001/management/updatechq", {
            id: editedChq.id,
            new_order_number: editedChq.order_number,
            new_LA: editedChq.LA,
            new_LV_name: editedChq.LV_name,
            new_commodity: editedChq.commodity,
            new_mode: editedChq.mode,
            new_chq_amount: editedChq.chq_amount,
            new_part_pay: editedChq.part_pay,
            new_balance: editedChq.balance,
            new_chq_issue_date: editedChq.chq_issue_date,
            new_init_amount: editedChq.init_amount,
            new_payment: editedChq.payment,
            new_final_amount: editedChq.final_amount,
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
            LA: Chq.LA,
            LV_name: Chq.LV_name,
            commodity: Chq.commodity,
            mode: Chq.mode,
            chq_amount: Chq.chq_amount,
            part_pay: Chq.part_pay,
            balance: Chq.balance,
            chq_issue_date: Chq.chq_issue_date,
            init_amount: Chq.init_amount,
            payment: Chq.payment,
            final_amount: Chq.final_amount,
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
        Axios.post("http://localhost:3001/management/deletechq", {
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
                                                    placeholder="Will be Auto Generated"
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
                                                    Mode
                                                </label>
                                                <input
                                                    type="text"
                                                    name="mode"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Chq Amount
                                                </label>
                                                <input
                                                    type="text"
                                                    name="chq_amount"
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
                                                    type="text"
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
                                                    Balance
                                                </label>
                                                <input
                                                    type="number"
                                                    name="balance"
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
                                                    Iniial Amount
                                                </label>
                                                <input
                                                    type="number"
                                                    name="init_amount"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Payment
                                                </label>
                                                <input
                                                    type="text"
                                                    name="payment"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Final Amount
                                                </label>
                                                <input
                                                    type="number"
                                                    name="final_amount"
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
