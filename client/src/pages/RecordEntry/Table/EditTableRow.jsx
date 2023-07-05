import React from "react";
import { FiCheck } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
const EditTableRow = ({
	editFormData,
	handleEditFormChange,
	handleCancelClick,
}) => {
	var clsName =
		"peer w-full rounded-md bg-gray-50 text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400";
	const {
		order_number,
		job_number,
		commodity,
		date_from_charpotro,
		cp_number_from_charpotro,
		LA_name,
		LV_name,
		dest_from,
		dest_to,
		capacity,
		rate,
		LV_master_name,
		LV_master_contact_number,
	} = editFormData;

	return (
		<>
			<td>
				<input
					className={`${clsName} cursor-not-allowed border-red-600`}
					type="text"
					required
					placeholder="Enter order number..."
					name="order_number"
					value={order_number}
					onChange={handleEditFormChange}
					disabled
				/>
			</td>
			<td>
				<input
					className={`${clsName} cursor-not-allowed border-red-600`}
					type="text"
					required
					placeholder="Enter Job Number..."
					name="job_number"
					value={job_number}
					onChange={handleEditFormChange}
					disabled
				/>
			</td>
			<td>
				<input
					className={`${clsName} cursor-not-allowed select-none border-red-600`}
					type="text"
					disabled
					placeholder="Commodity..."
					name="commodity"
					value={commodity}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className={clsName}
					type="date"
					required
					name="date_from_charpotro"
					value={date_from_charpotro.slice(0, 10)}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className={clsName}
					type="number"
					onWheel={(e) => e.target.blur()}
					required
					placeholder="CP Number From Charpotro..."
					name="cp_number_from_charpotro"
					value={cp_number_from_charpotro}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className={clsName}
					type="text"
					required
					placeholder="LA name..."
					name="LA_name"
					value={LA_name}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className={clsName}
					type="text"
					required
					placeholder="LV name..."
					name="LV_name"
					value={LV_name}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className={`${clsName} cursor-not-allowed border-red-600`}
					type="text"
					disabled
					placeholder="Destination From..."
					name="dest_from"
					value={dest_from}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className={clsName}
					type="text"
					required
					placeholder="Destination To..."
					name="dest_to"
					value={dest_to}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className={`${clsName} cursor-not-allowed border-red-600`}
					type="number"
					onWheel={(e) => e.target.blur()}
					disabled
					placeholder="Capacity..."
					name="capacity"
					value={capacity}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className={`${clsName} cursor-not-allowed border-red-600`}
					type="number"
					onWheel={(e) => e.target.blur()}
					disabled
					placeholder="Rate..."
					name="rate"
					value={rate}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className={clsName}
					type="text"
					required
					placeholder="LV Master Name..."
					name="LV_master_name"
					value={LV_master_name}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className={clsName}
					type="number"
					onWheel={(e) => e.target.blur()}
					required
					placeholder="LA Master Number..."
					name="LV_master_contact_number"
					value={LV_master_contact_number}
					onChange={handleEditFormChange}
					pattern="[0-0]{1}[1-1]{1}[3-9]{1}[0-9]{8}"
				/>
			</td>

			<td className="text-center text-sm">
				<span className="rounded-lg bg-red-200 bg-opacity-50 text-xs font-medium uppercase tracking-wider text-red-800">
					Auto generated
				</span>
			</td>

			<td className="flex items-center justify-around py-2">
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
