import React from "react";
import { FiCheck } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
const EditTableRow = ({
    editFormData,
    handleEditFormChange,
    handleCancelClick,
}) => {
    var clsName =
        "peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400";
    return (
        <>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="text"
                    placeholder="Enter Order job number..."
                    name="order_job_number"
                    value={editFormData.order_job_number}
                    onChange={handleEditFormChange}
                    disabled
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="text"
                    disabled
                    placeholder="Enter LA name..."
                    name="LA_name"
                    value={editFormData.LA_name}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="text"
                    disabled
                    placeholder="Enter LV Name..."
                    name="LV_name"
                    value={editFormData.LV_name}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="text"
                    disabled
                    placeholder="Enter Commodity..."
                    name="commodity"
                    value={editFormData.commodity}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="date"
                    required
                    placeholder="Enter chq_issue_date..."
                    name="chq_issue_date"
                    value={editFormData.chq_issue_date.slice(0, 10)}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    required
                    placeholder="Enter part pay..."
                    name="part_pay"
                    value={editFormData.part_pay}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    disabled
                    placeholder="Enter balance..."
                    name="balance"
                    value={editFormData.balance}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    required
                    placeholder="Enter payment..."
                    name="payment"
                    value={editFormData.payment}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    disabled
                    placeholder="Enter balance..."
                    name="balance"
                    value={editFormData.balance}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    required
                    placeholder="Enter payment chq no..."
                    name="payment_chq_no"
                    value={editFormData.payment_chq_no}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    required
                    placeholder="Enter payment chq amount..."
                    name="payment_chq_amount"
                    value={editFormData.payment_chq_amount}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="date"
                    required
                    placeholder="Enter payment chq date..."
                    name="payment_chq_date"
                    value={editFormData.payment_chq_date.slice(0, 10)}
                    onChange={handleEditFormChange}
                />
            </td>
            <td className="flex justify-center">
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
