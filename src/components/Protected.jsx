import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useGotoDashQuery, useLogoutMutation } from "../redux/authApi";
import io from "socket.io-client";

const Protected = ({ compo }) => {
    const { user } = useSelector((state) => state.auth);
    const [logout] = useLogoutMutation();
    const { error } = useGotoDashQuery()

    useEffect(() => {
        if (error && error.status == 431 || 401) {
            logout()
        }
    }, [error])


    return user ? compo : <Navigate to="/login" />;
};

export default Protected;
