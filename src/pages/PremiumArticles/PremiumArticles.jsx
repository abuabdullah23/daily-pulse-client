import React from 'react';
import { Link } from 'react-router-dom';
import useGetPremiumArticles from '../../hooks/premium/useGetPremiumArticles';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const PremiumArticles = () => {
    const { premiumArticles, refetch, isLoading } = useGetPremiumArticles();

    return (
        <div className='pb-8'>
            {isLoading ? <LoadingSpinner /> : <>
                <SectionTitle sectionTitle={'Premium Articles'} />

                <div className='grid grid-cols-1 gap-5'>
                    {
                        premiumArticles?.map((pA) => (
                            <div key={pA?._id} 
                            className='flex flex-col lg:flex-row lg:items-start gap-3 lg:gap-5 mt-5 group border-b border-slate-300 dark:border-slate-600'>
                                <div className='lg:w-1/4 w-full h-48 md:h-56 lg:h-52'>
                                    <img title={`${pA?.views} views`} className='w-full h-full rounded-sm object-cover hover:scale-[103%] transition-all duration-300' src={pA?.image} alt="Product image" />
                                </div>

                                <div className='lg:w-3/4 w-full flex flex-col gap-3'>
                                    <h2 className='text-2xl font-semibold text-slate-600 dark:text-gray-300'>{pA?.title}</h2>

                                    {/* Publisher info */}
                                    <div title={pA?.publisher?.name} className='flex items-center gap-2'>
                                        <img className='p-1 py-1 rounded-sm h-10 bg-gray-50' src={pA?.publisher?.image} alt="publisher icon" />
                                        <div className='flex flex-col'>
                                            <h2 className='text-xs font-light dark:text-gray-200'>Publisher:</h2>
                                            <h2 className='text-base font-light dark:text-gray-200'>{pA?.publisher?.name}</h2>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-2'>
                                        <span className='leading-loose text-base'> <strong>Description:</strong> {pA?.description.slice(0, 300)}... <>  <Link to={`/premium-article-details/${pA?._id}`} className='rounded border-l-4 hover:border-[#203c79] dark:hover:border-[#1835b4] py-0.5 px-2 bg-[#203c79] font-semibold w-fit hover:bg-transparent text-white hover:text-slate-700 dark:hover:text-[#fca311] transition-all duration-500'>
                                           view details
                                        </Link></> </span>


                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </>
            }
        </div>
    );
};

export default PremiumArticles;