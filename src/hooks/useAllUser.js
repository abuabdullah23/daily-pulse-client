import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAllUser = ({ pageNumber, perPage }) => {
    const axiosSecure = useAxiosSecure();

    // get all user count
    const { data: totalUser } = useQuery({
        queryKey: ['totalUser'],
        queryFn: async () => {
            const res = await axiosSecure.get('/get-users')
            // console.log(res.data.total);
            return res.data.total;
        }
    })

    // get all users
    const { data: allUser = [], refetch, isLoading } = useQuery({
        queryKey: ['allUser', pageNumber, perPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-users?pageNumber=${pageNumber}&perPage=${perPage}`)
            // console.log(res.data.result);
            return res.data.result;
        },
        retry: 10
    })
    return { totalUser, allUser, refetch, isLoading };
};

export default useAllUser;