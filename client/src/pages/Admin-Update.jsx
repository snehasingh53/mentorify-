import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const params = useParams();
  console.log("Params Single user:", params);
  const { authorizationToken } = useAuth();

  const getSingleUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5010/api/admin/users/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();
      console.log(`Users single data: ${data}`);
      setData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(`Failed to fetch user data: ${error.message}`);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, [params.id, authorizationToken]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5010/api/admin/users/update/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update user data");

      toast.success("Updated successfully");
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error(`Failed to update user data: ${error.message}`);
    }
  };

  return (
    <section>
      <div className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Update User Data</h1>
          <div className="container grid grid-two-cols">
            <section className="section-form">
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
                    value={data.username}
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
                    value={data.email}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="phone">Mobile</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter your phone"
                    id="phone"
                    required
                    autoComplete="off"
                    value={data.phone}
                    onChange={handleInput}
                  />
                </div>
                <button type="submit" className="btn btn-submit">Update</button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};
