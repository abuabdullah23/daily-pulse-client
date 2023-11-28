import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useAxiosSecure from "../useAxiosSecure";

const usePremiumUser = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isPremiumUser, isLoading: isPremiumUserLoading } = useQuery({
        queryKey: ['isPremiumUser', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/check-premium-user/${user?.email}`);
            // console.log(res.data);
            return res.data.isPremiumUser;
        }
    })
    return [isPremiumUser, isPremiumUserLoading]
}
export default usePremiumUser;