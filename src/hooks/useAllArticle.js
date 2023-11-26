import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAllArticle = ({ pageNumber, perPage }) => {
    const axiosSecure = useAxiosSecure();

    // get count total article from api
    const { data: totalArticle } = useQuery({
        queryKey: ['totalArticle'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-all-article`)
            return res.data.total;
        }
    })

    // get all article
    const { data: allArticle = [], refetch, isLoading} = useQuery({
        queryKey: ['allArticle', pageNumber, perPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-all-article?pageNumber=${pageNumber}&perPage=${perPage}`)
            // console.log(res.data.result);
            return res.data.result;
        }
    })

    return { totalArticle, allArticle, refetch, isLoading };
};

export default useAllArticle;