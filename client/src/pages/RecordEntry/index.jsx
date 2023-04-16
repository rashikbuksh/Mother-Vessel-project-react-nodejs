import { useState, useEffect, Suspense, lazy } from "react";
import Axios from "axios";
import ReadOnlyRow from "./Table/ReadOnlyRow";
import EditableRow from "./Table/EditTableRow";
import TableHead from "../../components/Table/TableHead";

import { useSortableTable } from "../../components/Table/useSortableTable";

import { errorData, errorCheck } from "./Error";
import { generatedToast, Toast } from "../../components/Toast";
import { fetchData } from "../../hooks/fetchData";

import NoDataFound from "../../utils/NoDataFound";
import LoadMore from "../../utils/LoadMore";
import PingLoader from "../../utils/PingLoader";

import { IoMdPersonAdd } from "react-icons/io";

const TableHeader = [
    {
        id: 2,
        name: "Order Number",
        accessor: "order_number",
        sortable: true,
    },
    {
        id: 3,
        name: "Job Number",
        accessor: "job_number",
        sortable: true,
    },
    { id: 10, name: "Commodity", accessor: "commodity" },
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
    { id: 7, name: "LV Name", accessor: "LV_name", sortable: true },
    { id: 8, name: "Destination From", accessor: "dest_from" },
    { id: 9, name: "Destination To", accessor: "dest_to" },
    { id: 11, name: "Capacity", accessor: "capacity" },
    { id: 12, name: "Rate", accessor: "rate" },
    { id: 13, name: "LV Master Name", accessor: "LV_master_name" },
    {
        id: 14,
        name: "LV Master Contact Number",
        accessor: "LV_master_contact_number",
    },
    { id: 15, name: "Created Date", accessor: "created_date" },
    { id: 16, name: "Actions" },
];

const AddRecord = lazy(() => import("./AddRecord"));

