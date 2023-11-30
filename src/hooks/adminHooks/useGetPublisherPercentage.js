import useAxiosSecure from '../useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useGetPublisherPercentage = () => {
    const axiosSecure = useAxiosSecure();

        // get count publisherPercentage of articles from api
        const { data: publisherPercentage, refetch, isLoading } = useQuery({
            queryKey: ['publisherPercentage'],
            queryFn: async () => {
                const res = await axiosSecure.get(`/get-publisher-percentage`)
                console.log(res);
                return res.data.total;
            }
        })
    
        return { publisherPercentage, refetch, isLoading };
};

export default useGetPublisherPercentage;