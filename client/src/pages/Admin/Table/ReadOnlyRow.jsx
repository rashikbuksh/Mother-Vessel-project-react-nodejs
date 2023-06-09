import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { BiEdit, BiTrash } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { RxReset } from "react-icons/rx";

const ReadOnlyRow = ({
	user,
	handleEditClick,
	handleDeleteClick,
	disable_user,
	enable_user,
	reset_pass,
}) => {
	var clsName = "whitespace-nowrap py-3 text-sm text-gray-700";
	return (
		<>
			<td className={clsName}>{user.name}</td>
			<td className={clsName}>
				<span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
					{user.username}
				</span>
			</td>
			<td className={clsName}>
				<span
					className={`rounded-lg p-1.5 text-xs font-medium uppercase tracking-wider${
						user.position === "admin"
							? " bg-red-200 bg-opacity-50 text-red-800"
							: user.position === "operations"
							? " bg-yellow-200 bg-opacity-50 text-yellow-800"
							: user.position === "accounts-manager"
							? " bg-blue-200 bg-opacity-50 text-blue-800"
							: user.position === "accounts"
							? " bg-green-200 bg-opacity-50 text-green-800"
							: " bg-gray-200 bg-opacity-50 text-gray-800"
					}
                    }`}
				>
					{user.position}
				</span>
			</td>
			<td className={`${clsName} text-center`}>
				{user.enabled === 1 ? (
					<button
						type="button"
						className="rounded-md bg-green-500 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-green-400"
						onClick={() => {
							disable_user(user.id);
							// window.location.reload();
						}}
					>
						<AiOutlineCheck className="h-5 w-5 text-black" />
					</button>
				) : (
					<button
						type="button"
						className="rounded-md bg-red-500 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-red-400"
						onClick={() => {
							enable_user(user.id);
							// window.location.reload();
						}}
					>
						<ImCancelCircle className="h-5 w-5 text-black" />
					</button>
				)}
			</td>
			<td className="whitespace-nowrap py-3 text-center text-sm text-gray-700">
				<button
					type="button"
					className="rounded-md bg-yellow-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-yellow-400"
					onClick={() => {
						reset_pass(user.id);
					}}
				>
					<RxReset className="h-5 w-5 text-black" />
				</button>
			</td>
			<td className="flex items-center justify-around py-2">
				<button
					type="button"
					className="mr-2 rounded-md bg-blue-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-blue-400"
					onClick={(event) => handleEditClick(event, user)}
				>
					<BiEdit className="h-5 w-5 text-black" />
				</button>
				<button
					type="button"
					className="rounded-md bg-red-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-red-400"
					onClick={() => handleDeleteClick(user.id)}
				>
					<BiTrash className="h-5 w-5 text-black" />
				</button>
			</td>
		</>
	);
};

export default ReadOnlyRow;
