import { useState } from "react";

export const useSortableTable = (data, columns) => {
    // set data to state
    const [tableData, setTableData] = useState([]);
    const sortedData = [...data].sort((a, b) => {
        const filterColumn = columns.filter((column) => column.sortbyOrder);

        // Merge all array objects into single object and extract accessor and sortbyOrder keys
        let { accessor = "id", sortbyOrder = "asc" } = Object.assign(
            {},
            ...filterColumn
        );

        if (a[accessor] === null) return 1;
        if (b[accessor] === null) return -1;
        if (a[accessor] === null && b[accessor] === null) return 0;

        const ascending = a[accessor]
            ?.toString()
            .localeCompare(b[accessor].toString(), "en", {
                numeric: true,
            });

        return sortbyOrder === "asc" ? ascending : -ascending;
    });

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
