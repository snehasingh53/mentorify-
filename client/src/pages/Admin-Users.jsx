import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { authorizationToken } = useAuth();

    const getAllUsersData = async () => {
        try {
            const response = await fetch("http://localhost:5010/api/admin/users", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Fetched users data:', JSON.stringify(data, null, 2));

            let usersArray = [];

            if (Array.isArray(data)) {
                usersArray = data;
            } else if (data && data.users && Array.isArray(data.users)) {
                usersArray = data.users;
            } else if (data && data.userData && Array.isArray(data.userData)) {
                usersArray = data.userData;
            } else if (data && data.userData) {
                usersArray = [data.userData];
            } else {
                console.error('Unexpected data format:', data);
            }
    
            setUsers(usersArray);
        } catch (error) {
            console.error('Error fetching users data:', error);
        }
    }

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5010/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
             getAllUsersData();
            }

            const data = await response.json();
            console.log(`User deleted:`, data);

            // Optionally, refetch users after delete
            getAllUsersData();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    useEffect(() => {
        getAllUsersData();
    }, [authorizationToken]);

    return (
        <>
            <section className="admin-users-section">
                <div className="container">
                    <h1>Admin Users Data</h1>
                </div>
                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((curUser) => (
                                    <tr key={curUser._id}>
                                        <td>{curUser.username || 'N/A'}</td>
                                        <td>{curUser.email || 'N/A'}</td>
                                        <td>{curUser.phone || 'N/A'}</td>
                                        <td>
                                        <Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link>
                                            </td>
                                        <td><button className="delete-button" onClick={() => deleteUser(curUser._id)}>Delete</button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};
