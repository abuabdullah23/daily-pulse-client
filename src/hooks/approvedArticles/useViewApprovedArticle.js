import { useQuery } from '@tanstack/react-query';
import useAuth from '../useAuth';
import useAxiosSecure from '../useAxiosSecure';

const useViewApprovedArticle = (id) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure(); //TODO: have to fix redirect
    // console.log(axiosSecure);

    // get view approved article for all user and increase views one by one 
    const { data: viewApprovedArticle = [], refetch, isLoading } = useQuery({
        queryKey: ['viewApprovedArticle', id],
        queryFn: async () => {
            const res = await axiosSecure?.get(`/view-approved-article-details/${id}?email=${user?.email}`)
            console.log(res.data);
            return res.data;
        },
        retry: 0
    })

    return { viewApprovedArticle, refetch, isLoading };
};

export default useViewApprovedArticle;