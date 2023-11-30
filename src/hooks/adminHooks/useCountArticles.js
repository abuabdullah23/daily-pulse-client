import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure';

const useCountAllArticle = () => {
    const axiosSecure = useAxiosSecure();

    // get count total article from api
    const { data: countArticles, refetch, isLoading } = useQuery({
        queryKey: ['countArticles'],
        queryFn: async () => {
            const res = await axiosSecure.get('/count-articles')
            // console.log(res);
            return res.data;
        },
    })

    return { countArticles, refetch, isLoading };
};

export default useCountAllArticle;