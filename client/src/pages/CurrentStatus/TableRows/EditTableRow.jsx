import React from "react";
import { FiCheck } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
const EditTableRow = ({
    editFormData,
    handleEditFormChange,
    handleCancelClick,
}) => {
    var clsName =
        "w-full rounded-md bg-gray-50 text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400";
    return (
        <>
            <td></td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="text"
                    placeholder="Select order job number..."
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
                    placeholder="Enter LV name..."
                    name="LV_name"
                    value={editFormData.LV_name}
                    onChange={handleEditFormChange}
                    disabled
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="date"
                    name="date_from_charpotro"
                    value={editFormData.date_from_charpotro.slice(0, 10)}
                    onChange={handleEditFormChange}
                    disabled
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="text"
                    placeholder="Commodity..."
                    name="commodity"
                    value={editFormData.commodity}
                    onChange={handleEditFormChange}
                    disabled
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="text"
                    placeholder="LA"
                    name="LA"
                    value={editFormData.LA}
                    onChange={handleEditFormChange}
                    disabled
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="text"
                    placeholder="Destination From..."
                    name="dest_from"
                    value={editFormData.dest_from}
                    onChange={handleEditFormChange}
                    disabled
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="text"
                    placeholder="Destination To..."
                    name="dest_to"
                    value={editFormData.dest_to}
                    onChange={handleEditFormChange}
                    disabled
                />
            </td>

            <td>
                <input
                    className={clsName}
                    type="text"
                    required
                    placeholder="Current Location..."
                    name="current_location"
                    value={editFormData.current_location}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    required
                    placeholder="Remark..."
                    name="remark"
                    value={editFormData.remark}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <span className="text-md text-black">Auto generated</span>
            </td>
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