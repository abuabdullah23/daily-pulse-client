import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure';

const useCountAllUser = () => {
    const axiosSecure = useAxiosSecure();

    // get count total article from api
    const { data: countAllUsers, refetch, isLoading } = useQuery({
        queryKey: ['countAllUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/count-users`)
            return res.data;
        },
        retry: 10
    })

    return { countAllUsers, refetch, isLoading };
};

export default useCountAllUser;