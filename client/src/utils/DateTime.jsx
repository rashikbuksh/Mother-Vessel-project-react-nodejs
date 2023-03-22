export default function DateTime({ date, isdate = true, isTime = true }) {
    return (
        <div className="items-left flex flex-col space-y-1">
            {isdate && (
                <span className="rounded-lg bg-green-200 bg-opacity-50 text-xs font-medium uppercase tracking-wider text-green-800">
                    {new Date(date).toLocaleString("en-US", {
                        timeZone: "Asia/Dhaka",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                    })}
                </span>
            )}
            {isTime && (
                <span className="rounded-lg bg-red-200 bg-opacity-50 text-xs font-medium uppercase tracking-wider text-red-800">
                    {new Date(date).toLocaleString("en-GB", {
                        timeZone: "Asia/Dhaka",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </span>
            )}
        </div>
    );
}
