import { useState, useEffect } from "react";
import Axios from "axios";
import ReadOnlyRow from "./Table/ReadOnlyRow";
import EditableRow from "./Table/EditTableRow";
import TableHead from "../../components/Table/TableHead";

import { useSortableTable } from "../../components/Table/useSortableTable";

import { generatedToast } from "../../components/Toast";
import { fetchData } from "../../hooks/fetchData";

import NoDataFound from "../../utils/NoDataFound";
import LoadMore from "../../utils/LoadMore";
import PingLoader from "../../utils/PingLoader";

const TableHeader = [
    {
        id: 2,
        name: "Order Job Number",
        accessor: "order_job_number",
    },
    { id: 3, name: "LA Name", accessor: "LA_name", sortable: true },
    {
        id: 4,
        name: "LV Name",
        accessor: "LV_name",
        sortable: true,
    },
    { id: 5, name: "Commodity", accessor: "commodity", sortable: true },
    { id: 7, name: "Cheque Issue Date", accessor: "chq_issue_date" },
    { id: 9, name: "Part Payment", accessor: "part_pay" },
    { id: 11, name: "Balance", accessor: "balance" },
    { id: 12, name: "Payment", accessor: "payment" },
    { id: 13, name: "Amount", accessor: "amount" },
    { id: 14, name: "Payment Cheque No", accessor: "payment_chq_no" },
    {
        id: 15,
        name: "Payment Cheque Amount",
        accessor: "payment_chq_amount",
        sortable: true,
    },
    {
        id: 16,
        name: "Payment Cheque Date",
        accessor: "payment_chq_date",
        sortable: true,
    },
    { id: 17, name: "Actions" },
];

