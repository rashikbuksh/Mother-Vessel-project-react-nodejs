import Axios from "axios";
import { sha256 } from "js-sha256";
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from "react";
import Loader from "../../utils/Loader";
import shipLogo from "../../assets/img/shipLogo.svg";

import { useNavigate } from "react-router-dom";
import { warning, generatedToast } from "./../../components/Toast/index";
import { DefineRole } from "../../hooks/routes";

const redirect = {
	admin: "/admin-panel",
	operations: "/record-entry",
	accounts: "/job-entry",
	"accounts-manager": "/chq-due-list",
};

const generateToken = (length) => {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
        counter += 1;
    }
    return result;
};

export default function Login() {
    const { original_role } = DefineRole();
    const navigate = useNavigate();
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [cookies, setCookies, removeCookie] = useCookies();
    const [token, setToken] = useState("");
    const [substitutions, setSubstitutions] = useState(0);

    useEffect(() => {
        if (cookies.token == null) {
            setCookies("token", "undefined");
            navigate("/login");
        } else if (cookies.token != "undefined") {
            navigate(redirect[original_role]);
        }
        setToken(generateToken(20));
        setSubstitutions(Math.floor(Math.random() * 26));
    }, []);

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    if (isLoading) {
        return <Loader />;
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === "password") {
            if (value.length < 2) {
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
        setLoading(true);
        if (isInvalidEmail || isInvalidPassword) {
            e.preventDefault();
            warning("Please enter valid credentials");
        } else {
            Axios.get(`${process.env.REACT_APP_API_URL}/user/verify_login/`, {
                params: {
                    username: user.username,
                    password: sha256(user.password),
                },
            }).then((response) => {
                setLoading(false);
                generatedToast(response);

                const { position } = response?.data;
                if (position !== "undefined") {
                    localStorage.setItem("token", token);

                    const new_ascii = [];
                    for (var i = 0; i < position?.length; i++) {
                        new_ascii.push(
                            response.data.position.codePointAt(i) -
                                substitutions
                        );
                    }
                    const new_string = String.fromCharCode(...new_ascii);

                    setCookies(
                        "token",
                        token + ":" + new_string + ":" + substitutions
                    );

                    navigate(redirect[position]);
                }
            });
        }
    };

    return (
        <div className="flex min-h-screen min-w-max flex-col justify-center bg-gray-100 py-6 sm:py-12">
            <div className="relative min-w-[40%] py-3 sm:mx-auto sm:max-w-xl">
                <div className="absolute inset-0 -skew-y-6 transform animate-pulse bg-gradient-to-r from-green-300 to-green-600 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
                <div className="relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="mx-auto">
                        <span className="font-heading flex items-center justify-center text-2xl font-bold">
                            <img
                                className="mr-1 w-12 text-white"
                                src={shipLogo}
                                alt="KEL-BD"
                            />
                            <span className="text-4xl text-green-600">
                                KEL-BD
                            </span>
                        </span>
                        <form className="divide-y divide-gray-200">
                            <div className="space-y-4 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative mb-4 flex items-center rounded-2xl border-2 py-2 px-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clipRule="evenodd"
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
                                            fillRule="evenodd"
                                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                            clipRule="evenodd"
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
                                    type="button"
                                    onClick={onSubmit}
                                    className="mt-4 mb-2 block w-full rounded-2xl bg-green-600 py-2 font-semibold text-white"
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
