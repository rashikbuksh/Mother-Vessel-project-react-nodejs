import { useState, useEffect, Suspense, lazy, Fragment } from "react";
import Axios from "axios";
import ReadOnlyRow from "./Table/ReadOnlyRow";
import EditableRow from "./Table/EditTableRow";
import TableHead from "../../components/Table/TableHead";

import { useSortableTable } from "../../components/Table/useSortableTable";
import { Dialog, Transition } from "@headlessui/react";

import { errorData, errorCheck } from "./Error";
import { generatedToast, Toast } from "../../components/Toast";
import { fetchData } from "../../hooks/fetchData";
import Select from "../../components/Select";

import NoDataFound from "../../utils/NoDataFound";
import LoadMore from "../../utils/LoadMore";
import PingLoader from "../../utils/PingLoader";

import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

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

const opt = [{ value: "All" }, { value: "Own" }, { value: "Other" }];

const AddPaymentInformation = lazy(() => import("./AddPaymentInformation"));

const App = () => {
    // new start
    const [ChqList, setChqList] = useState([]);
    const [laNames, setLaNames] = useState([]);
    const [filterByLA, setFilterByLA] = useState("");
    const [btnPayClicked, setBtnPayClicked] = useState(false);
    const [tableData, handleSorting] = useSortableTable(ChqList, TableHeader);
    const [cursorPos, setCursorPos] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [orderJobList, setOrderJobList] = useState([]);

    // fetch data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData(
            `${process.env.REACT_APP_API_URL}/management/getchqlist?filterByLA=${filterByLA}`,
            setChqList,
            setLoading,
            setError
        );
        fetch(`${process.env.REACT_APP_API_URL}/management/getLANames`)
            .then((res) => res.json())
            .then((data) => {
                setLaNames(data);
            });
    }, []);

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
                    item[parameter]
                        ?.toString()
                        .toLowerCase()
                        .includes(query.toLowerCase())
                )
        );
        return res.slice(
            (cursorPos - 1) * pageSize,
            (cursorPos - 1) * pageSize + pageSize
        );
    }

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
            chq_amount: Number(editFormData.part_pay),
            chq_issue_date: editFormData.chq_issue_date,
            part_pay: Number(editFormData.part_pay),
            balance:
                Number(editFormData.chq_amount) - Number(editFormData.part_pay),
            payment: editFormData.payment,
            amount: Number(editFormData.amount),
        };
        editedChq.payment =
            editedChq.payment == null ? "Part" : editedChq.payment;

        Axios.post(`${process.env.REACT_APP_API_URL}/management/updatechq`, {
            new_order_job_number: editedChq.order_job_number,
            new_mode: editedChq.mode,
            new_payment: editedChq.payment,
            new_amount: editedChq.amount,
        }).then((response) => {
            generatedToast(response);
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
        // success("Chq updated successfully");
    };

    //Read-only data If you click the edit button, the existing data is displayed
    const handleEditClick = (event, Chq) => {
        setBtnPayClicked(false);
        event.preventDefault(); // ???

        setEditChqOrderJobNumber(Chq.order_job_number);
        setEditChqMode(Chq.mode);

        const formValues = {
            order_job_number: Chq.order_job_number,
            LA_name: Chq.LA_name,
            LV_name: Chq.LV_name,
            commodity: Chq.commodity,
            mode: Chq.mode,
            chq_amount: Number(Chq.chq_amount),
            chq_issue_date: Chq.chq_issue_date,
            part_pay: Number(Chq.part_pay),
            balance: Number(Chq.balance),
            payment: Chq.payment,
            amount: Number(Chq.amount),
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
            generatedToast(response);
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
            chq_amount: Number(Chq.chq_amount),
            chq_issue_date: Chq.chq_issue_date,
            part_pay: Number(Chq.part_pay),
            balance: Number(Chq.chq_amount) - Number(Chq.part_pay),
            payment: Chq.payment,
            amount: Number(Chq.amount),
            payment_chq_no: "",
            payment_chq_amount: Chq.amount,
            payment_chq_date: "",
        };
        formValues.part_pay =
            formValues.part_pay == null ? "Part" : formValues.part_pay;
        setPaymentModalData(formValues);
        openModal();
    };

    const handlePaymentModalFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");

        const fieldValue = event.target.value;

        errorCheck(fieldValue, fieldName);

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
            part_pay: Number(newPay.part_pay) + Number(newPay.amount),
            balance:
                Number(newPay.chq_amount) -
                (Number(newPay.part_pay) + Number(newPay.amount)),
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
        ).then((response) => {
            generatedToast(response);
        });

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
        // success("Pay added successfully");
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

    // loading and error
    if (loading) {
        return <PingLoader />;
    }
    if (error) {
        return <div>{error}</div>;
    }

    //If save(submit) is pressed after editing is completed, submit > handleEditFormSubmit action
    return (
        <div className="m-2 mt-2">
            {/* {laNames && <Tabs tabHeaders={laNames} />} */}
            <div className="my-2 mx-auto flex justify-between">
                <input
                    className="mx-auto block w-1/2 rounded-md border-2 border-slate-300 bg-white py-2 shadow-lg placeholder:italic placeholder:text-slate-500 focus:border-green-500 focus:ring-0 sm:text-sm"
                    placeholder="Search for anything..."
                    type="search"
                    name="search"
                    onChange={(event) => setQuery(event.target.value)}
                />
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
                    {search(tableData).length > 0 && (
                        <tbody className="divide-y divide-gray-100 rounded-md">
                            {search(tableData).map((_, index) => (
                                <tr
                                    key={index}
                                    className={`my-auto items-center justify-center ${
                                        index % 2 === 1 ? "bg-gray-200" : ""
                                    }`}
                                >
                                    {editChqOrderJobNumber ===
                                        search(tableData)[index]
                                            ?.order_job_number &&
                                    editChqMode ===
                                        search(tableData)[index]?.mode &&
                                    !btnPayClicked ? (
                                        <EditableRow
                                            {...{
                                                editFormData,
                                                handleEditFormChange,
                                                handleCancelClick,
                                            }}
                                        />
                                    ) : (
                                        <ReadOnlyRow
                                            Chq={search(tableData)[index]}
                                            {...{
                                                handleEditClick,
                                                handlePaymentOpenModal,
                                            }}
                                        />
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
                {search(tableData).length < 1 && <NoDataFound />}
            </form>

            {search(tableData).length < data.length && (
                <LoadMore
                    onClick={() => {
                        setPageSize((prevValue) =>
                            cursorPos + prevValue > data.length
                                ? prevValue
                                : prevValue + 20
                        );
                    }}
                />
            )}

            <Suspense fallback={<PingLoader />}>
                <AddPaymentInformation
                    {...{
                        isOpen,
                        closeModal,
                        handlePaymentModalFormSubmit,
                        handlePaymentModalFormChange,
                        paymentModalData,
                        errorData,
                        paymentModalData,
                    }}
                ></AddPaymentInformation>
            </Suspense>

            <Toast />
        </div>
    );
};

export default App;
