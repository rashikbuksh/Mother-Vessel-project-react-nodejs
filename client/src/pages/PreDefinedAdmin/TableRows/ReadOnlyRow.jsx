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
            <td className={clsName}>{status.capacity}</td>
            <td className={clsName}>{status.reg_number}</td>
            <td className={clsName}>{status.masters_name}</td>
            <td className={clsName}>{status.masters_contact_number}</td>
            <td className={clsName}>{status.masters_nid_image_attachment}</td>
            <td className={clsName}>{status.staff_name}</td>
            <td className={clsName}>{status.staff_nid_number}</td>
            <td className={clsName}>{status.leased}</td>
            <td className={clsName}>{status.company_name}</td>
            <td className={clsName}>{status.proprietors_name}</td>
            <td className={clsName}>{status.office_address}</td>
            <td className={clsName}>{status.ac_number}</td>
            <td className={clsName}>{status.contact_details}</td>
            <td className={clsName}>{status.lv_documents_attachement}</td>
            <td className={clsName}>{status.status}</td>
            <td className={clsName}>
                <button
                    type="button"
                    className="rounded-md bg-red-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-red-400"
                    onClick={() => handleDeleteClick(status.id)}
                >
                    <BiTrash className="h-5 w-5 text-black" />
                </button>
            </td>
        </>
    );
};

export default ReadOnlyRow;
