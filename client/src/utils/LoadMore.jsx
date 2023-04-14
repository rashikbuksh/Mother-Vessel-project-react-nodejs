import React from "react";

export default function LoadMore({ ...rest }) {
    return (
        <div className="mt-4 flex items-center justify-center divide-x">
            <button
                className="text-md flex flex-row items-center justify-center space-x-2 rounded-full bg-green-600 px-6 py-2 font-semibold text-white transition duration-500 ease-in-out hover:bg-green-400"
                {...rest}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                </svg>
                <span>Load More</span>
            </button>
        </div>
    );
}
