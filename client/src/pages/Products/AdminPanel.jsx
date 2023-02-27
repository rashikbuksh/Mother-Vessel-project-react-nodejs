import React from "react";
import { format } from "date-fns";
import { Link, Navigate, useNavigate } from "react-router-dom";

const UserInformation = [
    {
        id: "1",
        name: "fahim",
        username: "fahim123",
        password: "safa",
        position: "staff",
        department: "sales",
        created_on: "2022-05-17T03:24:00",
    },
];

export default function AdminPanel(){
    const navigate = useNavigate();
    const redirectToAddUser = () => {
        navigate("/adduser");
    };
    const enable_disable_user = () => {
        alert("User has been enabled/disabled");
    };
    const changePassword = () => {
        alert("Password has been changed");
    };
    const resetPassword = () => {
        alert("Password has been reset");
    };
    return (
        <div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={redirectToAddUser}>Add User</button>
            <div className="flex-1 rounded-sm border border-gray-200 bg-white px-4 pt-3 pb-4">
            <strong className="font-medium text-gray-700">Users</strong>
            <div className="mt-3 rounded-sm border-x border-gray-200">
                <table className="w-full text-gray-700" style={{ textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Position</th>
                            <th>Department</th>
                            <th>Created On</th>
                            <th>Change Password</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {UserInformation.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <Link to={`${user.id}`}>
                                        {user.id}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`${user.name}`}>
                                        {user.name}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`${user.username}`}>
                                        {user.username}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`${user.password}`}>
                                        {user.password}
                                    </Link>
                                </td>
                                <td>{user.position}</td>
                                <td>{user.department}</td>
                                <td>
                                    {format(
                                        new Date(user.created_on),
                                        "dd MMM yyyy"
                                    )}
                                </td>
                                <td><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={changePassword}>Change</button></td>
                                <td><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={resetPassword}>Reset Password</button></td>
                                <td><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={enable_disable_user}>enable/disable</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}