import Axios from "axios";
import { sha256, sha224 } from "js-sha256";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

export default function AddUser() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit in front");
        Axios.post(
            "http://localhost:3001/user/register",
            {
                name: e.target.name.value,
                username: e.target.username.value,
                password: sha256(e.target.password.value),
                position: e.target.position.value,
                department: e.target.department.value,
            },
            navigate("/adminpanel")
        );
    };

    return (
        <div>
            <div className="mx-auto my-10 w-full max-w-lg rounded-lg bg-white p-8 shadow-lg md:p-12">
                <h2 className="mb-8 text-center text-2xl font-bold">
                    Add User
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <input
                            name="name"
                            type="text"
                            className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                            id="name"
                            placeholder="Name"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            name="username"
                            type="text"
                            className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                            id="username"
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            name="password"
                            type="password"
                            className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                            id="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            name="position"
                            type="text"
                            className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                            id="position"
                            placeholder="Position"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            name="department"
                            type="text"
                            className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                            id="department"
                            placeholder="Department"
                        />
                    </div>
                    <div className="text-center lg:text-left">
                        <button
                            type="submit"
                            className="inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                        >
                            Add
                        </button>
                    </div>
                    <div className="text-center lg:text-left">
                        <p className="mt-2 mb-0 pt-1 text-sm font-semibold">
                            Admin Panel &nbsp;
                            <a
                                href="/adminpanel"
                                className="text-red-600 transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700"
                            >
                                Click Here
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
