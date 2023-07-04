import React from "react";
import { FiCheck } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
const EditTableRow = ({
	editFormData,
	handleEditFormChange,
	handleCancelClick,
}) => {
	var clsName =
		"w-full rounded-md bg-gray-50 text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400";
	return (
		<>
			<td>
				<input
					className={`${clsName} cursor-not-allowed border-red-600`}
					type="text"
					disabled
					name="LV_name"
					value={editFormData.LV_name}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>Generated</td>
			<td>
				<input
					className={`${clsName} cursor-not-allowed border-red-600`}
					type="text"
					disabled
					placeholder="master reg number ..."
					name="master_reg_number"
					value={editFormData.master_reg_number}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className={`${clsName} cursor-not-allowed border-red-600`}
					type="text"
					disabled
					placeholder="masters name ..."
					name="masters_name"
					value={editFormData.masters_name}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className={`${clsName} cursor-not-allowed border-red-600`}
					type="text"
					disabled
					placeholder="masters contact number..."
					name="masters_contact_number"
					value={editFormData.masters_contact_number}
					onChange={handleEditFormChange}
				/>
			</td>

			<td>
				<input
					className={`${clsName} cursor-not-allowed border-red-600`}
					type="text"
					disabled
					placeholder="staffs info..."
					name="staffs_info"
					value={editFormData.staffs_info}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className={`${clsName} cursor-not-allowed border-red-600`}
					type="text"
					disabled
					placeholder="leased..."
					name="leased"
					value={editFormData.leased}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className={`${clsName} cursor-not-allowed border-red-600`}
					type="text"
					disabled
					placeholder="company name..."
					name="company_name"
					value={editFormData.company_name}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className={`${clsName} cursor-not-allowed border-red-600`}
					type="text"
					disabled
					placeholder="proprietors name..."
					name="proprietors_name"
					value={editFormData.proprietors_name}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className={`${clsName} cursor-not-allowed border-red-600`}
					type="text"
					disabled
					placeholder="office address..."
					name="office_address"
					value={editFormData.office_address}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className={`${clsName} cursor-not-allowed border-red-600`}
					type="text"
					disabled
					placeholder="ac number..."
					name="ac_number"
					value={editFormData.ac_number}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className={`${clsName} cursor-not-allowed border-red-600`}
					type="text"
					disabled
					placeholder="contact details..."
					name="contact_details"
					value={editFormData.contact_details}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<select
					className={clsName}
					name="status"
					value={editFormData.status}
					onChange={handleEditFormChange}
				>
					<option value="1">Active</option>
					<option value="0">Inactive</option>
				</select>
			</td>
			<td className="rounded-md bg-gray-50 py-3 text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400">
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
