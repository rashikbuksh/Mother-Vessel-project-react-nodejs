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

const TableHeader = [
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

const AddDamarage = lazy(() => import("./AddDamarage"));

const App = () => {
    const [DamList, setDamList] = useState([]);
    const [tableData, handleSorting] = useSortableTable(DamList, TableHeader); // data, columns // new
    const [cursorPos, setCursorPos] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    // fetch data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData(
            `${process.env.REACT_APP_API_URL}/management/getdamarage`,
            setDamList,
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

    //Update status with correction data
    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

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

        Axios.post(
            `${process.env.REACT_APP_API_URL}/management/updatedamarage`,
            editedDam
        ).then((response) => {
            generatedToast(response);
        });

        const index = tableData.findIndex((td) => td.id === editDamId);
        tableData[index] = editedDam;
        setDamList(tableData);

        setEditDamId(null);
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

        Axios.post(
            `${process.env.REACT_APP_API_URL}/management/deletedamarage`,
            {
                Dam_id: DamId,
                order_job_number: DamList[index].order_job_number,
            }
        ).then((response) => {
            generatedToast(response);
        });

        newDamList.splice(index, 1);
        setDamList(newDamList);
    };

    // loading and error
    if (loading) {
        return <PingLoader />;
    }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="mt-4">
            <div className="my-2 mx-auto flex justify-center">
                <input
                    className="mx-auto block w-1/2 rounded-md border-2 border-slate-300 bg-white py-2 shadow-lg placeholder:italic placeholder:text-slate-500 focus:border-green-500 focus:ring-0 sm:text-sm"
                    placeholder="Search for anything..."
                    type="search"
                    name="search"
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>
            <br />
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
                                    {editDamId ===
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
                                            Dam={search(tableData)[index]}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={
                                                handleDeleteClick
                                            }
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

            <Toast />
        </div>
    );
};

export default App;
