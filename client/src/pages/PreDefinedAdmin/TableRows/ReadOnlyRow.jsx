import { BiTrash } from "react-icons/bi";

const ReadOnlyRow = ({ status, handleEditClick, handleDeleteClick }) => {
	let {
		LV_name,
		capacity,
		master_reg_number,
		masters_name,
		masters_contact_number,
		staffs_info,
		leased,
		company_name,
		proprietors_name,
		office_address,
		ac_number,
		contact_details,
	} = status;
	let staffs_info_cnt = staffs_info.split(",").length;
	var clsName = "whitespace-nowrap py-4 text-sm text-gray-700 break-words";
	return (
		<>
			<td className={clsName}>
				<a
					href={`/own-ship/${LV_name}`}
					className="font-bold text-blue-500 hover:underline"
				>
					{LV_name}
				</a>
			</td>
			<td className={clsName}>{capacity}</td>
			<td className={clsName}>{master_reg_number}</td>
			<td className={clsName}>{masters_name}</td>
			<td className={clsName}>{masters_contact_number}</td>
			<td className={clsName}>{staffs_info_cnt}</td>
			<td className={clsName}>{leased}</td>
			<td className={clsName}>{company_name}</td>
			<td className={clsName}>{proprietors_name}</td>
			<td className={`${clsName} break-all`}>{office_address}</td>
			<td className={clsName}>{ac_number}</td>
			<td className={clsName}>{contact_details}</td>
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
