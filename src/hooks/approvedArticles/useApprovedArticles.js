// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../useAxiosSecure';

// const useApprovedArticles = (pageNumber, perPage) => {
//     const axiosSecure = useAxiosSecure();

//     // get count total approved articles from api
//     const { data: totalApprovedArticle } = useQuery({
//         queryKey: ['totalApprovedArticle'],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/get-approved-articles`)
//             return res.data.total;
//         }
//     })

//     // get approved articles
//     const { data: approvedArticles = [], refetch, isLoading } = useQuery({
//         queryKey: ['approvedArticles', pageNumber, perPage],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/get-approved-articles?pageNumber=${pageNumber}&perPage=${perPage}`)
//             // console.log(res.data.result);
//             return res.data.result;
//         },
//         retry: 10
//     })

//     return { totalApprovedArticle, approvedArticles, refetch, isLoading };
// };

// export default useApprovedArticles;

// it is not used any where