const App = () => {
    const [RecordList, setRecordList] = useState([]);
    const [OrderNumber, setOrderNumber] = useState([]);
    const [JobNumberMax, setJobNumberMax] = useState([]);
    const [maxCapacity, setMaxCapacity] = useState(0);
    const [tableData, handleSorting] = useSortableTable(
        RecordList,
        TableHeader
    );
    const [cursorPos, setCursorPos] = useState(1);
    const [pageSize, setPageSize] = useState(4);

    const [enabled, setEnabled] = useState(false);

    // fetch data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData(
            `${process.env.REACT_APP_API_URL}/management/getrecordentry`,
            setRecordList,
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
    const [addFormData, setAddFormData] = useState({
        order_number: "",
        job_number: "",
        date_from_charpotro: "",
        cp_number_from_charpotro: "",
        LA_name: "",
        LV_name: "",
        dest_from: "",
        dest_to: "",
        capacity: "",
        rate: "",
        LV_master_name: "",
        LV_master_contact_number: "",
    });

    //edit status
    const [editFormData, setEditFormData] = useState({
        order_number: "",
        job_number: "",
        date_from_charpotro: "",
        cp_number_from_charpotro: "",
        LA_name: "",
        LV_name: "",
        dest_from: "",
        dest_to: "",
        commodity: "",
        capacity: "",
        rate: "",
        LV_master_name: "",
        LV_master_contact_number: "",
    });

    //modified id status
    const [editRecordId, setEditRecordId] = useState(null);

    //changeHandler
    //Update state with input data
    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        errorCheck(fieldValue, fieldName);

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

        const newRecord = {
            order_number: addFormData.order_number, //handleAddFormChange로 받은 새 데이터
            job_number: addFormData.job_number,
            date_from_charpotro: addFormData.date_from_charpotro,
            cp_number_from_charpotro: addFormData.cp_number_from_charpotro,
            LA_name: addFormData.LA_name,
            LV_name: addFormData.LV_name,
            dest_from: addFormData.dest_from,
            dest_to: addFormData.dest_to,
            capacity: addFormData.capacity,
            rate: addFormData.rate,
            LV_master_name: addFormData.LV_master_name,
            LV_master_contact_number: addFormData.LV_master_contact_number,
        };

        newRecord.job_number = JobNumberMax[0]?.max_job_number + 1;
        newRecord.LA_name = enabled ? "KEL-BD" : newRecord.LA_name;

        // api call
        Axios.post(
            `${process.env.REACT_APP_API_URL}/management/recordentry`,
            newRecord
        )
            .then((response) => {
                generatedToast(response);
            })
            .then(() => {
                closeModal();
            });

        const newTableData = [...tableData, newRecord];
        setRecordList(newTableData);
    };

    //save modified data (App component)
    const handleEditFormSubmit = (event) => {
        event.preventDefault(); // prevent submit

        const editedRecord = {
            id: editRecordId, //initial value null
            order_number: editFormData.order_number, //handleAddFormChange로 받은 새 데이터
            job_number: editFormData.job_number,
            date_from_charpotro: editFormData.date_from_charpotro,
            cp_number_from_charpotro: editFormData.cp_number_from_charpotro,
            LA_name: editFormData.LA_name,
            LV_name: editFormData.LV_name,
            dest_from: editFormData.dest_from,
            dest_to: editFormData.dest_to,
            commodity: editFormData.commodity,
            capacity: editFormData.capacity,
            rate: editFormData.rate,
            LV_master_name: editFormData.LV_master_name,
            LV_master_contact_number: editFormData.LV_master_contact_number,
        };

        Axios.post(
            `${process.env.REACT_APP_API_URL}/management/updaterecordentry`,
            editedRecord
        ).then((response) => {
            generatedToast(response);
        });

        const index = tableData.findIndex((td) => td.id === editRecordId);
        tableData[index] = editedRecord;
        setRecordList(tableData);

        setEditRecordId(null);
    };

    //Read-only data If you click the edit button, the existing data is displayed
    const handleEditClick = (event, Record) => {
        event.preventDefault(); // ???

        setEditRecordId(Record.id);
        const formValues = {
            order_number: Record.order_number,
            job_number: Record.job_number,
            date_from_charpotro: Record.date_from_charpotro,
            cp_number_from_charpotro: Record.cp_number_from_charpotro,
            LA_name: Record.LA_name,
            LV_name: Record.LV_name,
            dest_from: Record.dest_from,
            dest_to: Record.dest_to,
            commodity: Record.commodity,
            capacity: Record.capacity,
            rate: Record.rate,
            LV_master_name: Record.LV_master_name,
            LV_master_contact_number: Record.LV_master_contact_number,
        };
        setEditFormData(formValues);
    };

    //Cancel button when clicked on edit
    const handleCancelClick = () => {
        setEditRecordId(null);
    };

    // delete
    const handleDeleteClick = (RecordId) => {
        const newRecordList = [...RecordList];
        const index = RecordList.findIndex((Record) => Record.id === RecordId);

        Axios.post(`${process.env.REACT_APP_API_URL}/management/deleterecord`, {
            record_id: RecordId,
        });
        Axios.post(
            `${process.env.REACT_APP_API_URL}/management/deleteorderjob`,
            {
                order_number: RecordList[index].order_number,
                job_number: RecordList[index].job_number,
            }
        ).then((response) => {
            generatedToast(response);
        });

        newRecordList.splice(index, 1);
        setRecordList(newRecordList);
    };

    // modal for add Record
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        fetchData(
            `${process.env.REACT_APP_API_URL}/management/fetch_order_number`,
            setOrderNumber,
            setLoading,
            setError
        );
        setIsOpen(true);
    }
    useEffect(() => {
        fetchData(
            `${process.env.REACT_APP_API_URL}/management/getmaxjobnumber?order_number=${addFormData.order_number}`,
            setJobNumberMax,
            setLoading,
            setError
        );

        fetch(
            `${process.env.REACT_APP_API_URL}/management/getcapacitymax?order_number=${addFormData.order_number}`
        )
            .then((res) => res.json())
            .then((data) => {
                setMaxCapacity(
                    data[0]?.max_capacity
                        ? data[0]?.max_capacity < 0 ||
                          data[0]?.max_capacity == null
                            ? 0
                            : data[0]?.max_capacity
                        : 0
                );
            });
    }, [addFormData.order_number]);

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
                <button
                    className="flex flex-row items-center justify-center rounded-md bg-green-600 px-3 py-0 text-sm font-semibold text-white transition duration-500 ease-in-out hover:bg-green-400"
                    onClick={openModal}
                >
                    Add Record <IoMdPersonAdd className="ml-2 inline h-5 w-5" />
                </button>
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
                                    {editRecordId ===
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
                                            record={search(tableData)[index]}
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

            <Suspense fallback={<PingLoader />}>
                <AddRecord
                    {...{
                        isOpen,
                        closeModal,
                        handleAddFormSubmit,
                        handleAddFormChange,
                        addFormData,
                        setAddFormData,
                        errorData,
                        OrderNumber,
                        maxCapacity,
                        enabled,
                        setEnabled,
                    }}
                />
            </Suspense>

            <Toast />
        </div>
    );
};

export default App;
