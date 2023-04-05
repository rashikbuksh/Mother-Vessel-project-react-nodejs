import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import DateTime from "../../../utils/DateTime";
import FormateNumber from "../../../utils/FormateNumber";

const ReadOnlyRow = ({ job, handleEditClick, handleDeleteClick }) => {
    var clsName = "whitespace-nowrap py-2 text-sm text-gray-700";

    return (
        <React.Fragment>
            <td className={clsName}>
                <span className="font-bold text-blue-500 hover:underline">
                    {job.id}
                </span>
            </td>
            <td className={clsName}>{job.order_number}</td>
            <td className={clsName}>
                <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                    {job.importer_name}
                </span>
            </td>
            <td className={clsName}>{job.mother_vessel_name}</td>
            <td className={clsName}>
                <span className="rounded-lg bg-red-200 bg-opacity-50 text-xs font-medium uppercase tracking-wider text-red-800">
                    {new Date(job.eta).toLocaleString("en-GB", {
                        timeZone: "Asia/Dhaka",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </span>
            </td>
            <td className={`text-center ${clsName}`}>
                <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                    {job.commodity}
                </span>
            </td>
            <td className={clsName}>{job.mv_location}</td>
            <td className={clsName}>{job.bl_quantity}</td>
            <td className={clsName}>{job.stevedore_name}</td>
            <td className={clsName}>
                <FormateNumber number={job.stevedore_contact_number} />
            </td>
            <td className={clsName}>
                <DateTime date={job.time_stamp} />
            </td>
            <td className="flex flex-row items-center justify-between space-x-2 py-2">
                <button
                    type="button"
                    className="rounded-md bg-blue-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-blue-400"
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
        </React.Fragment>
    );
};

export default ReadOnlyRow;
