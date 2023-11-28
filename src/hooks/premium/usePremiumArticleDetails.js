import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure';
import useAuth from '../useAuth';

const usePremiumArticleDetails = (id) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // get view approved article for all user and increase views one by one 
    const { data: viewPremiumArticle = [], refetch, isLoading } = useQuery({
        queryKey: ['viewPremiumArticle', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/view-premium-article-details/${id}?email=${user?.email}`)
            console.log(res.data);
            return res.data;
        },
        retry: 0
    })

    return { viewPremiumArticle, refetch, isLoading };
};

export default usePremiumArticleDetails;