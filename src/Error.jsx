import notFoundPage from "../src/assets/images/lottie/404 animation.json";
import { Link } from "react-router-dom";
import { BiSolidHomeCircle } from "react-icons/bi";
import LottieComp from "./components/LottieCom/LottieComp";
import { FaHome } from "react-icons/fa";

const Error = () => {
    return (
        <div className='w-full'>
            <div>
                <div className="flex flex-col items-center gap-3">
                    <LottieComp Animation={notFoundPage} />
                    <Link to='/' className="w-fit py-2 px-6 rounded bg-orange-500 text-[var(--body)] hover:bg-orange-400 flex items-center gap-2 text-xl">
                        <span>Back to Home</span>
                        <span><FaHome /></span></Link>
                </div>
            </div>

        </div>
    );
};

export default Error;