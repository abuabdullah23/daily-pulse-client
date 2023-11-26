import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAllUser = () => {
    const axiosSecure = useAxiosSecure();

    // get all users
    const { data: allUser = [], refetch } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const res = await axiosSecure.get('/get-users')
            // console.log(res.data);
            return res.data;
        }
    })
    return [allUser, refetch];
};

export default useAllUser;