const App = () => {
    const [PayList, setPayList] = useState([]);
    const [tableData, handleSorting] = useSortableTable(PayList, TableHeader); // data, columns // new
    const [cursorPos, setCursorPos] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    // fetch data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData(
            `${process.env.REACT_APP_API_URL}/management/getpayment`,
            setPayList,
            setLoading,
            setError
        );
    }, []);

    // search filter for all fields
    const [query, setQuery] = useState("");

    const data = Object.values(tableData);
    function search(items) {
        if (query !== "" && cursorPos !== 1) {
            setCursorPos(1);
        }
        const res = items.filter((item) =>
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

    // add state
    //id is randomly generated with nanoid generator
    const [addFormData, setAddFormData] = useState({
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

    //edit status
    const [editFormData, setEditFormData] = useState({
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
    const [editPayId, setEditPayId] = useState(null);

    //changeHandler
    //Update state with input data
    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

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

        const editedPay = {
            order_job_number: addFormData.order_job_number,
            LA_name: addFormData.LA_name,
            LV_name: addFormData.LV_name,
            commodity: addFormData.commodity,
            mode: addFormData.mode,
            chq_issue_date: addFormData.chq_issue_date,
            chq_amount: addFormData.chq_amount,
            part_pay: addFormData.part_pay,
            balance: addFormData.balance,
            payment: addFormData.payment,
            amount: addFormData.amount,
            payment_chq_no: addFormData.payment_chq_no,
            payment_chq_amount: addFormData.payment_chq_amount,
            payment_chq_date: addFormData.payment_chq_date,
        };

        // api call
        Axios.post(
            `${process.env.REACT_APP_API_URL}/management/insertpayment`,
            {
                order_job_number: editedPay.order_job_number,
                LA_name: editedPay.LA_name,
                LV_name: editedPay.LV_name,
                commodity: editedPay.commodity,
                mode: editedPay.mode,
                chq_issue_date: editedPay.chq_issue_date,
                chq_amount: editedPay.chq_amount,
                part_pay: editedPay.part_pay,
                balance: editedPay.balance,
                payment: editedPay.payment,
                amount: editedPay.amount,
                payment_chq_no: editedPay.payment_chq_no,
                payment_chq_amount: editedPay.payment_chq_amount,
                payment_chq_date: editedPay.payment_chq_date,
            }
        ).then((response) => {
            generatedToast(response);
        });

        const newTableData = [...tableData, editedPay];
        setPayList(newTableData);
    };

    //save modified data (App component)
    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedPay = {
            id: editPayId,
            order_job_number: editFormData.order_job_number,
            LA_name: editFormData.LA_name,
            LV_name: editFormData.LV_name,
            commodity: editFormData.commodity,
            mode: editFormData.mode,
            chq_issue_date: editFormData.chq_issue_date,
            chq_amount: editFormData.chq_amount,
            part_pay: editFormData.part_pay,
            balance: editFormData.balance,
            payment: editFormData.payment,
            amount: editFormData.amount,
            payment_chq_no: editFormData.payment_chq_no,
            payment_chq_amount: editFormData.payment_chq_amount,
            payment_chq_date: editFormData.payment_chq_date,
        };

        Axios.post(
            `${process.env.REACT_APP_API_URL}/management/updatepayment`,
            {
                id: editedPay.id,
                order_job_number: editedPay.order_job_number, //handleAddFormChange로 받은 새 데이터
                LA_name: editedPay.LA_name,
                LV_name: editedPay.LV_name,
                commodity: editedPay.commodity,
                mode: editedPay.mode,
                chq_issue_date: editedPay.chq_issue_date,
                chq_amount: editedPay.chq_amount,
                part_pay: editedPay.part_pay,
                balance: editedPay.balance,
                payment: editedPay.payment,
                amount: editedPay.amount,
                payment_chq_no: editedPay.payment_chq_no,
                payment_chq_amount: editedPay.payment_chq_amount,
                payment_chq_date: editedPay.payment_chq_date,
            }
        ).then((response) => {
            generatedToast(response);
        });

        const index = tableData.findIndex((td) => td.id === editPayId);
        tableData[index] = editedPay;
        setPayList(tableData);

        setEditPayId(null);
    };

    //Read-only data If you click the edit button, the existing data is displayed
    const handleEditClick = (event, Pay) => {
        event.preventDefault(); // ???

        setEditPayId(Pay.id);
        const formValues = {
            order_job_number: Pay.order_job_number,
            LA_name: Pay.LA_name,
            LV_name: Pay.LV_name,
            commodity: Pay.commodity,
            mode: Pay.mode,
            chq_issue_date: Pay.chq_issue_date,
            chq_amount: Pay.chq_amount,
            part_pay: Pay.part_pay,
            balance: Pay.balance,
            payment: Pay.payment,
            amount: Pay.amount,
            payment_chq_no: Pay.payment_chq_no,
            payment_chq_amount: Pay.payment_chq_amount,
            payment_chq_date: Pay.payment_chq_date,
        };
        setEditFormData(formValues);
    };

    //Cancel button when clicked on edit
    const handleCancelClick = () => {
        setEditPayId(null);
    };

    // delete
    const handleDeleteClick = (PayId) => {
        const editedPayList = [...PayList];
        const index = PayList.findIndex((Pay) => Pay.id === PayId);

        Axios.post(
            `${process.env.REACT_APP_API_URL}/management/deletepayment`,
            {
                Pay_id: PayId,
                order_job_number: PayList[index].order_job_number,
            }
        ).then((response) => {
            generatedToast(response);
        });

        editedPayList.splice(index, 1);
        setPayList(editedPayList);
    };

    // loading and error
    if (loading) {
        return <PingLoader />;
    }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="m-2 mt-4">
            <div className="my-2 mx-auto flex justify-center">
                <input
                    className="mx-auto block w-1/2 rounded-md border-2 border-slate-300 bg-white py-2 shadow-lg placeholder:italic placeholder:text-slate-500 focus:border-green-500 focus:ring-0 sm:text-sm"
                    placeholder="Search for anything..."
                    type="search"
                    name="search"
                    onChange={(event) => setQuery(event.target.value)}
                />
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
                                    {editPayId ===
                                    search(tableData)[index]?.id ? (
                                        <EditableRow
                                            {...{
                                                editFormData,
                                                handleEditFormChange,
                                                handleCancelClick,
                                            }}
                                        />
                                    ) : (
                                        <ReadOnlyRow
                                            Pay={search(tableData)[index]}
                                            {...{
                                                handleEditClick,
                                                handleDeleteClick,
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
        </div>
    );
};

export default App;
