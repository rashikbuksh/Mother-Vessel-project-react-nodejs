import { useState } from "react";
import {
	FaArrowsAltV,
	FaLongArrowAltDown,
	FaLongArrowAltUp,
} from "react-icons/fa";
const TableHead = ({ columns, handleSorting }) => {
	const [sortField, setSortField] = useState("");
	const [order, setOrder] = useState("asc");

	const handleSortingChange = (accessor) => {
		const sortOrder =
			accessor === sortField && order === "asc" ? "desc" : "asc";
		setSortField(accessor);
		setOrder(sortOrder);
		handleSorting(accessor, sortOrder);
	};

	return (
		<thead className="break-words rounded-md border-b-2 border-gray-400 bg-green-200 py-6">
			<tr>
				{columns.map((col) => {
					return (
						<th
							key={col?.id}
							onClick={
								col?.sortable
									? () => handleSortingChange(col?.accessor)
									: null
							}
							className={`cursor-pointer select-none border-r-2 border-gray-400 px-2 py-2 text-left text-sm font-semibold tracking-wide ${
								col?.sortable
									? "hover:bg-green-300 hover:text-gray-900"
									: "bg-green-200 text-gray-700"
							} ${col?.width}
                            `}
						>
							<span
								className={`flex items-center justify-between space-x-2`}
							>
								<>{col?.name}</>
								<>
									{col?.sortable ? (
										sortField === col?.accessor &&
										order === "asc" ? (
											<FaLongArrowAltUp />
										) : sortField === col?.accessor &&
										  order === "desc" ? (
											<FaLongArrowAltDown />
										) : (
											<FaArrowsAltV />
										)
									) : null}
								</>
							</span>
						</th>
					);
				})}
			</tr>
		</thead>
	);
};

export default TableHead;
