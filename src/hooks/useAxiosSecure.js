import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL
})

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // 1. intercept request (client --------> server)
        axiosSecure.interceptors.request.use(config => {
            const token = `Bearer ${localStorage.getItem('access-token')}`
            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        })


        // 2. intercept response (client <-------- server)
        axiosSecure.interceptors.response.use(response => response,
            async error => {
                if (
                    (error.response && error.response.status === 401 || error.response.status === 403)
                ) {
                    await logOut();
                    navigate('/login')
                }
                return Promise.reject(error);
            }
        )
    }, [logOut, navigate, axiosSecure]) 

    return axiosSecure //TODO: have to fix redirect
};

export default useAxiosSecure;