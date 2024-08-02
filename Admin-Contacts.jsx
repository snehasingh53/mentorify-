import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
    const [contactData, setContactData] = useState([]);
    const { authorizationToken } = useAuth();

    // Function to get contact data
    const getContactData = async () => {
        try {
            const response = await fetch("http://localhost:5010/api/admin/contacts", {
                method: "GET",
                headers: {
                    "Authorization": authorizationToken,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch contact data: ${response.statusText}`);
            }

            const data = await response.json();
            setContactData(data);
        } catch (error) {
            console.error("Error fetching contact data:", error);
            toast.error(`Failed to fetch contact data: ${error.message}`);
        }
    };

    // Function to delete a contact by ID
    const deleteContactById = async (id) => {
        try {
            const response = await fetch(`http://localhost:5010/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": authorizationToken,
                },
            });

            if (response.ok) {
                toast.success("Deleted successfully");
                // Refresh contact data after deletion
                getContactData();
            } else {
                toast.error("Couldn't delete contact");
            }
        } catch (error) {
            console.error("Error deleting contact:", error);
            toast.error(`Failed to delete contact: ${error.message}`);
        }
    };

    useEffect(() => {
        getContactData(); // Correct function name
    }, []);

    return (
        <>
            <section className="admin-contacts-section">
                <h1>Admin Contact Data</h1>
                <div className="container admin-users">
                    {contactData.map((curContactData) => {
                        const { username, email, message, _id } = curContactData;
                        return (
                            <div key={_id} className="contact-item">
                                <p>Username: {username}</p>
                                <p>Email: {email}</p>
                                <p>Message: {message}</p>
                                <button className="btn" onClick={() => deleteContactById(_id)}>Delete</button>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
};
