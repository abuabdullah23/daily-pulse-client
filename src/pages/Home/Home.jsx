import Pricing from "../../components/Pricing/Pricing";
import Banner from "./Banner/Banner";
import GetOurUpdates from "./GetOurUpdates/GetOurUpdates";
import Publishers from "./Publishers/Publishers";

const Home = () => {
    return (
        <div>
            <Banner />
            <Publishers />
            <Pricing />

            <GetOurUpdates />
        </div>
    );
};

export default Home;