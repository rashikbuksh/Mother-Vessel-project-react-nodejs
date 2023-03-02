import React from "react";
import { FiCheck } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
const EditTableRow = ({
    editFormData,
    handleEditFormChange,
    handleCancelClick,
}) => {
    return (
        <>
            <td></td>
            <td>
                <input
                    className="w-full rounded-md text-sm"
                    type="text"
                    required="required"
                    placeholder="Enter a name..."
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="w-full rounded-md text-sm"
                    type="text"
                    required="required"
                    placeholder="Enter an username..."
                    name="username"
                    value={editFormData.username}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                {/* <input
                    className="w-full rounded-md text-sm"
                    type="text"
                    required="required"
                    placeholder="Enter a position..."
                    name="position"
                    value={editFormData.position}
                    onChange={handleEditFormChange}
                /> */}
                <select
                    className="w-full rounded-md text-sm"
                    name="position"
                    required
                    placeholder="Enter a position..."
                    value={editFormData.position}
                    onChange={handleEditFormChange}
                >
                    <option value="admin">Admin</option>
                    <option value="operations">Operations</option>
                    <option value="accounts-manager">Accounts manager</option>
                    <option value="accounts">Accounts</option>
                </select>
            </td>
            <td>
                <input
                    className="w-full rounded-md text-sm"
                    type="text"
                    required="required"
                    placeholder="Enter a department..."
                    name="department"
                    value={editFormData.department}
                    onChange={handleEditFormChange}
                />
            </td>
            <td />
            <td />
            <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                <button
                    className="mr-2 rounded-md bg-green-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-green-400"
                    type="submit"
                >
                    <FiCheck className="h-5 w-5 text-black" />
                </button>
                <button
                    className="rounded-md bg-yellow-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-yellow-400"
                    type="button"
                    onClick={handleCancelClick}
                >
                    <ImCancelCircle className="h-5 w-5 text-black" />
                </button>
            </td>
        </>
    );
};

export default EditTableRow;
