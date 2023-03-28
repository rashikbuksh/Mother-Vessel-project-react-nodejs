import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { RxReset } from "react-icons/rx";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineCheck } from "react-icons/ai";

const ReadOnlyRow = ({ status, handleEditClick, handleDeleteClick }) => {
    var clsName = "whitespace-nowrap py-4 text-sm text-gray-700";
    return (
        <>
            <td className={clsName}>
                <a href="#" className="font-bold text-blue-500 hover:underline">
                    {status.id}
                </a>
            </td>
            <td className={clsName}>{status.LV_name}</td>
            <td className={clsName}>
                <span className="rounded-lg bg-red-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-red-800">
                    {new Date(status.date_from_charpotro).toLocaleString(
                        "en-GB",
                        {
                            timeZone: "Asia/Dhaka",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                        }
                    )}
                </span>
            </td>
            <td className={clsName}>
                <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                    {status.commodity}
                </span>
            </td>
            <td className={clsName}>{status.LA}</td>
            <td className={clsName}>{status.dest_from}</td>
            <td className={clsName}>{status.dest_to}</td>
            <td className={clsName}>{status.current_location}</td>
            <td className={clsName}>{status.remark}</td>
            <td className={clsName}>
                <span className="rounded-lg bg-red-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-red-800">
                    {new Date(status.time_updated).toLocaleString("en-GB", {
                        timeZone: "Asia/Dhaka",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                    })}
                </span>
            </td>
            <td className={clsName}>
                <button
                    type="button"
                    className="mr-2 rounded-md bg-blue-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-blue-400"
                    onClick={(event) => handleEditClick(event, status)}
                >
                    <BiEdit className="h-5 w-5 text-black" />
                </button>
                {/* 
                <button
                    type="button"
                    className="rounded-md bg-red-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-red-400"
                    onClick={() => handleDeleteClick(status.id)}
                >
                    <BiTrash className="h-5 w-5 text-black" />
                </button>
                */}
            </td>
        </>
    );
};

export default ReadOnlyRow;
