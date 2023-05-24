import React, { useState, useEffect, Suspense } from "react";
import ReadOnlyRow from "./TableRows/ReadOnlyRow";
import EditableRow from "./TableRows/EditTableRow";
import AddModal from "./AddModal";
import TableHead from "../../components/Table/TableHead"; // new
import Pagination from "../../components/Table/Pagination"; // new
import { useSortableTable } from "../../components/Table/useSortableTable"; // new
import Axios from "axios";
import Loader from "../../utils/Loader";
import FormData from "form-data";

import { IoMdPersonAdd } from "react-icons/io";

//toast
import { generatedToast } from "../../components/Toast";
import { lv } from "date-fns/locale";

const TableHeader = [
    {
        id: 1,
        name: "Id",
        accessor: "id",
        sortable: true,
        sortByOrder: "asc",
    },
    { id: 2, name: "LV Name", accessor: "LV_name", sortable: true },
    { id: 3, name: "Capacity", accessor: "capacity", sortable: true },
    {
        id: 4,
        name: "M. No. (Reg No.)",
        accessor: "master_reg_number",
        sortable: true,
    },
    { id: 5, name: "Master's Name", accessor: "masters_name", sortable: true },
    {
        id: 6,
        name: "Master's Contact Number",
        accessor: "masters_contact_number",
        sortable: true,
    },
    {
        id: 7,
        name: "Master's NID Image Attachment",
        accessor: "masters_nid_image_attachment",
        sortable: true,
    },
    {
        id: 8,
        name: "Staffs Info",
        accessor: "staffs_info",
        sortable: true,
        width: "w-4",
    },
    {
        id: 10,
        name: "Leased (Yes/No)",
        accessor: "leased",
        sortable: true,
    },
    {
        id: 11,
        name: "Company Name",
        accessor: "company_name",
        sortable: true,
    },
    {
        id: 12,
        name: "Proprieter's Name",
        accessor: "proprietors_name",
        sortable: true,
    },
    {
        id: 13,
        name: "Office Address",
        accessor: "office_address",
        sortable: true,
    },
    {
        id: 14,
        name: "AC Number",
        accessor: "ac_number",
        sortable: true,
    },
    {
        id: 15,
        name: "Contact Details",
        accessor: "contact_details",
        sortable: true,
    },
    {
        id: 16,
        name: "L/V Documents Attachement",
        accessor: "lv_documents_attachement",
        sortable: true,
    },
    {
        id: 17,
        name: "Status",
        accessor: "status",
        sortable: true,
    },
    { id: 18, name: "Actions" },
];

