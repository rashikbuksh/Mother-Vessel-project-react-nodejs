import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { RxReset } from "react-icons/rx";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineCheck } from "react-icons/ai";

const ReadOnlyRow = ({
    status,
    handleEditClick,
    handleDeleteClick,
}) => {
    return (
        <>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                <a href="#" className="font-bold text-blue-500 hover:underline">
                    {status.id}
                </a>
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {status.LV_name}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                    {status.date_from_charpotro}
                </span>
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {status.commodity}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {status.LA}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {status.dest_from}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {status.dest_to}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {status.current_location}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {status.remark}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {status.time_updated}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                <button
                    type="button"
                    className="mr-2 rounded-md bg-blue-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-blue-400"
                    onClick={(event) => handleEditClick(event, status)}
                >
                    <BiEdit className="h-5 w-5 text-black" />
                </button>
                <button
                    type="button"
                    className="rounded-md bg-red-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-red-400"
                    onClick={() => handleDeleteClick(status.id)}
                >
                    <BiTrash className="h-5 w-5 text-black" />
                </button>
            </td>
        </>
    );
};

export default ReadOnlyRow;
