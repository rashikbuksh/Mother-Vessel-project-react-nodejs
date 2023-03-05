import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { RxReset } from "react-icons/rx";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineCheck } from "react-icons/ai";

const ReadOnlyRow = ({
    record,
    handleEditClick,
    handleDeleteClick,
}) => {
    return (
        <>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                <a href="#" className="font-bold text-blue-500 hover:underline">
                    {record.id}
                </a>
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {record.order_number}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                    {record.job_number}
                </span>
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {record.date_from_charpotro}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {record.cp_number_from_charpotro}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {record.LA_number}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {record.LV_number}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {record.dest_from}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {record.dest_to}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {record.commodity}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {record.capacity}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {record.rate}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {record.LV_master_name}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {record.LV_master_contact_number}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {record.date_created}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                <button
                    type="button"
                    className="mr-2 rounded-md bg-blue-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-blue-400"
                    onClick={(event) => handleEditClick(event, record)}
                >
                    <BiEdit className="h-5 w-5 text-black" />
                </button>
                <button
                    type="button"
                    className="rounded-md bg-red-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-red-400"
                    onClick={() => handleDeleteClick(record.id)}
                >
                    <BiTrash className="h-5 w-5 text-black" />
                </button>
            </td>
        </>
    );
};

export default ReadOnlyRow;
