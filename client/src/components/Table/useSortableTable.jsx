import { useState } from "react";

export const useSortableTable = (data, columns) => {
	const sortedData = [...data]?.sort((a, b) => {
		const filterColumn = columns?.filter((column) => column?.sortByOrder);
		let { accessor = "id", sortByOrder = "asc" } = Object.assign(
			{},
			...filterColumn
		);

		if (a[accessor] === null && b[accessor] === null) return 0;
		if (a[accessor] === null) return 1;
		if (b[accessor] === null) return -1;

		const ascending = a[accessor]
			?.toString()
			?.localeCompare(b[accessor]?.toString(), "en", { numeric: true });

		return sortByOrder === "asc" ? ascending : -ascending;
	});
	const [tableData, setTableData] = useState(sortedData);
	if (tableData.length !== sortedData.length) setTableData(sortedData);

	const handleSorting = (sortField, sortOrder) => {
		if (sortField) {
			const sorted = [...tableData].sort((a, b) => {
				if (a[sortField] === null) return 1;
				if (b[sortField] === null) return -1;
				if (a[sortField] === null && b[sortField] === null) return 0;
				return (
					a[sortField]
						.toString()
						.localeCompare(b[sortField].toString(), "en", {
							numeric: true,
						}) * (sortOrder === "asc" ? 1 : -1)
				);
			});
			setTableData(sorted);
		}
	};

	return [tableData, handleSorting];
};
