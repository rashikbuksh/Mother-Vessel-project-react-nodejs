import React, {useEffect, useState} from "react";
import { format } from "date-fns";
import { Link, Navigate, useNavigate } from "react-router-dom";


export default function AdminPanel(){
    const navigate = useNavigate();
    const [userList, setUserList] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/admin/getusers")
        .then((res) => res.json())
        .then((data) => {
            setUserList(data);
        });
    }, []);



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
                            <th>Position</th>
                            <th>Department</th>
                            <th>Created On</th>
                            <th>Update Info</th>
                            <th>Change Password</th>
                            <th>Enable/Disable</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user) => (
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
                               
                                <td>{user.position}</td>
                                <td>{user.department}</td>
                                <td>
                                    {format(
                                        new Date(user.user_created_time),
                                        "dd MMM yyyy"
                                    )}
                                </td>
                                
                                <td><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={changePassword}>Change</button></td>
                                <td><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={resetPassword}>Reset Password</button></td>
                                {user.enabled === 1 ? 
                                <td><button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={enable_disable_user}>Disable</button></td>
                                : <td><button class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={enable_disable_user}>Enable</button></td>
                                }
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}