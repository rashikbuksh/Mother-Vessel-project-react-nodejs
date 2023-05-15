import React from "react";
import { FiCheck } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import Select from "../../../components/Select";
const EditTableRow = ({
    editFormData,
    handleEditFormChange,
    handleCancelClick,
}) => {
    var clsName =
        "peer rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400";
    return (
        <>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="text"
                    placeholder="Enter order job number..."
                    name="order_job_number"
                    value={editFormData.order_job_number}
                    onChange={handleEditFormChange}
                    disabled
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="date"
                    required
                    placeholder="Enter date..."
                    name="date"
                    value={editFormData.date && editFormData.date.slice(0, 10)}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    disabled
                    name="cp_number"
                    value={editFormData.cp_number}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="date"
                    disabled
                    placeholder="Enter date from charpotro..."
                    name="date_from_charpotro"
                    value={
                        editFormData.date_from_charpotro &&
                        editFormData.date_from_charpotro.slice(0, 10)
                    }
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="text"
                    disabled
                    placeholder="Enter commodity..."
                    name="commodity"
                    value={editFormData.commodity}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    disabled
                    placeholder="Enter volume..."
                    name="volume"
                    value={editFormData.capacity}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
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
                    className={`${clsName} cursor-not-allowed border-red-600`}
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
                    className={clsName}
                    type="text"
                    placeholder="Enter loading location..."
                    name="loading_location"
                    value={editFormData.loading_location}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    placeholder="Enter unloading location..."
                    name="unloading_location"
                    value={editFormData.unloading_location}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="date"
                    placeholder="Enter loading start time stamp..."
                    name="loading_start_time_stamp"
                    value={
                        editFormData.loading_start_time_stamp &&
                        editFormData.loading_start_time_stamp.slice(0, 10)
                    }
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="date"
                    placeholder="Enter loading completion time stamp..."
                    name="loading_completion_time_stamp"
                    value={
                        editFormData.loading_completion_time_stamp &&
                        editFormData.loading_completion_time_stamp.slice(0, 10)
                    }
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="date"
                    placeholder="Enter sailing time stamp..."
                    name="sailing_time_stamp"
                    value={
                        editFormData.sailing_time_stamp &&
                        editFormData.sailing_time_stamp.slice(0, 10)
                    }
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    placeholder="Enter duration of travel time..."
                    name="duration_of_travel_time"
                    value={editFormData.duration_of_travel_time}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="date"
                    placeholder="Enter unloading start time stamp..."
                    name="unloading_start_time_stamp"
                    value={
                        editFormData.unloading_start_time_stamp &&
                        editFormData.unloading_start_time_stamp.slice(0, 10)
                    }
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="date"
                    placeholder="Enter unloading completion time stamp..."
                    name="unloading_completion_time_stamp"
                    value={
                        editFormData.unloading_completion_time_stamp &&
                        editFormData.unloading_completion_time_stamp.slice(
                            0,
                            10
                        )
                    }
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    placeholder="Enter others..."
                    name="others"
                    value={editFormData.others}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    placeholder="Enter total elapsed time..."
                    name="total_elapsed_time"
                    value={editFormData.total_elapsed_time}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    placeholder="Enter voyage time..."
                    name="voyage_time"
                    value={editFormData.voyage_time}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    placeholder="Enter free time..."
                    name="free_time"
                    value={editFormData.free_time}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    placeholder="Enter total dispatch..."
                    name="total_despatch"
                    value={editFormData.total_despatch}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    placeholder="Enter daily dispatch..."
                    name="daily_despatch"
                    value={editFormData.daily_despatch}
                    onChange={handleEditFormChange}
                />
            </td>
            <td className="flex items-center justify-center">
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
