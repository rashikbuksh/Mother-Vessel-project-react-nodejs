import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import DateTime from "../../../utils/DateTime";

const ReadOnlyRow = ({ Dam, handleEditClick, handleDeleteClick }) => {
    var clsName = "whitespace-nowrap py-3 text-sm text-gray-700";
    return (
        <>
            <td className={clsName}>{Dam.order_job_number}</td>
            <td className={clsName}>
                {Dam.date && <DateTime date={Dam.date} isTime={false} />}
            </td>
            <td className={`text-center ${clsName}`}>{Dam.cp_number}</td>
            <td className={clsName}>
                {Dam.date_from_charpotro && (
                    <DateTime date={Dam.date_from_charpotro} isTime={false} />
                )}
            </td>
            <td className={`text-center ${clsName}`}>
                <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                    {Dam.commodity}
                </span>
            </td>
            <td className={`text-center ${clsName}`}>{Dam.capacity}</td>
            <td className={clsName}>{Dam.LV_name}</td>
            <td className={clsName}>{Dam.MV_name}</td>
            <td className={clsName}>{Dam.loading_location}</td>
            <td className={clsName}>{Dam.unloading_location}</td>
            <td className={clsName}>
                {Dam.loading_start_time_stamp && (
                    <DateTime
                        date={Dam.loading_start_time_stamp}
                        isTime={false}
                    />
                )}
            </td>
            <td className={clsName}>
                {Dam.loading_completion_time_stamp && (
                    <DateTime
                        date={Dam.loading_completion_time_stamp}
                        isTime={false}
                    />
                )}
            </td>
            <td className={clsName}>
                {Dam.sailing_time_stamp && (
                    <DateTime date={Dam.sailing_time_stamp} isTime={false} />
                )}
            </td>
            <td className={clsName}>{Dam.duration_of_travel_time}</td>
            <td className={clsName}>
                {Dam.unloading_start_time_stamp && (
                    <DateTime
                        date={Dam.unloading_start_time_stamp}
                        isTime={false}
                    />
                )}
            </td>
            <td className={clsName}>
                {Dam.unloading_completion_time_stamp && (
                    <DateTime
                        date={Dam.unloading_completion_time_stamp}
                        isTime={false}
                    />
                )}
            </td>
            <td className={clsName}>{Dam.others}</td>
            <td className={clsName}>{Dam.total_elapsed_time}</td>
            <td className={clsName}>{Dam.voyage_time}</td>
            <td className={clsName}>{Dam.free_time}</td>
            <td className={`text-center ${clsName}`}>{Dam.total_despatch}</td>
            <td className={`text-center ${clsName}`}>{Dam.daily_despatch}</td>
            <td className={clsName}>
                <button
                    type="button"
                    className="mr-2 rounded-md bg-blue-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-blue-400"
                    onClick={(event) => handleEditClick(event, Dam)}
                >
                    <BiEdit className="h-5 w-5 text-black" />
                </button>
                <button
                    type="button"
                    className="rounded-md bg-red-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-red-400"
                    onClick={() => handleDeleteClick(Dam.id)}
                >
                    <BiTrash className="h-5 w-5 text-black" />
                </button>
            </td>
        </>
    );
};

export default ReadOnlyRow;
