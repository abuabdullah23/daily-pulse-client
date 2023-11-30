import { useEffect, useState } from "react";
import CountUpUser from "../../components/CountUpComp/CountUpUser";
import CurrentTimeAndNews from "../../components/CurrentTimeAndNews/CurrentTimeAndNews";
import SubscriptionModal from "../../components/Modal/SubscriptionModal";
import Pricing from "../../components/Pricing/Pricing";
import Banner from "./Banner/Banner";
import GetOurUpdates from "./GetOurUpdates/GetOurUpdates";
import MostViewsArticles from "./MostViewsArticles/MostViewsArticles";
import Publishers from "./Publishers/Publishers";
import useAdmin from "../../hooks/useAdmin";
import usePremiumUser from "../../hooks/premium/usePremiumUser";

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin] = useAdmin();
    const [isPremiumUser] = usePremiumUser();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!isAdmin && !isPremiumUser) {
                setIsOpen(true);
            }
        }, 10000);

        return () => clearTimeout(timeoutId);
    }, [isAdmin, isPremiumUser]);


    return (
        <div>
            <CurrentTimeAndNews />
            <Banner />
            <Publishers />
            <MostViewsArticles />
            <CountUpUser />
            <Pricing />
            <GetOurUpdates />

            {(isPremiumUser || isAdmin) ? null : (
                <SubscriptionModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    closeModal={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default Home;