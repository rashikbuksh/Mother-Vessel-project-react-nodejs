import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import DateTime from "../../../utils/DateTime";
const ReadOnlyRow = ({ Chq, handleEditClick, handleDeleteClick }) => {
    var clsName = "whitespace-nowrap py-3 text-sm text-gray-700";
    return (
        <>
            <td className={clsName}>{Chq.order_job_number}</td>
            <td className={clsName}>{Chq.LA_name}</td>
            <td className={clsName}>{Chq.LV_name}</td>
            <td className={`text-center ${clsName}`}>
                <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                    {Chq.commodity}
                </span>
            </td>
            <td className={`text-center ${clsName}`}>{Chq.mode}%</td>
            <td className={clsName}>
                <DateTime date={Chq.chq_issue_date} />
            </td>
            <td className={`text-center ${clsName}`}>{Chq.chq_amount}</td>
            <td className={`text-center ${clsName}`}>{Chq.part_pay}</td>
            <td className={`text-center ${clsName}`}>
                {Chq.chq_amount - Chq.part_pay}
            </td>

            {/* <td className={`text-center ${clsName}`}>Calculate</td> */}
            <td className={`text-center ${clsName}`}>{Chq.payment}</td>
            <td className={`text-center ${clsName}`}>{Chq.amount}</td>
            <td className={clsName}>
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
