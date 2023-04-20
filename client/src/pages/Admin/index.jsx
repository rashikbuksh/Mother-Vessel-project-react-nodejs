import React, { useState, Fragment, useEffect, Suspense, lazy } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ReadOnlyRow from "./Table/ReadOnlyRow";
import EditableRow from "./Table/EditTableRow";
import { sha256 } from "js-sha256";
import Axios from "axios";
import Loader from "../../utils/Loader";
import TableHead from "../../components/Table/TableHead"; // new
import { useSortableTable } from "../../components/Table/useSortableTable"; // new

import { warning } from "../../components/Toast";

import { errorData } from "./Error";
import { generatedToast, Toast } from "../../components/Toast";
import { fetchData } from "../../hooks/fetchData";

import NoDataFound from "../../utils/NoDataFound";
import LoadMore from "../../utils/LoadMore";
import PingLoader from "../../utils/PingLoader";

import { IoMdPersonAdd } from "react-icons/io";
import { MdClose } from "react-icons/md";

const TableHeader = [
    {
        id: 2,
        name: "Name",
        accessor: "name",
        sortable: true,
    },
    {
        id: 3,
        name: "Username",
        accessor: "username",
        sortable: true,
    },
    {
        id: 4,
        name: "Position",
        accessor: "position",
        sortable: true,
    },
    {
        id: 5,
        name: "Department",
        accessor: "department",
        sortable: true,
    },
    {
        id: 6,
        name: "Status",
        accessor: "status",
        sortable: true,
    },
    {
        id: 7,
        name: "Reset Password",
        accessor: "reset_password",
        sortable: false,
    },
    { id: 8, name: "Actions" },
];

const AddUser = lazy(() => import("./AddUser"));

