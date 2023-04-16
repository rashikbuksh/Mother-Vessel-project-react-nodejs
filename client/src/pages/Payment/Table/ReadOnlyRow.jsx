import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import DateTime from "../../../utils/DateTime";

const ReadOnlyRow = ({ Pay, handleEditClick, handleDeleteClick }) => {
    var clsName = "whitespace-nowrap py-3 text-sm text-gray-700";
    return (
        <>
            <td className={clsName}>
                <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                    {Pay.order_job_number}
                </span>
            </td>
            <td className={clsName}>{Pay.LA_name}</td>
            <td className={clsName}>{Pay.LV_name}</td>
            <td className={`text-center ${clsName}`}>
                {" "}
                <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                    {Pay.commodity}
                </span>
            </td>
            <td className={clsName}>
                <DateTime date={Pay.chq_issue_date} />
            </td>
            <td className={`text-center ${clsName}`}>{Pay.part_pay}</td>
            <td className={`text-center ${clsName}`}>{Pay.balance}</td>
            <td className={`text-center ${clsName}`}>{Pay.payment}</td>
            <td className={`text-center ${clsName}`}>{Pay.amount}</td>
            <td className={`text-center ${clsName}`}>{Pay.payment_chq_no}</td>
            <td className={`text-center ${clsName}`}>
                {Pay.payment_chq_amount}
            </td>
            <td className={clsName}>
                <DateTime date={Pay.payment_chq_date} />
            </td>
            <td className={clsName}>
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
