import Pricing from "../../components/Pricing/Pricing";
import Banner from "./Banner/Banner";
import GetOurUpdates from "./GetOurUpdates/GetOurUpdates";

const Home = () => {
    return (
        <div>
            <Banner />

            <Pricing />

            <GetOurUpdates />
        </div>
    );
};

export default Home;