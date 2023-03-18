import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

const UpdateInfo = ({ isOpen, setIsOpen, selectedUser, closeModal }) => {
    const { userId } = useParams();

    const [user, setUser] = useState({
        id: selectedUser?.id,
        newName: selectedUser?.name,
        newUsername: selectedUser?.username,
        newPosition: selectedUser?.position,
        newDepartment: selectedUser?.department,
    });

    const handleInput = (e) => {
        const { name, value } = e.target;

        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/admin/updateinfo/", {
            user_id: user.id,
            new_name: user.newName,
            new_username: user.newUsername,
            new_position: user.newPosition,
            new_department: user.newDepartment,
        });
        alert("Info has been updated");
        setIsOpen(false);
    };

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Update Info
                                </Dialog.Title>
                                <form onSubmit={onSubmit} className="content">
                                    <input
                                        type="text"
                                        placeholder="New Name"
                                        name="newName"
                                        onChange={handleInput}
                                        value={user.newName}
                                    />
                                    <input
                                        type="text"
                                        name="newUsername"
                                        placeholder="New Username"
                                        onChange={handleInput}
                                        value={user.newUsername}
                                    />
                                    <input
                                        type="text"
                                        name="newPosition"
                                        placeholder="New Position"
                                        onChange={handleInput}
                                        value={user.newPosition}
                                    />
                                    <input
                                        type="text"
                                        name="newDepartment"
                                        placeholder="New Department"
                                        onChange={handleInput}
                                        value={user.newDepartment}
                                    />

                                    <button
                                        className="rounded bg-purple-500 py-2 px-4 font-bold text-white hover:bg-purple-700"
                                        type="submit"
                                    >
                                        Update
                                    </button>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default UpdateInfo;
