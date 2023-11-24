import Lottie from "lottie-react";

const LottieComp = ({ Animation }) => {
    return (
        <div className='w-full h-full p-4 flex items-center justify-center'>
            <Lottie className="h-full" animationData={Animation} loop={true} />
        </div>
    );
};

export default LottieComp;