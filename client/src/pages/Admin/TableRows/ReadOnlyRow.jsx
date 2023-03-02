import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";

const ReadOnlyRow = ({ user, handleEditClick, handleDeleteClick, disable_user, enable_user }) => {
    return (
        <>
            <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                <a href="#" className="font-bold text-blue-500 hover:underline">
                    {user.id}
                </a>
            </td>
            <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                {user.name}
            </td>
            <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                    {user.username}
                </span>
            </td>
            <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                {user.position}
            </td>
            <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                {user.department}
            </td>
            <td className="whitespace-nowrap p-3 text-sm text-gray-700">
               {user.enabled === 1 ? (
                                        <td>
                                            <button
                                                type="button"
                                                className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                                                onClick={() => {
                                                    disable_user(user.id);
                                                }}
                                            >
                                                Disable
                                            </button>
                                        </td>
                                    ) : (
                                        <td>
                                            <button
                                                type="button"
                                                className="rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                                                onClick={() => {
                                                    enable_user(user.id);
                                                }}
                                            >
                                                Enable
                                            </button>
                                        </td>
                                    )}
            </td>
            <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                <button
                    type="button"
                    className="mr-2 rounded-md bg-blue-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-blue-400"
                    onClick={(event) => handleEditClick(event, user)}
                >
                    <BiEdit className="h-5 w-5 text-black" />
                </button>
                <button
                    type="button"
                    className="rounded-md bg-red-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-red-400"
                    onClick={() => handleDeleteClick(user.id)}
                >
                    <BiTrash className="h-5 w-5 text-black" />
                </button>
            </td>
        </>
    );
};

export default ReadOnlyRow;
