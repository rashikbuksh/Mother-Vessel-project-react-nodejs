const locationColor = {
    Bangladesh: "bg-green-200 text-green-800",
    India: "bg-orange-200 text-orange-800",
    USA: "bg-red-200 text-red-800",
    UK: "bg-purple-200 text-purple-800",
    "Sri Lanka": "bg-blue-200 text-blue-800",
};

export default function ColorMvLocation({ location }) {
    return (
        <span
            className={`rounded-lg bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider ${locationColor[location]} `}
        >
            {location}
        </span>
    );
}
