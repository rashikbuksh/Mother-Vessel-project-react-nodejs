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
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required="required"
                    placeholder="Enter order number..."
                    name="order_number"
                    value={editFormData.order_number}
                    onChange={handleEditFormChange}
                    disabled
                />
            </td>
            <td>
                <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required="required"
                    placeholder="Enter LA..."
                    name="LA"
                    value={editFormData.LA}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required="required"
                    placeholder="Enter LV Name..."
                    name="LV_name"
                    value={editFormData.LV_name}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required="required"
                    placeholder="Enter commodity..."
                    name="commodity"
                    value={editFormData.commodity}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required="required"
                    placeholder="Enter mode..."
                    name="mode"
                    value={editFormData.mode}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required="required"
                    placeholder="Enter chq amount..."
                    name="chq_amount"
                    value={editFormData.chq_amount}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required="required"
                    placeholder="Enter part pay..."
                    name="part_pay"
                    value={editFormData.part_pay}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="number"
                    required="required"
                    placeholder="Enter balance..."
                    name="balance"
                    value={editFormData.balance}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="date"
                    required="required"
                    placeholder="Enter chq issue date..."
                    name="chq_issue_date"
                    value={editFormData.chq_issue_date.slice(0, 10)}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="number"
                    required="required"
                    placeholder="Enter initial amount..."
                    name="init_amount"
                    value={editFormData.init_amount}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required="required"
                    placeholder="Enter payment..."
                    name="payment"
                    value={editFormData.payment}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="number"
                    required="required"
                    placeholder="Enter final amount..."
                    name="final_amount"
                    value={editFormData.final_amount}
                    onChange={handleEditFormChange}
                />
            </td>
            <td />
            <td />
            <td className="rounded-md bg-gray-50 py-3 text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400">
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
