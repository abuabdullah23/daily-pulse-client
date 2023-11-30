import { MdArticle, MdWorkspacePremium } from "react-icons/md";
import { TbProgress } from "react-icons/tb";
import { GoCheckCircleFill } from "react-icons/go";
import useCountAllArticle from "../../../../hooks/adminHooks/useCountArticles";

const ArticleStatistics = () => {
    const { countArticles, refetch, isLoading } = useCountAllArticle();

    return (
        <div>
            {/* Total Overview */}
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7'>

                {/* Total article */}
                <div className='flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#d0d2d6]'>
                        <h2 className='text-3xl font-bold'>{countArticles?.totalArticle}</h2>
                        <span>Total article</span>
                    </div>
                    <div className='w-[46px] h-[46px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl'>
                        <MdArticle className='text-[#28c76f] shadow-lg font-semibold' />
                    </div>
                </div>

                {/* Total Pending Article */}
                <div className='flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#d0d2d6]'>
                        <h2 className='text-3xl font-bold'>{countArticles?.totalPending}</h2>
                        <span>Pending Article</span>
                    </div>
                    <div className='w-[46px] h-[46px] rounded-full bg-[#e000e81f] flex justify-center items-center text-xl'>
                        <TbProgress className='text-[#cd00d8] shadow-lg font-semibold' />
                    </div>
                </div>

                {/* Total approved article */}
                <div className='flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#d0d2d6]'>
                        <h2 className='text-3xl font-bold'>{countArticles?.totalApproved}</h2>
                        <span>Approved article</span>
                    </div>
                    <div className='w-[46px] h-[46px] rounded-full bg-[#7367f01f] flex justify-center items-center text-xl'>
                        <GoCheckCircleFill className='text-[#7367f0] shadow-lg font-semibold' />
                    </div>
                </div>

                {/* Total Premium article */}
                <div className='flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#d0d2d6]'>
                        <h2 className='text-3xl font-bold'>{countArticles?.totalPremium}</h2>
                        <span>Premium article</span>
                    </div>
                    <div className='w-[46px] h-[46px] rounded-full bg-[#00cfe81f] flex justify-center items-center text-xl'>
                        <MdWorkspacePremium className='text-[#00cfe8] shadow-lg font-semibold' />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ArticleStatistics;