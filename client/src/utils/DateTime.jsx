export default function DateTime({ date }) {
    return (
        <div className="items-left flex flex-col space-y-1">
            <span className="rounded-lg bg-green-200 bg-opacity-50 text-xs font-medium uppercase tracking-wider text-green-800">
                {new Date(date).toLocaleString("en-GB", {
                    timeZone: "Asia/Dhaka",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                })}
            </span>
            <span className="rounded-lg bg-red-200 bg-opacity-50 text-xs font-medium uppercase tracking-wider text-red-800">
                {new Date(date).toLocaleString("en-GB", {
                    timeZone: "Asia/Dhaka",
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                })}
            </span>
        </div>
    );
}
