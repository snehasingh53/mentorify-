import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Logout = () => {
    const { logoutUser } = useAuth();

    useEffect(() => {
        logoutUser(); // Ensure the function name matches
    }, [logoutUser]);

    return <Navigate to="/login" />;
};
