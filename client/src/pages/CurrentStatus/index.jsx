import { useState, useEffect, Suspense, lazy, Fragment } from "react";
import Axios from "axios";
import ReadOnlyRow from "./Table/ReadOnlyRow";
import EditableRow from "./Table/EditTableRow";
import TableHead from "../../components/Table/TableHead";

import { useSortableTable } from "../../components/Table/useSortableTable";

import { errorData, errorCheck } from "./Error";
import { generatedToast } from "../../components/Toast";
import { fetchData } from "../../hooks/fetchData";

import NoDataFound from "../../utils/NoDataFound";
import LoadMore from "../../utils/LoadMore";
import PingLoader from "../../utils/PingLoader";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const TableHeader = [
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

const opt = [{ value: "All" }, { value: "Own" }, { value: "Other" }];

const AddCurrentStatus = lazy(() => import("./AddCurrentStatus"));

const App = () => {
    const [CurrentStatus, setCurrentStatus] = useState([]);
    const [tableData, handleSorting] = useSortableTable(
        CurrentStatus,
        TableHeader
    );
    const [cursorPos, setCursorPos] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    const [filterByShip, setFilterByShip] = useState(opt[0]);

    // fetch data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData(
            `${process.env.REACT_APP_API_URL}/management/getcurrentstatus?filterByShip=${filterByShip.value}`,
            setCurrentStatus,
            setLoading,
            setError
        );
    }, [filterByShip]);

    // search filter for all fields
    const [query, setQuery] = useState("");

    const data = Object.values(tableData);
    function search(items) {
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

        const editedStatus = {
            id: editStatusId,
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
            editedStatus
        ).then((response) => {
            generatedToast(response);
        });

        const index = tableData.findIndex((td) => td.id === editStatusId);
        tableData[index] = editedStatus;
        setCurrentStatus(tableData);

        setEditStatusId(null);
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

        Axios.post(
            `${process.env.REACT_APP_API_URL}/management/deletecurrentstatus`,
            {
                status_id: StatusId,
                order_job_number: CurrentStatus[index].order_job_number,
            }
        ).then((response) => {
            generatedToast(response);
        });

        newCurrentStatus.splice(index, 1);
        setCurrentStatus(newCurrentStatus);
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
                <Listbox
                    value={filterByShip}
                    onChange={setFilterByShip}
                    className=" w-1/6"
                >
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm">
                            <span className="block truncate">
                                {filterByShip.value}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full divide-y divide-green-400 overflow-auto rounded-md bg-white py-1 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {opt.map((val, idx) => (
                                    <Listbox.Option
                                        key={idx}
                                        className={({ active }) =>
                                            `relative cursor-default select-none rounded-md py-2 pl-10 pr-4 transition duration-100 ease-in-out ${
                                                active
                                                    ? "bg-green-600 text-white"
                                                    : "text-gray-900"
                                            }`
                                        }
                                        value={val}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected
                                                            ? "font-medium"
                                                            : "font-normal"
                                                    }`}
                                                >
                                                    {val.value}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active
                                                                ? "font-extrabold text-white"
                                                                : "text-green-600"
                                                        }`}
                                                    >
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
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
                                    {editStatusId ===
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
                                            status={search(tableData)[index]}
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

            {/* new start  */}
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
