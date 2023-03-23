import { useState } from "react";
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
        <thead className="rounded-md border-b-2 border-gray-400 bg-green-200">
            <tr>
                {columns.map(({ id, name, accessor, sortable, width }) => {
                    const cl = sortable
                        ? sortField === accessor && order === "asc"
                            ? "up"
                            : sortField === accessor && order === "desc"
                            ? "down"
                            : "default"
                        : "";
                    return (
                        <th
                            key={id}
                            onClick={
                                sortable
                                    ? () => handleSortingChange(accessor)
                                    : null
                            }
                            className={`border-r-2 border-gray-400 px-2 text-left text-sm font-semibold tracking-wide ${width} ${cl}`}
                        >
                            {name}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

export default TableHead;
