import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    withCredentials: true
})

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        console.log(error.response);
        if (error.response.status === 401 || error.response.status === 403) {
            logOut()
                .then(() => {
                    toast.error('Logged Out! You try to unauthorized access');
                    navigate('/login')
                })
                .catch(error => {
                    toast.error(error.message);
                })
        }
    })
    return axiosSecure;
};

export default useAxiosSecure;