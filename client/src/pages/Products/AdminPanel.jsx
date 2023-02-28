import React, {useEffect, useState} from "react";
import { format } from "date-fns";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { sha256, sha224 } from 'js-sha256';


export default function AdminPanel(){
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userList, setUserList] = useState([]);

    const [newName, setNewName] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPosition, setNewPosition] = useState('');
    const [newDepartment, setNewDepartment] = useState('');
    

    useEffect(() => {
        if(localStorage.getItem('user_type') == 'admin'){
            
        }
        else if(localStorage.getItem('user_type') == 'Manager'){
            window.location.href = "/";
        }
        else{
            window.location.href = "/login";
        }
    }, []);

    useEffect(() => {
        fetch("http://localhost:3001/admin/getusers")
        .then((res) => res.json())
        .then((data) => {
            setUserList(data);
        });
    }, [userList]);

    const logout = () => {
        localStorage.setItem('loggedin', 'false');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_type');
        window.location.href = "/login";
    };

    const updateInfo = (name, userid, username, position, department) => {
        console.log(userid);
        console.log(newName);
        console.log(newUsername);
        console.log(newPosition);
        console.log(newDepartment);

        console.log(name);
        console.log(username);
        console.log(position);
        console.log(department);

        if(newName == ''){
            setNewName(name);
        }
        if(newUsername == ''){
            setNewUsername(username);
        }
        if(newPosition == ''){
            setNewPosition(position);
        }
        if(newDepartment == ''){
            setNewDepartment(department);
        }

        Axios.post(
            'http://localhost:3001/admin/updateinfo/',
            {
                user_id: userid,
                new_name: newName,
                new_username: newUsername,
                new_position: newPosition,
                new_department: newDepartment,
            });
            alert("Info has been updated");
    };


    const redirectToAddUser = () => {
        navigate("/adduser");
    };
    const enable_user = (userid) => {
        
        Axios.post(
            'http://localhost:3001/admin/enableuser/',
            {
              user_id: userid,
            });
    };
    const disable_user = (userid) => {
        
        Axios.post(
            'http://localhost:3001/admin/disableuser/',
            {
              user_id: userid,
            });
    };
    const resetPassword = (userid) => {
        console.log(userid);
        console.log(newPassword);
        console.log(confirmPassword);
        if(newPassword == confirmPassword){
            Axios.post(
                'http://localhost:3001/admin/resetpassword/',
                {
                    user_id: userid,
                    new_password: sha256(newPassword),
                });
                alert("Password has been reset");
        }
        else{
            alert("Passwords do not match");
        }
    };
    return (
        <div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={redirectToAddUser}>Add User</button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
            
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
                                <td>
                                <Popup
                                    trigger={<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">ChangeInfo</button>}
                                    modal
                                    nested
                                >
                                    
                                    {close => (
                                    <div className="modal">
                                        <button className="close" onClick={close}>
                                        &times;
                                        </button>
                                        <div className="content">
                                        <div>
                                        
                                            <input type="text" placeholder="New Name" onChange={(e)=>{setNewName(e.target.value)}} defaultValue={user.name}/>
                                            <input type="text" placeholder="New Username" onChange={(e)=>{setNewUsername(e.target.value)}} defaultValue={user.username}/>
                                            <input type="text" placeholder="New Position" onChange={(e)=>{setNewPosition(e.target.value)}} defaultValue={user.position}/>
                                            <input type="text" placeholder="New Department" onChange={(e)=>{setNewDepartment(e.target.value)}} defaultValue={user.department}/>
                                            
                                            <button class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{updateInfo(user.name, user.id, user.username, user.position, user.department) ; close()}}>update</button>
                                            </div>
                                        </div>
                                    </div>
                                    )}
                                </Popup>
                                </td>
                                <td>
                                
                                <Popup
                                    trigger={<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Reset Password</button>}
                                    modal
                                    nested
                                >
                                    {close => (
                                    <div className="modal">
                                        <button className="close" onClick={close}>
                                        &times;
                                        </button>
                                        <div className="content">
                                        <div>
                                            <input type="password" placeholder="New Password" onChange={(e)=>{setNewPassword(e.target.value)}}/>
                                            <input type="password" placeholder="Confirm Password" onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                                            <button class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{resetPassword(user.id) ; close()}}>Reset</button>
                                            </div>
                                        </div>
                                    </div>
                                    )}
                                </Popup>
                                </td>
                                {user.enabled === 1 ? 
                                <td><button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{disable_user(user.id)}}>Disable</button></td>
                                : <td><button class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{enable_user(user.id)}}>Enable</button></td>
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