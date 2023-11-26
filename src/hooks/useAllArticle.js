import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAllArticle = ({pageNumber}) => {
    const axiosSecure = useAxiosSecure();

    console.log(pageNumber);

    // get all users
    const { data: allArticle = [], refetch } = useQuery({
        queryKey: ['allArticle'],
        queryFn: async () => {
            const res = await axiosSecure.get('/get-all-article')
            // console.log(res.data);
            return res.data;
        }
    })
    return [allArticle, refetch];
};

export default useAllArticle;