const App = () => {
    // new start
    const [CurrentStatus, setCurrentStatus] = useState([]);
    const [tableData, handleSorting] = useSortableTable(
        CurrentStatus,
        TableHeader
    ); // data, columns // new
    const [cursorPos, setCursorPos] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    //Image upload
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");

    // dynamic add staff
    const [addStaff, setAddStaff] = useState(["#"]);
    //console.log(addStaff);

    // leased ship
    const [leased, setLeased] = useState(false);

    // active status
    const [active, setActive] = useState(false);
    const [lv_documents_attachementFile, setlv_documents_attachementFile] =
        useState();
    const [
        lv_documents_attachementFileName,
        setlv_documents_attachementFileName,
    ] = useState("");

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

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/management/getpredefinedship`)
            .then((res) => res.json())
            .then((data) => {
                setCurrentStatus(data);
            });
    }, []);

    // new end

    // add state
    //id is randomly generated with nanoid generator
    const [addFormData, setAddFormData] = useState({
        LV_name: "",
        capacity: "",
        master_reg_number: "",
        masters_name: "",
        masters_contact_number: "",
        masters_nid_image_attachment: "",
        staff_name: "",
        staff_nid_number: "",
        leased: "",
        company_name: "",
        proprietors_name: "",
        office_address: "",
        ac_number: "",
        contact_details: "",
        lv_documents_attachement: "",
        status: "",
    });

    //edit status
    const [editFormData, setEditFormData] = useState({
        LV_name: "",
        date_from_charpotro: "",
        commodity: "",
        LA: "",
        dest_from: "",
        dest_to: "",
        current_location: "",
        remark: "",
    });

    //modified id status
    const [editStatusId, setEditStatusId] = useState(null);

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

    //Saving File
    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);

        console.log(e.target.files[0].name);
    };

    // Saving lv_documents_attachementFile
    const saveLv_documents_attachementFile = (e) => {
        setlv_documents_attachementFile(e.target.files[0]);
        setlv_documents_attachementFileName(e.target.files[0].name);
    };

    //submit handler
    //Clicking the Add button adds a new data row to the existing row
    const handleAddFormSubmit = async (event) => {
        event.preventDefault(); // ???
        let staffVAl = "";
        for (let i = 0; i < addStaff.length; i++) {
            if (addStaff[i] !== "#") {
                if (i === addStaff.length - 1) {
                    staffVAl += addStaff[i];
                } else {
                    staffVAl += addStaff[i] + ",";
                }
            }
        }
        console.log(staffVAl);

        const newStatus = {
            LV_name: addFormData.LV_name,
            capacity: addFormData.capacity,
            master_reg_number: addFormData.master_reg_number,
            masters_name: addFormData.masters_name,
            masters_contact_number: addFormData.masters_contact_number,
            staffs_info: staffVAl,
            leased: leased ? 1 : 0,
            company_name: addFormData.company_name,
            proprietors_name: addFormData.proprietors_name,
            office_address: addFormData.office_address,
            ac_number: addFormData.ac_number,
            contact_details: addFormData.contact_details,
            status: active ? 1 : 0,
        };

        let formData = new FormData();
        formData.append("uploadFiles", file);
        formData.append("uploadFiles", lv_documents_attachementFile);

        await Axios.post(
            `${process.env.REACT_APP_API_URL}/management/upload`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data;",
                },
            }
        )
            .then((response) => {
                generatedToast(response);
            })
            .then(() => {
                closeModal();
            });

        console.log(formData);
        await Axios.post(
            `${process.env.REACT_APP_API_URL}/management/predefinedship`,
            {
                ...newStatus,
                fileName,
                lv_documents_attachementFileName,
            }
        ).then((response) => {
            generatedToast(response);
        });

        //CurrentStatus의 초기값은 data.json 데이터
        // new start
        const newTableData = [...tableData, newStatus];
        setCurrentStatus(newTableData);
    };

    //save modified data (App component)
    const handleEditFormSubmit = (event) => {
        event.preventDefault(); // prevent submit

        const editedStatus = {
            id: editStatusId, //initial value null
            LV_name: editFormData.LV_name,
            date_from_charpotro: editFormData.date_from_charpotro,
            commodity: editFormData.commodity,
            LA: editFormData.LA,
            dest_from: editFormData.dest_from,
            dest_to: editFormData.dest_to,
            current_location: editFormData.current_location,
            remark: editFormData.remark,
        };

        Axios.post(
            `${process.env.REACT_APP_API_URL}/management/updatepredefinedship`,
            {
                id: editedStatus.id,
                LV_name: editedStatus.LV_name,
                date_from_charpotro: editedStatus.date_from_charpotro,
                commodity: editedStatus.commodity,
                LA: editedStatus.LA,
                dest_from: editedStatus.dest_from,
                dest_to: editedStatus.dest_to,
                current_location: editedStatus.current_location,
                remark: editedStatus.remark,
            }
        ).then((response) => {
            generatedToast(response);
        });

        // these 3 lines will be replaced // new start
        const index = tableData.findIndex((td) => td.id === editStatusId);
        tableData[index] = editedStatus;
        setCurrentStatus(tableData);
        // new end

        setEditStatusId(null);
        // success("Status updated successfully");
    };

    //Read-only data If you click the edit button, the existing data is displayed
    const handleEditClick = (event, Status) => {
        event.preventDefault(); // ???

        setEditStatusId(Status.id);
        const formValues = {
            LV_name: Status.LV_name,
            date_from_charpotro: Status.date_from_charpotro,
            commodity: Status.commodity,
            LA: Status.LA,
            dest_from: Status.dest_from,
            dest_to: Status.dest_to,
            current_location: Status.current_location,
            remark: Status.remark,
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
            `${process.env.REACT_APP_API_URL}/management/deletepredefinedship`,
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
                    // new start // job change copy paste the className
                    className="flex flex-row items-center justify-center rounded-md bg-green-600 px-3 py-0 text-sm font-semibold text-white transition duration-500 ease-in-out hover:bg-green-400"
                    onClick={openModal}
                >
                    Add Ship <IoMdPersonAdd className="ml-2 inline h-5 w-5" />
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
                            {search(tableData).map((status, idx) => (
                                <tr
                                    key={status.id}
                                    className={`my-auto items-center justify-center ${
                                        idx % 2 === 1 ? "bg-gray-200" : ""
                                    }`}
                                >
                                    {editStatusId === status.id ? (
                                        <EditableRow
                                            {...{
                                                editFormData,
                                                handleEditFormChange,
                                                handleCancelClick,
                                            }}
                                        />
                                    ) : (
                                        <ReadOnlyRow
                                            {...{
                                                status,
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
            </form>

            {/* // new end */}

            {/* add item modal */}
            <Suspense fallback={<Loader />}>
                <AddModal
                    {...{
                        isOpen,
                        closeModal,
                        handleAddFormChange,
                        handleAddFormSubmit,
                        saveFile,
                        addStaff,
                        setAddStaff,
                        leased,
                        setLeased,
                        active,
                        setActive,
                        saveLv_documents_attachementFile,
                    }}
                />
            </Suspense>
        </div>
    );
};

export default App;
