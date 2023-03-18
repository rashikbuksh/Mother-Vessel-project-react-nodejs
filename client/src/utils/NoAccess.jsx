import React from "react";

export default function NoAccess() {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-100 text-center">
            <div className="rounded-lg bg-white p-10 shadow-lg">
                <h1 className="text-2xl font-semibold">No Access</h1>
                <p className="text-gray-500">
                    You do not have access to this page
                </p>

                <div className="mt-4 flex items-center justify-center">
                    <button
                        className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
