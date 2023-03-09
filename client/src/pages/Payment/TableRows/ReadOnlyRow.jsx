import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { RxReset } from "react-icons/rx";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineCheck } from "react-icons/ai";

const ReadOnlyRow = ({
    Pay,
    handleEditClick,
    handleDeleteClick,
}) => {
    return (
        <>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                <a href="#" className="font-bold text-blue-500 hover:underline">
                    {Pay.id}
                </a>
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                    {Pay.job_number}
                </span>
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Pay.LV_name}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Pay.date_from_charpotro}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Pay.MV_name}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Pay.commodity}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Pay.chq_no}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Pay.chq_issue_date}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Pay.amount}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Pay.part_pay}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Pay.payment_approved}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Pay.balance}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Pay.payment_chq_no}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Pay.payment_chq_amount}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Pay.payment_chq_date}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                {Pay.added_date}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-700">
                <button
                    type="button"
                    className="mr-2 rounded-md bg-blue-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-blue-400"
                    onClick={(event) => handleEditClick(event, Pay)}
                >
                    <BiEdit className="h-5 w-5 text-black" />
                </button>
                <button
                    type="button"
                    className="rounded-md bg-red-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-red-400"
                    onClick={() => handleDeleteClick(Pay.id)}
                >
                    <BiTrash className="h-5 w-5 text-black" />
                </button>
            </td>
        </>
    );
};

export default ReadOnlyRow;
