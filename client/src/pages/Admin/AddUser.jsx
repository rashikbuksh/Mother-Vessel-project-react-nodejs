import Axios from 'axios';
import { sha256, sha224 } from 'js-sha256';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';

export default function AddUser() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit in front");
        Axios.post('http://localhost:3001/user/register',
        {
            name: e.target.name.value,
            username: e.target.username.value,
            password: sha256(e.target.password.value),
            position: e.target.position.value,
            department: e.target.department.value,
        },
        navigate('/adminpanel')
        )
    };

    return (
        <div>
        <div class="rounded-lg shadow-lg bg-white w-full max-w-lg mx-auto p-8 md:p-12 my-10">
            <h2 class="text-2xl font-bold text-center mb-8">Add User</h2>
            <form onSubmit={handleSubmit}>
            <div class="mb-6">
                    <input
                        name="name"
                        type="text"
                        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="name"
                        placeholder="Name"
                    />
                </div>
                <div class="mb-6">
                    <input
                        name="username"
                        type="text"
                        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="username"
                        placeholder="Username"
                    />
                </div>
                <div class="mb-6">
                    <input
                        name="password"
                        type="password"
                        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="password"
                        placeholder="Password"
                    />
                </div>
                <div class="mb-6">
                    <input
                        name="position"
                        type="text"
                        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="position"
                        placeholder="Position"
                    />
                </div>
                <div class="mb-6">
                    <input
                        name="department"
                        type="text"
                        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="department"
                        placeholder="Department"
                    />
                </div>
                <div class="text-center lg:text-left">
                    <button 
                        type="submit"
                        class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                        Add
                    </button>
                </div>
                <div class="text-center lg:text-left">
                <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                      Admin Panel &nbsp;
                      <a
                          href="/adminpanel"
                          class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
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