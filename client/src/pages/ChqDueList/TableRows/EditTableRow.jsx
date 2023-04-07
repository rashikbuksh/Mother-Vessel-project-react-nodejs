import React from "react";
import { FiCheck } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { DefineRole } from "../../../hooks/routes";
const EditTableRow = ({
    editFormData,
    handleEditFormChange,
    handleCancelClick,
}) => {
    const { original_role } = DefineRole();
    var clsName =
        "peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400";
    return (
        <>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="text"
                    placeholder="Enter order number..."
                    name="order_job_number"
                    value={editFormData.order_job_number}
                    onChange={handleEditFormChange}
                    disabled
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="text"
                    disabled
                    placeholder="Enter LA name..."
                    name="LA_name"
                    value={editFormData.LA_name}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="text"
                    disabled
                    placeholder="Enter LV Name..."
                    name="LV_name"
                    value={editFormData.LV_name}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="text"
                    disabled
                    placeholder="Enter commodity..."
                    name="commodity"
                    value={editFormData.commodity}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="text"
                    disabled
                    placeholder="Enter mode..."
                    name="mode"
                    value={editFormData.mode}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="date"
                    disabled
                    placeholder="Enter chq issue date..."
                    name="chq_issue_date"
                    value={editFormData.chq_issue_date.slice(0, 10)}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="text"
                    disabled
                    placeholder="Enter chq amount..."
                    name="chq_amount"
                    value={editFormData.chq_amount}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="text"
                    disabled
                    placeholder="Enter part pay..."
                    name="part_pay"
                    value={editFormData.part_pay}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="number"
                    disabled
                    placeholder="Enter balance..."
                    name="balance"
                    value={editFormData.chq_amount - editFormData.part_pay}
                    onChange={handleEditFormChange}
                />
            </td>
            {/* <td>
                <input
                    className={`${clsName} cursor-not-allowed border-red-600`}
                    type="number"
                    disabled
                    placeholder="Enter initial amount..."
                    name="init_amount"
                    value={"calc"}
                    onChange={handleEditFormChange}
                />
            </td> */}
            <td>
                <select
                    className={`${clsName} ${
                        original_role === "admin"
                            ? ""
                            : "cursor-not-allowed border-red-600"
                    }`}
                    name="payment"
                    value={editFormData.payment || "default"}
                    onChange={handleEditFormChange}
                    disabled={original_role === "admin" ? false : true}
                >
                    <option value="Part" selected>
                        Part
                    </option>
                    <option value="Full">Full</option>
                </select>
            </td>
            <td>
                <input
                    className={`${clsName} ${
                        original_role === "admin"
                            ? ""
                            : "cursor-not-allowed border-red-600"
                    }`}
                    type="number"
                    required
                    disabled={original_role === "admin" ? false : true}
                    placeholder="Enter final amount..."
                    name="amount"
                    value={editFormData.amount}
                    onChange={handleEditFormChange}
                    onInput={(e) => {
                        (e.target.value >
                            editFormData.chq_amount - editFormData.part_pay &&
                            (e.target.value =
                                editFormData.chq_amount -
                                editFormData.part_pay)) ||
                            (e.target.value < 0 && (e.target.value = 0));
                    }}
                />
            </td>
            <td className="flex items-center">
                <button
                    className="mr-2 rounded-md bg-green-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-green-400"
                    type="submit"
                >
                    <FiCheck className="h-5 w-5 text-black" />
                </button>
                <button
                    className="rounded-md bg-yellow-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-yellow-400"
                    type="button"
                    onClick={handleCancelClick}
                >
                    <ImCancelCircle className="h-5 w-5 text-black" />
                </button>
            </td>
        </>
    );
};

export default EditTableRow;