const App = () => {
    const [userList, setUserList] = useState([]);
    const [tableData, handleSorting] = useSortableTable(userList, TableHeader); // data, columns
    const [cursorPos, setCursorPos] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    // fetch data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchData(
            `${process.env.REACT_APP_API_URL}/admin/getusers`,
            setUserList,
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
        name: "",
        username: "",
        password: "",
        position: "",
        department: "",
    });

    //edit status
    const [editFormData, setEditFormData] = useState({
        name: "",
        username: "",
        position: "",
        department: "",
    });

    //edit status
    const [resetPassFormData, setResetPassFormData] = useState({
        password: "",
        reset_password: "",
    });

    //modified id status
    const [editContactId, setEditContactId] = useState(null);
    const [resetPassUserId, setResetPassUserId] = useState(null);

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

    //changeHandler
    //Update state with input data
    const handleResetPassFormChange = (event) => {
        event.preventDefault();

        //pass, reset pass
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...resetPassFormData };
        newFormData[fieldName] = fieldValue;

        setResetPassFormData(newFormData);
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

        const newContact = {
            name: addFormData.name,
            username: addFormData.username,
            password: addFormData.password,
            position: addFormData.position,
            department: addFormData.department,
        };

        // api call
        Axios.post(`${process.env.REACT_APP_API_URL}/user/register`, newContact)
            .then((response) => {
                generatedToast(response);
            })
            .then(() => {
                closeModal();
            });

        const newUserList = [...tableData, newContact];
        setUserList(newUserList);
    };

    //submit handler
    // modal open for reset password
    const reset_pass = (userId) => {
        setResetPassUserId(userId);
        openResPassModal();
    };
    //Clicking the Add button adds a new data row to the existing row
    const handleResetPassFormSubmit = (event) => {
        event.preventDefault();

        const newPass = {
            password: resetPassFormData.password,
            reset_password: resetPassFormData.reset_password,
        };

        // api call
        if (newPass.password === newPass.reset_password) {
            Axios.post(
                `${process.env.REACT_APP_API_URL}/admin/resetpassword/`,
                {
                    id: resetPassUserId,
                    password: sha256(newPass.password),
                }
            )
                .then((response) => {
                    generatedToast(response);
                })
                .then(() => {
                    closeResPassModal();
                });
        } else {
            warning("Password does not match");
        }
    };

    //save modified data (App component)
    const handleEditFormSubmit = (event) => {
        event.preventDefault(); // prevent submit

        const editedContact = {
            id: editContactId, //initial value null
            name: editFormData.name,
            username: editFormData.username,
            position: editFormData.position,
            department: editFormData.department,
        };

        Axios.post(
            `${process.env.REACT_APP_API_URL}/admin/updateinfo/`,
            editedContact
        ).then((response) => {
            generatedToast(response);
        });

        const index = tableData.findIndex((td) => td.id === editContactId);
        tableData[index] = editedContact;
        setUserList(tableData);

        setEditContactId(null);
        // window.location.reload();
    };

    //Read-only data If you click the edit button, the existing data is displayed
    const handleEditClick = (event, user) => {
        event.preventDefault(); // ???

        setEditContactId(user.id);
        const formValues = {
            name: user.name,
            username: user.username,
            position: user.position,
            department: user.department,
        };
        setEditFormData(formValues);
    };

    //Cancel button when clicked on edit
    const handleCancelClick = () => {
        setEditContactId(null);
    };

    // delete
    const handleDeleteClick = (userId) => {
        const newUserList = [...userList];
        const index = userList.findIndex((user) => user.id === userId);
        Axios.post(`${process.env.REACT_APP_API_URL}/admin/deleteuser/`, {
            user_id: userId,
        }).then((response) => {
            generatedToast(response);
        });

        newUserList.splice(index, 1);
        setUserList(newUserList);
    };

    // modal for add user
    let [isOpen, setIsOpen] = useState(false);

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    // modal for reset password
    let [isResPassOpen, setIsResPassOpen] = useState(false);

    function closeResPassModal() {
        setIsResPassOpen(false);
    }

    function openResPassModal() {
        setIsResPassOpen(true);
    }

    // enable user
    const enable_user = (userId) => {
        const index = tableData.findIndex((td) => td.id === userId);
        tableData[index] = {
            id: userId,
            name: tableData[index].name,
            username: tableData[index].username,
            position: tableData[index].position,
            department: tableData[index].department,
            enabled: 1,
        };
        Axios.post(`${process.env.REACT_APP_API_URL}/admin/enableuser/`, {
            id: userId,
            name: tableData[index].name,
        }).then((response) => {
            generatedToast(response);
        });

        setUserList(() => [...tableData]);
    };

    const disable_user = (userId) => {
        const index = tableData.findIndex((td) => td.id === userId);
        tableData[index] = {
            id: userId,
            name: tableData[index].name,
            username: tableData[index].username,
            position: tableData[index].position,
            department: tableData[index].department,
            enabled: 0,
        };
        Axios.post(`${process.env.REACT_APP_API_URL}/admin/disableuser/`, {
            id: userId,
            name: tableData[index].name,
        }).then((response) => {
            generatedToast(response);
        });

        setUserList(() => [...tableData]);
    };

    // loading and error
    if (loading) {
        return <PingLoader />;
    }
    if (error) {
        return <div>{error}</div>;
    }

    // logout

    //If save(submit) is pressed after editing is completed, submit > handleEditFormSubmit action
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
                    // new start // job change copy paste the className
                    className="flex flex-row items-center justify-center rounded-md bg-green-600 px-3 py-0 text-sm font-semibold text-white transition duration-500 ease-in-out hover:bg-green-400"
                    onClick={openModal}
                >
                    Add User <IoMdPersonAdd className="ml-2 inline h-5 w-5" />
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
                                    {editContactId ===
                                    search(tableData)[index]?.id ? (
                                        <EditableRow
                                            {...{
                                                editFormData,
                                                setEditFormData,
                                                handleEditFormChange,
                                                handleCancelClick,
                                            }}
                                        />
                                    ) : (
                                        <ReadOnlyRow
                                            user={userList[index]}
                                            {...{
                                                handleEditClick,
                                                handleDeleteClick,
                                                enable_user,
                                                disable_user,
                                                reset_pass,
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

            {/* add item modal */}
            <Suspense fallback={<PingLoader />}>
                <AddUser
                    {...{
                        isOpen,
                        closeModal,
                        handleAddFormSubmit,
                        handleAddFormChange,
                        addFormData,
                        setAddFormData,
                        errorData,
                    }}
                />
            </Suspense>

            {/* Reset Pass modal */}
            <Suspense fallback={<Loader />}>
                <Transition appear show={isResPassOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={() => {}}
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
                                        <Dialog.Title
                                            as="h3"
                                            className="mb-4 text-left text-3xl font-medium text-gray-900"
                                        >
                                            Reset Password
                                            <button
                                                className="float-right"
                                                onClick={closeResPassModal}
                                            >
                                                <MdClose className="inline text-red-600" />
                                            </button>
                                        </Dialog.Title>
                                        <form
                                            onSubmit={handleResetPassFormSubmit}
                                            className="flex flex-col gap-4"
                                        >
                                            <input
                                                className="w-full rounded-md text-sm"
                                                type="password"
                                                name="password"
                                                required
                                                placeholder="Enter an password..."
                                                onChange={
                                                    handleResetPassFormChange
                                                }
                                            />
                                            <input
                                                className="w-full rounded-md text-sm"
                                                type="password"
                                                name="reset_password"
                                                required
                                                placeholder="Enter an reset_password..."
                                                onChange={
                                                    handleResetPassFormChange
                                                }
                                            />

                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            >
                                                Reset
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
            <Toast />
        </div>
    );
};

export default App;
