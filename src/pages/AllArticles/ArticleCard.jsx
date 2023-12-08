import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdWorkspacePremium } from 'react-icons/md';
import usePremiumUser from '../../hooks/premium/usePremiumUser';
import useAdmin from '../../hooks/useAdmin';

const ArticleCard = ({ article }) => {
    const { _id, image, title, views, publisher, description, isPremium } = article;
    const [isPremiumUser] = usePremiumUser();
    const [isAdmin] = useAdmin();
    const navigate = useNavigate();

    // navigate to details page
    const handleNavigateDetailsPage = (id) => {
        if (isPremium === true) {
            navigate(`/premium-article-details/${id}`)
        } else {
            navigate(`/approved-article-details/${id}`)
        }
    }

    return (
        <div className={`flex flex-col gap-2 lg:gap-5 mt-5 group rounded-md relative ${isPremium === true ? 'border-2 border-green-500' : 'border-2 border-slate-400'}`}>
            <div className='w-full h-48 md:h-56 lg:h-[240px] transition-all duration-300'>
                <img title={`${views} views`} className='w-full h-full rounded-t-md object-cover' src={image} alt="Product image" />
            </div>

            {
                isPremium === true && <span className='py-[2px] px-1 w-fit text-base bg-green-600 shadow-md shadow-green-700/50 text-white rounded-xs flex items-center gap-1 absolute right-2 top-2'>
                    <MdWorkspacePremium className='h-[16px] w-[16px]' />
                    <span>Premium Article</span>
                </span>
            }

            <div className={`w-full flex flex-col gap-3 ${isPremium === true ? 'pb-2 px-4' : 'pb-2 px-4'}`}>
                <h2 className='text-2xl font-semibold text-slate-600 dark:text-gray-300'>{title}</h2>

                {/* Publisher info */}
                <div title={publisher?.name} className='flex items-center gap-2'>
                    <img className='p-1 py-1 rounded-sm h-10 bg-gray-50' src={publisher?.image} alt="publisher icon" />
                    <div className='flex flex-col'>
                        <h2 className='text-xs font-light dark:text-gray-200'>Publisher:</h2>
                        <h2 className='text-base font-light dark:text-gray-200'>{publisher?.name}</h2>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <span className='leading-loose text-base'> <strong>Description:</strong> {description.slice(0, 110)}... <>
                        <button
                            disabled={!isAdmin && (!isPremiumUser && isPremium === true)}
                            onClick={() => handleNavigateDetailsPage(_id)} className='rounded border-l-4 border-slate-400 hover:border-[#203c79] dark:hover:border-[#1835b4] px-2 bg-[#203c79] font-semibold w-fit hover:bg-transparent text-white hover:text-slate-700 dark:hover:text-[#fca311] transition-all duration-500'>
                            view details
                        </button>
                    </> </span>
                </div>

                <div className='flex items-center gap-1 w-fit py-[2px] px-[6px] bg-[#fca311] rounded-[2px] text-[#152444] text-base'>
                    <div>
                        <p>{views}</p>
                    </div>
                    <div>
                        <span className='font-normal'>views</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;