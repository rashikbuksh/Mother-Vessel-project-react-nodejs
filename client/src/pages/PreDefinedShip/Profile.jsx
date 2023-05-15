import React from "react";
import PdfView from "./PdfView";

export default function Profile() {
    const StaffData = [
        {
            id: 2,
            name: "John Doe",
            nid: "S654321",
        },
        {
            id: 3,
            name: "John Doe",
            nid: "S654321",
        },
        {
            id: 4,
            name: "John Doe",
            nid: "S65432dfgdf1",
        },
    ];
    return (
        <div className="flex flex-col">
            <div className="mx-2 mt-2 mb-2 flex ">
                <div className="w-1/3 rounded-md bg-green-800 px-12 py-52">
                    <h1 className="text-6xl font-extrabold text-red-600 ">
                        LV-002
                    </h1>
                    <p className="text-normal font-medium text-white md:text-3xl">
                        800 M. Tons
                    </p>
                    <p className="text-normal font-medium text-white md:text-3xl">
                        Leased: 0
                    </p>
                    <p className="text-normal font-medium text-white md:text-3xl">
                        Status: 0
                    </p>
                </div>
                <div id="col-2" className="w-2/3 px-3">
                    <div
                        id="cards"
                        className="flex flex-col rounded-lg bg-white py-5 px-6 shadow-xl md:py-8 md:px-8 "
                    >
                        <div className="flex items-center justify-center rounded-full bg-green-800 p-2 text-2xl font-semibold text-white">
                            Master Information
                        </div>
                        <p className="pl-4 pt-1 text-base font-semibold  md:pt-4 md:text-2xl">
                            Name: Jane Smith
                        </p>
                        <p className="pl-4 pt-1 text-base font-semibold  md:pt-4 md:text-2xl">
                            Reg Num: "M123"
                        </p>
                        <p className="pl-4 pt-1 text-base font-semibold  md:pt-4 md:text-2xl">
                            Contact Number: "9876543210"
                        </p>
                        <p className="mt-2 pl-4 pt-1 font-semibold md:text-2xl">
                            National ID Card
                            <img
                                src="https://source.unsplash.com/random/1600x900?apple"
                                alt="nid_image2.jpg"
                                className="h-2/3 w-2/3 rounded-lg object-contain"
                            />
                        </p>
                    </div>
                    <div
                        id="cards"
                        className="flex flex-col rounded-lg bg-white py-5 px-6 shadow-xl md:py-8 md:px-8 "
                    >
                        <div className="flex items-center justify-center rounded-full bg-green-800 p-2 text-2xl font-semibold text-white">
                            Staff Information
                        </div>
                        <ul
                            role="list"
                            className="divide-y divide-slate-200 p-6"
                        >
                            {StaffData.map(({ name, nid }, idx) => (
                                <li
                                    key={idx}
                                    className="flex py-4 first:pt-0 last:pb-0"
                                >
                                    <span className="text-md flex flex-shrink-0 items-center justify-center rounded-md bg-green-800 px-4 font-medium text-white">
                                        {idx + 1}
                                    </span>
                                    <div className="ml-3 overflow-hidden">
                                        <p className="text-md font-medium text-slate-900">
                                            {name}
                                        </p>
                                        <p className="text-md truncate text-slate-500">
                                            {nid}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mx-2 mt-2 mb-2 flex ">
                <div className="w-1/3 rounded-md bg-green-800 px-12 py-52">
                    <h1 className="text-6xl font-extrabold text-red-600 ">
                        XYZ Corporation XYZgfd gdf
                    </h1>
                    <p className="text-normal my-2 flex items-center space-x-2 font-medium text-white md:text-3xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M5.85 17.1q1.275-.975 2.85-1.538T12 15q1.725 0 3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4Q8.675 4 6.337 6.337T4 12q0 1.475.488 2.775T5.85 17.1ZM12 13q-1.475 0-2.488-1.012T8.5 9.5q0-1.475 1.012-2.488T12 6q1.475 0 2.488 1.012T15.5 9.5q0 1.475-1.012 2.488T12 13Zm0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q1.325 0 2.5-.388t2.15-1.112q-.975-.725-2.15-1.113T12 17q-1.325 0-2.5.388T7.35 18.5q.975.725 2.15 1.113T12 20Zm0-9q.65 0 1.075-.425T13.5 9.5q0-.65-.425-1.075T12 8q-.65 0-1.075.425T10.5 9.5q0 .65.425 1.075T12 11Zm0-1.5Zm0 9Z"
                            ></path>
                        </svg>
                        <span>Bob Johnson</span>
                    </p>
                    <p className="text-normal my-2 flex items-center space-x-2 font-medium text-white md:text-3xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M19.95 21q-3.225 0-6.287-1.438t-5.425-3.8q-2.363-2.362-3.8-5.425T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.225t.325.575l.65 3.5q.05.35-.013.638T9.4 8.45L7 10.9q1.05 1.8 2.625 3.375T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.075.575.338T21 15.9v4.05q0 .45-.3.75t-.75.3Z"
                            ></path>
                        </svg>

                        <span>01876543210</span>
                    </p>
                    <p className="text-normal my-2 flex items-center space-x-2 font-medium text-white md:text-3xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M12 12q.825 0 1.413-.588T14 10q0-.825-.588-1.413T12 8q-.825 0-1.413.588T10 10q0 .825.588 1.413T12 12Zm0 9.625q-.2 0-.4-.075t-.35-.2Q7.6 18.125 5.8 15.362T4 10.2q0-3.75 2.413-5.975T12 2q3.175 0 5.588 2.225T20 10.2q0 2.4-1.8 5.163t-5.45 5.987q-.15.125-.35.2t-.4.075Z"
                            ></path>
                        </svg>

                        <span>456 Elm Street</span>
                    </p>
                    <p className="text-normal my-2 flex items-center space-x-2 font-medium text-white md:text-3xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M5 17v-7h2v7H5Zm6 0v-7h2v7h-2Zm-9 4v-2h20v2H2Zm15-4v-7h2v7h-2ZM2 8V6l10-5l10 5v2H2Z"
                            ></path>
                        </svg>

                        <span>1234567890</span>
                    </p>
                </div>
                <div id="col-2" className="w-2/3 px-3">
                    <div
                        id="cards"
                        className="flex flex-col rounded-lg bg-white py-5 px-6 shadow-xl md:py-8 md:px-8 "
                    >
                        <div className="flex items-center justify-center rounded-full bg-green-800 p-2 text-2xl font-semibold text-white">
                            Documents Attachment
                        </div>
                        <PdfView
                            pdf={"http://africau.edu/images/default/sample.pdf"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
