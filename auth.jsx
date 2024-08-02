import { createContext, useContext, useEffect, useState } from "react";

// Create the Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null); // Initialize with null to match the logoutUser function
    const [services, setServices] = useState([true]);
   const [loading, setLoading] = useState(true);
  const authorizationToken = `Bearer ${token}`;


    const storeTokenInLS = (serverToken) => {
        localStorage.setItem("token", serverToken);
        setToken(serverToken);
    };

    const logoutUser = () => {
        setToken(null);
        localStorage.removeItem("token");
        setUser(null);
        setServices([]); 
    };

    // JWT authentication to get currently logged in user data
    const userAuthentication = async () => {
        if (!token) return;

        try {
            setLoading(true);
            const response = await fetch("http://localhost:5010/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("user data", data.userData);
                setUser(data.userData);
                setLoading(false);
            } else {
                console.error("Failed to fetch user data", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

    // Fetch services from the database
    const getServices = async () => {
        try {
            const response = await fetch("http://localhost:5010/api/data/service", {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                
                console.log( data);
                setServices(data);
                } else {
                console.error("Failed to fetch services data", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching services data", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([userAuthentication(), getServices()]);
            setLoading(false);
        };

        fetchData();
    }, [token]); // Dependency on token ensures updates when the token changes

    const isLoggedIn = !!token;

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, logoutUser, user, services, loading ,authorizationToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContextValue;
};
 