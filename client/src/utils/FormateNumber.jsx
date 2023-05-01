const numberColor = {
    "015": "bg-green-200 text-green-800",
    "018": "bg-red-200 text-red-800",
    "016": "bg-red-200 text-red-800",
    "017": "bg-blue-200 text-blue-800",
    "013": "bg-blue-200 text-blue-800",
    "019": "bg-orange-200 text-orange-800",
};

export default function FormateNumber({ number }) {
    return (
        <span
            className={`rounded-lg bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider ${
                numberColor[number.slice(0, 3)]
            } ${
                number.length !== 11 && "bg-gray-200 text-gray-800 line-through"
            } `}
        >
            {number.toString().replace(/\B(?=(\d{6})+(?!\d))/g, "-")}
        </span>
    );
}
