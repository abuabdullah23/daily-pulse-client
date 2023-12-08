import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL
})

const useAxiosSecure = () => {
    const { logOut, setLoading } = useAuth();
    const navigate = useNavigate();

    // 1. intercept request (client --------> server)
    axiosSecure.interceptors.request.use(function (config) {
        const token = `Bearer ${localStorage.getItem('access-token')}`
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    }, function (error) {
        return Promise.reject(error)
    })

    // 2. intercept response (client <-------- server)
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        // console.log('Error from interceptors:', error);
        const status = error.response.status;
        console.log(status);
        if (status === 401 || status === 403) {
            navigate('/login');
            await logOut();
            setLoading(false);
        }
        return Promise.reject(error);
    })

    return axiosSecure //Done: have to fix redirect: Change the axios secure code
};

export default useAxiosSecure;






// Another method

// useEffect(() => {
//     // 1. intercept request (client --------> server)
//     axiosSecure.interceptors.request.use(config => {
//         const token = `Bearer ${localStorage.getItem('access-token')}`
//         if (token) {
//             config.headers.Authorization = token;
//         }
//         return config;
//     })


//     // 2. intercept response (client <-------- server)
//     axiosSecure.interceptors.response.use(response => response,
//         async error => {
//             if (
//                 (error.response && error.response.status === 401 || error.response.status === 403)
//             ) {
//                 await logOut();
//                 navigate('/login')
//             }
//             return Promise.reject(error);
//         }
//     )
// }, [logOut, navigate, axiosSecure]) 