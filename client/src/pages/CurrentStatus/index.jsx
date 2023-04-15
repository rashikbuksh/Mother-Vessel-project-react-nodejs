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

const AddCurrentStatus = lazy(() => import("./AddCurrentStatus"));

const App = () => {
    // new start
    const [CurrentStatus, setCurrentStatus] = useState([]);
    const [tableData, handleSorting] = useSortableTable(
        CurrentStatus,
        TableHeader
    ); // data, columns // new
    const [cursorPos, setCursorPos] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    // fetch data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        fetchData(
            `${process.env.REACT_APP_API_URL}/management/getcurrentstatus`,
            setCurrentStatus,
            setLoading,
            setError
        );
        console.log(CurrentStatus);
    }, []);

    // new end

    // add state
    //id is randomly generated with nanoid generator
    const [addFormData, setAddFormData] = useState({
        LV_name: "",
        date_from_charpotro: "",
        commodity: "",
        LA_name: "",
        dest_from: "",
        dest_to: "",
        current_location: "",
        remark: "",
    });

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

    //changeHandler
    //Update state with input data
    // const handleAddFormChange = (event) => {
    //     event.preventDefault();

    //     //fullname, address, phoneNumber, email
    //     const fieldName = event.target.getAttribute("name");
    //     //각 input 입력값
    //     const fieldValue = event.target.value;

    //     errorCheck(fieldValue, fieldName);

    //     const newFormData = { ...addFormData };
    //     newFormData[fieldName] = fieldValue;
    //     //addFormData > event.target(input)
    //     //fullName:"" > name="fullName", value=fullName input 입력값

    //     setAddFormData(newFormData);
    // };

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
    // const handleAddFormSubmit = (event) => {
    //     event.preventDefault(); // ???

    //     //data.json으로 이루어진 기존 행에 새로 입력받은 데이터 행 덧붙이기
    //     const newStatus = {
    //         LV_name: addFormData.LV_name, //handleAddFormChange로 받은 새 데이터
    //         date_from_charpotro: addFormData.date_from_charpotro,
    //         commodity: addFormData.commodity,
    //         LA_name: addFormData.LA_name,
    //         dest_from: addFormData.dest_from,
    //         dest_to: addFormData.dest_to,
    //         current_location: addFormData.current_location,
    //         remark: addFormData.remark,
    //     };

    //     // const current = new Date();
    //     // const order_number_auto = newStatus.importer_name+'-'+current.getDate().toLocaleString()+'-'+newStatus.mother_vessel_name+'-'+newStatus.mv_location
    //     // console.log(order_number_auto)

    //     // api call
    //     Axios.post(
    //         `${process.env.REACT_APP_API_URL}/management/currentstatus`,
    //         {
    //             LV_name: newStatus.LV_name, //handleAddFormChange로 받은 새 데이터
    //             date_from_charpotro: newStatus.date_from_charpotro,
    //             commodity: newStatus.commodity,
    //             LA_name: newStatus.LA_name,
    //             dest_from: newStatus.dest_from,
    //             dest_to: newStatus.dest_to,
    //             current_location: newStatus.current_location,
    //             remark: newStatus.remark,
    //         }
    //     );

    //     //CurrentStatus의 초기값은 data.json 데이터
    //     // new start
    //     const newTableData = [...tableData, newStatus];
    //     // new end

    //     setCurrentStatus(newTableData);

    //     // close modal
    //     closeModal();

    //     // toast
    //     success("Status added successfully");
    // };

    //save modified data (App component)
    const handleEditFormSubmit = (event) => {
        event.preventDefault(); // prevent submit

        const editedStatus = {
            id: editStatusId, //initial value null
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
            {
                id: editedStatus.id,
                current_location: editedStatus.current_location,
                remark: editedStatus.remark,
                trip_completed: editedStatus.trip_completed,
            }
        ).then((response) => {
            generatedToast(response);
        });

        // these 3 lines will be repLA_nameced // new start
        const index = tableData.findIndex((td) => td.id === editStatusId);
        tableData[index] = editedStatus;
        setCurrentStatus(tableData);
        // new end
        setEditStatusId(null);
        // success("Status updated successfully");
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
        //console.log("Deleting Status with id: " + StatusId);
        Axios.post(
            `${process.env.REACT_APP_API_URL}/management/deletecurrentstatus`,
            {
                status_id: StatusId,
            }
        ).then((response) => {
            generatedToast(response);
        });

        newCurrentStatus.splice(index, 1);
        setCurrentStatus(newCurrentStatus);
    };

    // modal for add Status
    // let [isOpen, setIsOpen] = useState(false);

    // function closeModal() {
    //     setIsOpen(false);
    // }

    // function openModal() {
    //     fetch(`${process.env.REACT_APP_API_URL}/management/getorderjob`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setOrderJobList(data);
    //             console.log(data);
    //         });
    //     setIsOpen(true);
    // }
    // useEffect(() => {
    //     fetch(
    //         `${process.env.REACT_APP_API_URL}/management/getCharpotroCpLA_nameLvRate?order_job_number=${addFormData.order_job_number}`
    //     )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             data?.map((item) => {
    //                 addFormData.date_from_charpotro = item.date_from_charpotro;
    //                 addFormData.LA_name = item.LA_name_name;
    //                 addFormData.LV_name = item.LV_name;
    //                 addFormData.dest_from = item.dest_from;
    //                 addFormData.dest_to = item.dest_to;
    //             });
    //         });
    //     fetch(
    //         `${process.env.REACT_APP_API_URL}/management/getComodityToPayment?order_job_number=${addFormData.order_job_number}`
    //     )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             data?.map((item) => {
    //                 addFormData.commodity = item.commodity;
    //             });
    //         });
    //     console.log("addFormData", addFormData);
    // }, [addFormData.order_job_number]);

    //If save(submit) is pressed after editing is completed, submit > handleEditFormSubmit action

    // loading and error
    if (loading) {
        return <PingLoader />;
    }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="m-2 mt-4">
            {/* // new start */}
            <div className="my-2 mx-auto flex justify-center">
                <input
                    className="mx-auto block w-1/2 rounded-md border-2 border-slate-300 bg-white py-2 shadow-lg placeholder:italic placeholder:text-slate-500 focus:border-green-500 focus:ring-0 sm:text-sm"
                    placeholder="Search for anything..."
                    type="search"
                    name="search"
                    onChange={(event) => setQuery(event.target.value)}
                />
                {/* <button
                    // new start // job change copy paste the className
                    className="flex flex-row items-center justify-center rounded-md bg-green-600 px-3 py-0 text-sm font-semibold text-white transition duration-500 ease-in-out hover:bg-green-400"
                    onClick={openModal}
                >
                    Add Status <IoMdPersonAdd className="ml-2 inline h-5 w-5" />
                </button> */}
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

            {/* // new end */}

            {/* add item modal */}
            {/* <Suspense fallback={<Loader />}>
                <AddCurrentStatus
                    isOpen,
                    closeModal,
                    handleAddFormSubmit,
                    handleAddFormChange,
                    addFormData,
                    setAddFormData,
                    errorData,
                    orderJobList,
                >
                </AddCurrentStatus>
            </Suspense> */}

            {/* toast  */}
            <Toast />
        </div>
    );
};

export default App;
