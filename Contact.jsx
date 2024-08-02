import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";

const defaultContactFormData = {
    username: "",
    email: "",
    message: "",
};

export const Contact = () => {
    const [contact, setContact] = useState(defaultContactFormData);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            setContact({
                username: user.username || "",
                email: user.email || "",
                message: "",
            });
        }
    }, [user]);

    const handleInput = async (e) => {
        const { name, value } = e.target;
        setContact(prevContact => ({
            ...prevContact,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch("http://localhost:5010/api/form/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setContact(defaultContactFormData);
                alert("Message sent successfully");
            } else {
                alert("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <section>
            <main>
                <div className="section-registration">
                    <div className="container-grid grid-two-cols">
                        <div className="registration-image">
                            <img 
                                src="/image/contact.jpg"  // Adjust path if needed
                                alt="Contact"
                                width="500" 
                                height="400"
                            />
                        </div>
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Contact</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input 
                                        type="text" 
                                        name="username" 
                                        placeholder="Username" 
                                        id="username" 
                                        required
                                        autoComplete="off"
                                        value={contact.username}
                                        onChange={handleInput} 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="Enter your email" 
                                        id="email" 
                                        required
                                        autoComplete="off"
                                        value={contact.email}
                                        onChange={handleInput} 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        name="message"
                                        placeholder="Your message"
                                        id="message"
                                        required
                                        autoComplete="off"
                                        value={contact.message}
                                        onChange={handleInput} 
                                    />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-submit">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
};
