import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useViewSingleArticle = (id) => {
    const axiosSecure = useAxiosSecure();

    // get single article
    const { data: singleArticle = [], refetch, isLoading } = useQuery({
        queryKey: ['singleArticle', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-single-article/${id}`)
            // console.log(res.data);
            return res.data;
        },
        retry: 10
    })

    return { singleArticle, refetch, isLoading };
};

export default useViewSingleArticle;