import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { RxReset } from "react-icons/rx";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineCheck } from "react-icons/ai";

const ReadOnlyRow = ({
    Dam,
    handleEditClick,
    handleDeleteClick,
}) => {
    return (
        <>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                <a href="#" className="font-bold text-blue-500 hover:underline">
                    {Dam.id}
                </a>
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.order_number}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                    {Dam.job_number}
                </span>
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.date}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.cp_number}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.date_from_charpotro}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.commodity}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.volume}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.LV_name}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.MV_name}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.loading_location}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.unloading_location}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.loading_start_time_stamp}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.loading_completion_time_stamp}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.sailing_time_stamp}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.duration_of_travel_time}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.unloading_start_time_stamp}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.unloading_completion_time_stamp}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.others}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.total_elapsed_time}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.voyage_time}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.free_time}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.total_despatch}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Dam.daily_despatch}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
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
