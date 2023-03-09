import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { RxReset } from "react-icons/rx";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineCheck } from "react-icons/ai";

const ReadOnlyRow = ({
    Chq,
    handleEditClick,
    handleDeleteClick,
}) => {
    return (
        <>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                <a href="#" className="font-bold text-blue-500 hover:underline">
                    {Chq.id}
                </a>
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.order_number}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                    {Chq.job_number}
                </span>
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.date_from_charpotro}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.cp_number_from_charpotro}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.LA_name}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.LV_name}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.MV_name}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.dest_from}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.dest_to}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.capacity_ton}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.rate}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.sixty_percent_payment}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.forty_percent_payment}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.damarage}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.second_trip}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.third_trip}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.direct_trip}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                <button
                    type="button"
                    className="mr-2 rounded-md bg-blue-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-blue-400"
                    onClick={(event) => handleEditClick(event, Chq)}
                >
                    <BiEdit className="h-5 w-5 text-black" />
                </button>
                <button
                    type="button"
                    className="rounded-md bg-red-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-red-400"
                    onClick={() => handleDeleteClick(Chq.id)}
                >
                    <BiTrash className="h-5 w-5 text-black" />
                </button>
            </td>
        </>
    );
};

export default ReadOnlyRow;
