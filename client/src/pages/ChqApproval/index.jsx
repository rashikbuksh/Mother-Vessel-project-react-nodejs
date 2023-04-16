import { useState, useEffect, Suspense, lazy, Fragment } from "react";
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

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const TableHeader = [
    {
        id: 1,
        name: "Status",
        accessor: "status",
        sortable: true,
        sortByOrder: "asc",
    },
    {
        id: 2,
        name: "Order Number",
        accessor: "order_job_number",
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
        name: "60% (Amount, Cheque Number, Date)",
        accessor: "sixty_percent_payment",
        sortable: true,
    },
    {
        id: 14,
        name: "40% (Amount, Cheque Number, Date)",
        accessor: "forty_percent_payment",
    },
    { id: 15, name: "Damarage", accessor: "damarage" },
    { id: 16, name: "2nd Trip", accessor: "second_trip" },
    { id: 17, name: "3rd Trip", accessor: "third_trip" },
    { id: 18, name: "Direct Trip", accessor: "direct_trip" },
    { id: 19, name: "Actions" },
];

const opt = [{ value: "All" }, { value: "Pending" }, { value: "Current" }];

const AddChqApproval = lazy(() => import("./AddChqApproval"));

const App = () => {
    // new start
    const [ChqList, setChqList] = useState([]);
    const [status, setStatus] = useState(opt[0]);
    const [tableData, handleSorting] = useSortableTable(ChqList, TableHeader); // data, columns // new
    const [cursorPos, setCursorPos] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    // fetch data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetchData(
            `${process.env.REACT_APP_API_URL}/management/getchqapproval?status=${status.value}`,
            setChqList,
            setLoading,
            setError
        );
        console.log(ChqList);
    }, [status]);

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
        order_job_number: "",
        date_from_charpotro: "",
        cp_number_from_charpotro: "",
        LA_name: "",
        LV_name: "",
        MV_name: "",
        dest_from: "",
        dest_to: "",
        capacity_ton: "",
        rate: "",
        sixty_percent_payment_amount: "",
        sixty_percent_payment_chq_number: "",
        sixty_percent_payment_chq_date: "",
        forty_percent_payment_amount: "",
        forty_percent_payment_chq_number: "",
        forty_percent_payment_chq_date: "",
        damarage: "",
        second_trip: "",
        third_trip: "",
        direct_trip: "",
    });

    //modified id status
    const [editChqId, setEditChqId] = useState(null);

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
        event.preventDefault();

        const editedChq = {
            id: editChqId,
            order_job_number: editFormData.order_job_number,
            date_from_charpotro: editFormData.date_from_charpotro,
            cp_number_from_charpotro: editFormData.cp_number_from_charpotro,
            LA_name: editFormData.LA_name,
            LV_name: editFormData.LV_name,
            MV_name: editFormData.MV_name,
            dest_from: editFormData.dest_from,
            dest_to: editFormData.dest_to,
            capacity_ton: editFormData.capacity_ton,
            rate: editFormData.rate,
            sixty_percent_payment_amount:
                editFormData.sixty_percent_payment_amount,
            sixty_percent_payment_chq_number:
                editFormData.sixty_percent_payment_chq_number,
            sixty_percent_payment_chq_date:
                editFormData.sixty_percent_payment_chq_date,
            forty_percent_payment_amount:
                editFormData.forty_percent_payment_amount,
            forty_percent_payment_chq_number:
                editFormData.forty_percent_payment_chq_number,
            forty_percent_payment_chq_date:
                editFormData.forty_percent_payment_chq_date,
            damarage: editFormData.damarage,
            second_trip: editFormData.second_trip,
            third_trip: editFormData.third_trip,
            direct_trip: editFormData.direct_trip,
        };

        Axios.post(
            `${process.env.REACT_APP_API_URL}/management/updatechq_approval`,
            editedChq
        ).then((response) => {
            generatedToast(response);
        });

        const index = tableData.findIndex((td) => td.id === editChqId);
        tableData[index] = editedChq;
        setChqList(tableData);

        setEditChqId(null);
    };

    //Read-only data If you click the edit button, the existing data is displayed
    const handleEditClick = (event, Chq) => {
        event.preventDefault(); // ???

        setEditChqId(Chq.id);
        const formValues = {
            order_job_number: Chq.order_job_number,
            date_from_charpotro: Chq.date_from_charpotro,
            cp_number_from_charpotro: Chq.cp_number_from_charpotro,
            LA_name: Chq.LA_name,
            LV_name: Chq.LV_name,
            MV_name: Chq.MV_name,
            dest_from: Chq.dest_from,
            dest_to: Chq.dest_to,
            capacity_ton: Chq.capacity_ton,
            rate: Chq.rate,
            sixty_percent_payment_amount: Chq.sixty_percent_payment_amount,
            sixty_percent_payment_chq_number:
                Chq.sixty_percent_payment_chq_number,
            sixty_percent_payment_chq_date: Chq.sixty_percent_payment_chq_date,
            forty_percent_payment_amount: Chq.forty_percent_payment_amount,
            forty_percent_payment_chq_number:
                Chq.forty_percent_payment_chq_number,
            forty_percent_payment_chq_date: Chq.forty_percent_payment_chq_date,
            damarage: Chq.damarage,
            second_trip: Chq.second_trip,
            third_trip: Chq.third_trip,
            direct_trip: Chq.direct_trip,
        };
        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditChqId(null);
    };

    // delete
    const handleDeleteClick = (ChqId) => {
        const newChqList = [...ChqList];
        const index = ChqList.findIndex((Chq) => Chq.id === ChqId);
        Axios.post(
            `${process.env.REACT_APP_API_URL}/management/deletechq_approval`,
            {
                Chq_id: ChqId,
                order_job_number: ChqList[index].order_job_number,
            }
        ).then((response) => {
            generatedToast(response);
        });

        newChqList.splice(index, 1);
        setChqList(newChqList);
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
                <Listbox value={status} onChange={setStatus} className=" w-1/6">
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm">
                            <span className="block truncate">
                                {status.value}
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
                                    {editChqId ===
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
                                            Chq={search(tableData)[index]}
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

            {search(tableData).length < data.length &&
                search(tableData).length > 20 && (
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
