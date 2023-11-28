import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure';

const useGetPremiumArticles = () => {
    const axiosSecure = useAxiosSecure();

    // get all article premium articles
    const { data: premiumArticles = [], refetch, isLoading } = useQuery({
        queryKey: ['premiumArticles'],
        queryFn: async () => {
            const res = await axiosSecure.get('/get-premium-articles')
            // console.log(res.data);
            return res.data;
        },
        retry: 10
    })

    return { premiumArticles, refetch, isLoading };
};

export default useGetPremiumArticles;