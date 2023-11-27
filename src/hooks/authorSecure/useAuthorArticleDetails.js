import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure';
import useAuth from '../useAuth';

const useAuthorArticleDetails = (id) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // get single article for only author or Admin
    const { data: authorArticleDetails = [], refetch, isLoading } = useQuery({
        queryKey: ['authorArticleDetails', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/author-article-details/${id}?email=${user?.email}`,)
            // console.log(res.data);
            return res.data;
        },
        retry: 10
    })

    return { authorArticleDetails, refetch, isLoading };
};

export default useAuthorArticleDetails;