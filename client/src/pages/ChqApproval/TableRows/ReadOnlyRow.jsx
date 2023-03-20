import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import DateTime from "../../../utils/DateTime";

const ReadOnlyRow = ({ Chq, handleEditClick, handleDeleteClick }) => {
    var clsName = "whitespace-nowrap py-3 text-sm text-gray-700";
    return (
        <>
            <td className={clsName}>
                <a href="#" className="font-bold text-blue-500 hover:underline">
                    {Chq.id}
                </a>
            </td>
            <td className={clsName}>{Chq.order_number}</td>
            <td className={clsName}>
                <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                    {Chq.job_number}
                </span>
            </td>
            <td className={clsName}>
                <DateTime date={Chq.date_from_charpotro} />
            </td>
            <td className={`text-center ${clsName}`}>
                {Chq.cp_number_from_charpotro}
            </td>
            <td className={clsName}>{Chq.LA_name}</td>
            <td className={clsName}>{Chq.LV_name}</td>
            <td className={clsName}>{Chq.MV_name}</td>
            <td className={clsName}>{Chq.dest_from}</td>
            <td className={clsName}>{Chq.dest_to}</td>
            <td className={`text-center ${clsName}`}>{Chq.capacity_ton}</td>
            <td className={`text-center ${clsName}`}>{Chq.rate}</td>
            <td className={clsName}>{Chq.sixty_percent_payment}</td>
            <td className={clsName}>{Chq.forty_percent_payment}</td>
            <td className={clsName}>{Chq.damarage}</td>
            <td className={clsName}>{Chq.second_trip}</td>
            <td className={clsName}>{Chq.third_trip}</td>
            <td className={clsName}>{Chq.direct_trip}</td>
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
