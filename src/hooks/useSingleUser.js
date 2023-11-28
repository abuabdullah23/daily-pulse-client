import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useSingleUser = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // get all users
    const { data: singleUser = [], refetch, isLoading } = useQuery({
        queryKey: ['singleUser', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-single-user-details/${user?.email}`)
            // console.log(res.data);
            return res.data;
        },
        retry: 10
    })
    return { singleUser, refetch, isLoading };
};

export default useSingleUser;