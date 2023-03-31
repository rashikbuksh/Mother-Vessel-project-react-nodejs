import React from "react";
import { FiCheck } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
const EditTableRow = ({
    editFormData,
    handleEditFormChange,
    handleCancelClick,
}) => {
    var clsName =
        "peer w-full rounded-md bg-gray-50 text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400";
    return (
        <>
            <td />
            <td>
                <input
                    className={clsName}
                    type="text"
                    required
                    placeholder="Enter order number..."
                    name="order_number"
                    value={editFormData.order_number}
                    onChange={handleEditFormChange}
                    disabled
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    required
                    placeholder="Enter Job Number..."
                    name="job_number"
                    value={editFormData.job_number}
                    onChange={handleEditFormChange}
                    disabled
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="date"
                    required
                    name="date_from_charpotro"
                    value={editFormData.date_from_charpotro.slice(0, 10)}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="number"
                    required
                    placeholder="CP Number From Charpotro..."
                    name="cp_number_from_charpotro"
                    value={editFormData.cp_number_from_charpotro}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    required
                    placeholder="LA name..."
                    name="LA_name"
                    value={editFormData.LA_name}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    required
                    placeholder="LV name..."
                    name="LV_name"
                    value={editFormData.LV_name}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    required
                    placeholder="Destination From..."
                    name="dest_from"
                    value={editFormData.dest_from}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    required
                    placeholder="Destination To..."
                    name="dest_to"
                    value={editFormData.dest_to}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    disabled
                    placeholder="Commodity..."
                    name="commodity"
                    value={editFormData.commodity}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="number"
                    required
                    placeholder="Capacity..."
                    name="capacity"
                    value={editFormData.capacity}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="number"
                    required
                    placeholder="Rate..."
                    name="rate"
                    value={editFormData.rate}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    required
                    placeholder="LV Master Name..."
                    name="LV_master_name"
                    value={editFormData.LV_master_name}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="number"
                    required
                    placeholder="LA Master Number..."
                    name="LV_master_contact_number"
                    value={editFormData.LV_master_contact_number}
                    onChange={handleEditFormChange}
                />
            </td>

            <td>
                <span className="text-md text-black">Auto generated</span>
            </td>

            <td className="flex items-center justify-between">
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
