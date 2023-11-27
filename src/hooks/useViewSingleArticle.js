import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useViewSingleArticle = (id) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // get single article for all user : with out user and author 
    const { data: singleArticle = [], refetch, isLoading } = useQuery({
        queryKey: ['singleArticle', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-single-article/${id}?email=${user?.email}`)
            // console.log(res.data);
            return res.data;
        },
        retry: 10
    })

    return { singleArticle, refetch, isLoading };
};

export default useViewSingleArticle;