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
                    placeholder="Enter job number..."
                    name="job_number"
                    value={editFormData.job_number}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
            <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="date"
                    required="required"
                    placeholder="Enter date..."
                    name="date"
                    value={editFormData.date}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="number"
                    required="required"
                    name="cp_number"
                    value={editFormData.cp_number}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
            <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="date"
                    required="required"
                    placeholder="Enter date from charpotro..."
                    name="date_from_charpotro"
                    value={editFormData.date_from_charpotro}
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
                    type="number"
                    required="required"
                    placeholder="Enter volume..."
                    name="volume"
                    value={editFormData.volume}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
            <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required="required"
                    placeholder="Enter LV name..."
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
                    placeholder="Enter MV name..."
                    name="MV_name"
                    value={editFormData.MV_name}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
            <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required="required"
                    placeholder="Enter loading location..."
                    name="loading_location"
                    value={editFormData.loading_location}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
            <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required="required"
                    placeholder="Enter unloading location..."
                    name="unloading_location"
                    value={editFormData.unloading_location}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
            <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="date"
                    required="required"
                    placeholder="Enter loading start time stamp..."
                    name="loading_start_time_stamp"
                    value={editFormData.loading_start_time_stamp}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
            <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="date"
                    required="required"
                    placeholder="Enter loading completion time stamp..."
                    name="loading_completion_time_stamp"
                    value={editFormData.loading_completion_time_stamp}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
            <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="date"
                    required="required"
                    placeholder="Enter sailing time stamp..."
                    name="sailing_time_stamp"
                    value={editFormData.sailing_time_stamp}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
            <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="date"
                    required="required"
                    placeholder="Enter duration of travel time..."
                    name="duration_of_travel_time"
                    value={editFormData.duration_of_travel_time}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
            <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="date"
                    required="required"
                    placeholder="Enter unloading start time stamp..."
                    name="unloading_start_time_stamp"
                    value={editFormData.unloading_start_time_stamp}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
            <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="date"
                    required="required"
                    placeholder="Enter unloading completion time stamp..."
                    name="unloading_completion_time_stamp"
                    value={editFormData.unloading_completion_time_stamp}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
            <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required="required"
                    placeholder="Enter others..."
                    name="others"
                    value={editFormData.others}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
            <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="date"
                    required="required"
                    placeholder="Enter total elapsed time..."
                    name="total_elapsed_time"
                    value={editFormData.total_elapsed_time}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
            <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="date"
                    required="required"
                    placeholder="Enter voyage time..."
                    name="voyage_time"
                    value={editFormData.voyage_time}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
            <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="date"
                    required="required"
                    placeholder="Enter free time..."
                    name="free_time"
                    value={editFormData.free_time}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
            <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="number"
                    required="required"
                    placeholder="Enter total dispatch..."
                    name="total_despatch"
                    value={editFormData.total_despatch}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
            <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="number"
                    required="required"
                    placeholder="Enter daily dispatch..."
                    name="daily_despatch"
                    value={editFormData.daily_despatch}
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
