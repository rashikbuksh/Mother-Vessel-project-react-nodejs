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
            <td></td>
            <td>
                <input
                    className={`${clsName} border-red-600 cursor-not-allowed`}
                    type="text"
                    disabled
                    placeholder="Enter order number..."
                    name="order_number"
                    value={editFormData.order_job_number}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} border-red-600 cursor-not-allowed`}
                    type="date"
                    disabled
                    placeholder="Enter date from charpotro..."
                    name="date_from_charpotro"
                    value={editFormData.date_from_charpotro.slice(0, 10)}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} border-red-600 cursor-not-allowed`}
                    type="number"
                    disabled
                    placeholder="Enter cp number from charpotro..."
                    name="cp_number_from_charpotro"
                    value={editFormData.cp_number_from_charpotro}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} border-red-600 cursor-not-allowed`}
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
                    className={`${clsName} border-red-600 cursor-not-allowed`}
                    type="text"
                    disabled
                    placeholder="Enter LV name..."
                    name="LV_name"
                    value={editFormData.LV_name}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} border-red-600 cursor-not-allowed`}
                    type="text"
                    disabled
                    placeholder="Enter MV name..."
                    name="MV_name"
                    value={editFormData.MV_name}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} border-red-600 cursor-not-allowed`}
                    type="text"
                    placeholder="Enter destination from..."
                    name="dest_from"
                    disabled
                    value={editFormData.dest_from}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} border-red-600 cursor-not-allowed`}
                    type="text"
                    placeholder="Enter destination to..."
                    name="dest_to"
                    disabled
                    value={editFormData.dest_to}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="number"
                    placeholder="Enter capacity in ton..."
                    name="capacity_ton"
                    value={editFormData.capacity_ton}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} border-red-600 cursor-not-allowed`}
                    type="number"
                    placeholder="Enter rate..."
                    name="rate"
                    disabled
                    value={editFormData.rate}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    placeholder="Enter 60 percent payment..."
                    name="sixty_percent_payment"
                    value={editFormData.sixty_percent_payment}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    placeholder="Enter 40 percent payment..."
                    name="forty_percent_payment"
                    value={editFormData.forty_percent_payment}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    placeholder="Enter damarage..."
                    name="damarage"
                    value={editFormData.damarage}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    placeholder="Enter second trip..."
                    name="second_trip"
                    value={editFormData.second_trip}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    placeholder="Enter third trip..."
                    name="third_trip"
                    value={editFormData.third_trip}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    placeholder="Enter direct trip..."
                    name="direct_trip"
                    value={editFormData.direct_trip}
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
