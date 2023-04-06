import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import DateTime from "../../../utils/DateTime";

const ReadOnlyRow = ({ Chq, handleEditClick, handleDeleteClick }) => {
    var clsName = "whitespace-nowrap py-3 text-sm text-gray-700";
    return (
        <>
            <td className={clsName}>
                {!Chq.sixty_percent_payment_amount ||
                Chq.sixty_percent_payment_amount < 1 ? (
                    <span className="rounded-lg bg-red-200 bg-opacity-50 text-xs font-medium uppercase tracking-wider text-red-800">
                        Pending
                    </span>
                ) : (
                    <span className="rounded-lg bg-blue-200 bg-opacity-50 text-xs font-medium uppercase tracking-wider text-blue-800">
                        Current
                    </span>
                )}
            </td>

            <td className={clsName}>{Chq.order_job_number}</td>
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
            <td className={clsName}>
                <div className="flex flex-col justify-center space-y-2">
                    <span className="text-center">
                        {Chq.sixty_percent_payment_amount}
                    </span>
                    <span className="text-center">
                        {Chq.sixty_percent_payment_chq_number}
                    </span>
                    {Chq.sixty_percent_payment_chq_date && (
                        <span
                            className={`rounded-lg bg-red-200 bg-opacity-50 text-center text-xs font-medium uppercase tracking-wider text-red-800`}
                        >
                            {new Date(
                                Chq.sixty_percent_payment_chq_date
                            ).toLocaleString("en-GB", {
                                timeZone: "Asia/Dhaka",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                    )}
                </div>
            </td>
            <td className={clsName}>
                <div className="flex flex-col justify-center space-y-2">
                    <span className="text-center">
                        {Chq.forty_percent_payment_amount}
                    </span>
                    <span className="text-center">
                        {Chq.forty_percent_payment_chq_number}
                    </span>
                    {Chq.forty_percent_payment_chq_date && (
                        <span
                            className={`rounded-lg bg-red-200 bg-opacity-50 text-center text-xs font-medium uppercase tracking-wider text-red-800`}
                        >
                            {new Date(
                                Chq.forty_percent_payment_chq_date
                            ).toLocaleString("en-GB", {
                                timeZone: "Asia/Dhaka",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                    )}
                </div>
            </td>
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
