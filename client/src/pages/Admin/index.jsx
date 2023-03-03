import React, { useState, Fragment, useEffect, Suspense } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ReadOnlyRow from "./TableRows/ReadOnlyRow";
import EditableRow from "./TableRows/EditTableRow";
import { sha256 } from "js-sha256";
import Axios from "axios";
import Loader from "../../utils/Loader";

import { IoMdPersonAdd } from "react-icons/io";

//toast
import { success, warning } from "../../components/Toast";
import { ToastContainer } from "react-toastify";

const TableHeader = [
    { id: 1, name: "Id", width: "w-8" },
    { id: 2, name: "Name" },
    { id: 3, name: "Username" },
    { id: 4, name: "Position", width: "w-36" },
    { id: 5, name: "Department", width: "w-24" },
    { id: 6, name: "Status", width: "w-16" },
    { id: 7, name: "Reset Password", width: "w-16" },
    { id: 8, name: "Actions", width: "w-16" },
];

const App = () => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/admin/getusers")
            .then((res) => res.json())
            .then((data) => {
                setUserList(data);
            });
    }, [userList]);

    // add state
    //id is randomly generated with nanoid generator
    const [addFormData, setAddFormData] = useState({
        name: "",
        username: "",
        password: "",
        position: "admin",
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

    //changeHandler
    //Update state with input data
    const handleResetPassFormChange = (event) => {
        event.preventDefault();

        //pass, reset pass
        const fieldName = event.target.getAttribute("name");
        //각 input 입력값
        const fieldValue = event.target.value;

        const newFormData = { ...resetPassFormData };
        newFormData[fieldName] = fieldValue;
        //addFormData > event.target(input)
        //fullName:"" > name="fullName", value=fullName input 입력값

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

        //data.json으로 이루어진 기존 행에 새로 입력받은 데이터 행 덧붙이기
        const newContact = {
            name: addFormData.name, //handleAddFormChange로 받은 새 데이터
            username: addFormData.username,
            password: addFormData.password,
            position: addFormData.position,
            department: addFormData.department,
        };

        // api call
        Axios.post("http://localhost:3001/user/register", {
            name: newContact.name,
            username: newContact.username,
            password: sha256(newContact.password),
            position: newContact.position,
            department: newContact.department,
        });

        //userList의 초기값은 data.json 데이터
        const newUserList = [...userList, newContact];
        setUserList(newUserList);

        // close modal
        closeModal();

        // toast
        success("User added successfully");
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
            Axios.post("http://localhost:3001/admin/resetpassword/", {
                user_id: resetPassUserId,
                new_password: sha256(newPass.password),
            });
            closeResPassModal();
            success("Password reset successfully");
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

        Axios.post("http://localhost:3001/admin/updateinfo/", {
            user_id: editedContact.id,
            new_name: editedContact.name,
            new_username: editedContact.username,
            new_position: editedContact.position,
            new_department: editedContact.department,
        });

        const newUserList = [...userList]; //json.data + data added with setUserList above by receiving new input
        const index = userList.findIndex((user) => user.id === editContactId);
        newUserList[index] = editedContact; // Assign the modified data object to the object of the index row of the userList array, which is the entire data

        setUserList(newUserList);
        setEditContactId(null);
        success("User updated successfully");
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
        Axios.post("http://localhost:3001/admin/deleteuser/", {
            user_id: userId,
        }).then((response) => {
            if (response.data == "success") {
                success("User deleted successfully");
            }
        });

        newUserList.splice(index, 1);
        setUserList(newUserList);
    };

    // search filter
    const [query, setQuery] = useState("");

    const filteredPeople =
        query === ""
            ? userList
            : userList.filter((user) =>
                  user.name
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    // modal for add user
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

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
        Axios.post("http://localhost:3001/admin/enableuser/", {
            user_id: userId,
        });
        success("User enabled");
    };
    const disable_user = (userId) => {
        Axios.post("http://localhost:3001/admin/disableuser/", {
            user_id: userId,
        });
        warning("User disabled");
    };

    // logout
    if (localStorage.getItem("user_type") == "admin") {
    } else if (localStorage.getItem("user_type") == "operations") {
        window.location.href = "/";
    } else {
        window.location.href = "/login";
    }
    const logout = () => {
        localStorage.setItem("loggedin", "false");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_type");
        window.location.href = "/login";
    };

    //If save(submit) is pressed after editing is completed, submit > handleEditFormSubmit action
    return (
        <div className="m-2 mt-4">
            <div className="flex flex-row justify-center">
                <button
                    className="flex flex-row items-center justify-center rounded-md bg-green-300 px-3 py-0 text-sm font-semibold text-gray-900 transition duration-500 ease-in-out hover:bg-green-400"
                    onClick={openModal}
                >
                    Add User <IoMdPersonAdd className="ml-2 inline h-5 w-5" />
                </button>
                <input
                    className="mx-auto block w-1/2 rounded-md border-2 border-slate-300 bg-white py-2 shadow-lg placeholder:italic placeholder:text-slate-500 focus:border-green-500 focus:ring-0 sm:text-sm"
                    placeholder="Search for name..."
                    type="search"
                    name="search"
                    onChange={(event) => setQuery(event.target.value)}
                />
                <button
                    className="rounded-md bg-red-500 px-3 py-0 text-sm font-semibold text-white transition duration-500 ease-in-out hover:bg-red-700"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
            <br />
            <form onSubmit={handleEditFormSubmit}>
                <table className="w-full rounded-md">
                    <thead className="rounded-md border-b-2 border-gray-400 bg-orange-200">
                        <tr>
                            {TableHeader.map((header) => (
                                <th
                                    key={header.id}
                                    className={`border-r-2 px-2 text-left text-sm font-semibold tracking-wide ${header.width}`}
                                >
                                    {header.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 rounded-md">
                        {filteredPeople.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredPeople.map((user, idx) => (
                                <tr
                                    key={user.id}
                                    className={`bg-white ${
                                        idx % 2 === 1 ? "bg-gray-200" : ""
                                    }`}
                                >
                                    {editContactId === user.id ? (
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
                                            user={user}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={
                                                handleDeleteClick
                                            }
                                            enable_user={enable_user}
                                            disable_user={disable_user}
                                            reset_pass={reset_pass}
                                        />
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </form>

            {/* add item modal */}
            <Suspense fallback={<Loader />}>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={closeModal}
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
                                            className="mb-4 text-center text-3xl font-medium text-gray-900"
                                        >
                                            Add User
                                        </Dialog.Title>
                                        <form
                                            onSubmit={handleAddFormSubmit}
                                            className="flex flex-col gap-4"
                                        >
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Username
                                                </label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Position
                                                </label>
                                                <select
                                                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                    name="position"
                                                    required
                                                    placeholder="Enter a phone position..."
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                >
                                                    <option value="admin">
                                                        Admin
                                                    </option>
                                                    <option value="operations">
                                                        Operations
                                                    </option>
                                                    <option value="accounts-manager">
                                                        Accounts manager
                                                    </option>
                                                    <option value="accounts">
                                                        Accounts
                                                    </option>
                                                </select>
                                            </div>

                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Department
                                                </label>
                                                <input
                                                    type="text"
                                                    name="department"
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

            {/* Reset Pass modal */}
            <Suspense fallback={<Loader />}>
                <Transition appear show={isResPassOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={closeResPassModal}
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
            <ToastContainer closeOnClick />
        </div>
    );
};

export default App;
