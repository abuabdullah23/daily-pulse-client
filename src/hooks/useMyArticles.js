import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useMyArticles = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();


    // get all article
    const { data: myAllArticle = [], refetch, isLoading } = useQuery({
        queryKey: ['myAllArticle'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-my-article/${user?.email}`)
            // console.log(res.data.result);
            return res.data.result;
        },
        retry: 10
    })

    return { myAllArticle, refetch, isLoading };
};

export default useMyArticles;