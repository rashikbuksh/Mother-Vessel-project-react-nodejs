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
                    {Chq.LA}
                </span>
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.LV_name}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.commodity}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.mode}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.Chq_amount}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.part_pay}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.balance}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.Chq_issue_date}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.init_amount}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.payment}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Chq.final_amount}
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
