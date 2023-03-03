import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { RxReset } from "react-icons/rx";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineCheck } from "react-icons/ai";

const ReadOnlyRow = ({
    job,
    handleEditClick,
    handleDeleteClick,
}) => {
    return (
        <>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                <a href="#" className="font-bold text-blue-500 hover:underline">
                    {job.id}
                </a>
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {job.order_number}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                    {job.importer_name}
                </span>
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {job.mother_vessel_name}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {job.eta}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {job.commodity}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {job.mv_location}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {job.bl_quantity}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {job.stevedore_name}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {job.stevedore_contact_number}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {job.time_stamp}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                <button
                    type="button"
                    className="mr-2 rounded-md bg-blue-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-blue-400"
                    onClick={(event) => handleEditClick(event, job)}
                >
                    <BiEdit className="h-5 w-5 text-black" />
                </button>
                <button
                    type="button"
                    className="rounded-md bg-red-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-red-400"
                    onClick={() => handleDeleteClick(job.id)}
                >
                    <BiTrash className="h-5 w-5 text-black" />
                </button>
            </td>
        </>
    );
};

export default ReadOnlyRow;
