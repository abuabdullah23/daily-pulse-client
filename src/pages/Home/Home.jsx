import CountUpUser from "../../components/CountUpComp/CountUpUser";
import CurrentTimeAndNews from "../../components/CurrentTimeAndNews/CurrentTimeAndNews";
import Pricing from "../../components/Pricing/Pricing";
import Banner from "./Banner/Banner";
import GetOurUpdates from "./GetOurUpdates/GetOurUpdates";
import MostViewsArticles from "./MostViewsArticles/MostViewsArticles";
import Publishers from "./Publishers/Publishers";

const Home = () => {
    return (
        <div>
            <CurrentTimeAndNews />
            <Banner />
            <Publishers />
            <MostViewsArticles />
            <CountUpUser/>
            <Pricing />
            <GetOurUpdates />
        </div>
    );
};

export default Home;