import Axios from "axios";
import { sha256, sha224 } from "js-sha256";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Loader from "../../utils/Loader";
export default function Login() {
    const navigate = useNavigate();
    const [isInvalidEmail, setIsInvalidEmail] = React.useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = React.useState(false);
    const [isLoading, setLoading] = useState(false);

    const [user, setUser] = React.useState({
        username: "",
        password: "",
    });

    const loading = (e) => {
        setLoading(true);
    };
    if (isLoading) {
        return <Loader />;
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === "password") {
            if (value.length < 6) {
                setIsInvalidPassword(true);
            } else {
                setIsInvalidPassword(false);
            }
        }
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onSubmit = (e) => {
        loading();
        if (isInvalidEmail || isInvalidPassword) {
            e.preventDefault();
        }
        //   else if(generatedcode != verify_code){
        //     // console.log(generatedcode)
        //     // console.log(verify_code)
        //     alert('Wrong verification code')
        // }
        else {
            //console.log(user.email);
            Axios.get("http://localhost:3001/user/verify_login/", {
                params: {
                    username: user.username,
                    password: sha256(user.password),
                },
            }).then((response) => {
                setLoading(false);
                //console.log("Data"+response.data)
                if (response.data === "No user found") {
                    alert("No user found");
                } else if (response.data == "wrong password") {
                    alert("Wrong password");
                } else {
                    console.log("Logged in");
                    localStorage.setItem("loggedin", "true");
                    localStorage.setItem("user_type", "user");
                    localStorage.setItem("user", response.data);
                    console.log("Data: " + response.data);
                    window.location.href = "/..";
                }
            });
        }
    };
    return (
        <div className="flex min-h-screen min-w-max flex-col justify-center bg-gray-100 py-6 sm:py-12">
            <div className="relative min-w-[40%] py-3 sm:mx-auto sm:max-w-xl">
                <div className="absolute inset-0 -skew-y-6 transform animate-pulse bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
                <div className="relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">
                                Welcome back
                            </h1>
                        </div>
                        <form
                            onSubmit={onSubmit}
                            className="divide-y divide-gray-200"
                        >
                            <div className="space-y-4 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative mb-4 flex items-center rounded-2xl border-2 py-2 px-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    <input
                                        className="w-full rounded-sm border-none border-transparent pl-2 outline-none focus:border-transparent focus:ring-0"
                                        type="text"
                                        name="username"
                                        onChange={handleInput}
                                        placeholder="Username"
                                        required
                                    />
                                </div>
                                <div className="flex items-center rounded-2xl border-2 py-2 px-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    <input
                                        className={`w-full rounded-sm border-none border-transparent pl-2 outline-none focus:border-transparent focus:ring-0 ${
                                            isInvalidPassword
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        type="password"
                                        name="password"
                                        onChange={handleInput}
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="mt-4 mb-2 block w-full rounded-2xl bg-indigo-600 py-2 font-semibold text-white"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
