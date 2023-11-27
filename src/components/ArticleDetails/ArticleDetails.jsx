import React from 'react';
import moment from 'moment';
import { IoMdPricetag } from 'react-icons/io';
import { MdWorkspacePremium } from 'react-icons/md';

const ArticleDetails = ({ article, isLoading }) => {
    const { title, authorName, authorEmail, authorPhoto, publisher, isPremium, articleStatus, views, tags, image, description, createdAt, updatedAt } = article;

    return (
        <div className='pb-8'>
            <h2 className='text-3xl font-semibold py-8'>{title}</h2>

            <div className='flex flex-col gap-4'>
                <div className='flex justify-center'>
                    <div className='w-full h-[240px] md:h-[320px] lg:h-[460px] transition-all duration-300 rounded-md border border-slate-500'>
                        <img src={image} className='w-full h-full object-cover object-top rounded-md overflow-hidden' alt="article image" />
                    </div>
                </div>

                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2 md:gap-4'>
                        <div>
                            <img className='w-10 h-10' src={authorPhoto} alt="author photo" />
                        </div>
                        <div>
                            <h3 className='text-base font-medium'>{authorName}</h3>
                            <h3 className='text-sm'>{authorEmail}</h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-1'>
                        <div>
                            <p className='font-semibold'>{views}</p>
                        </div>
                        <div>
                            <span>views</span>
                        </div>

                    </div>
                </div>

                <div><h2 className='text-xl font-light dark:text-gray-200'>{publisher?.name}</h2></div>

                <div className='flex flex-col md:flex-row items-start md:items-center  gap-1 md:gap-3'>
                    <p className='text-sm font-medium'>Published: <span className='font-normal'>{moment(createdAt).format("D MMM YYYY, h:mm A")}</span></p>
                    <p className='text-sm font-medium'>Updated: <span className='font-normal'>{moment(updatedAt).format("D MMM YYYY, h:mm A")}</span></p>
                </div>

                <div className='flex items-center gap-2'>
                    <div className='py-1 whitespace-nowrap'>
                        <span title={articleStatus} className={`py-[2px] px-2 rounded-sm ${articleStatus === 'pending' ? 'bg-[#ffd104] text-black' : articleStatus === 'approved' ? 'bg-green-500 text-white' : 'bg-[#ff2929] text-white'}`} >{articleStatus}</span>
                    </div>
                    <div className='py-1 whitespace-nowrap text-white'>
                        {
                            isPremium === 'true' && <p title='Premium Article'
                                className='py-[2px] px-2 bg-green-500 rounded-sm flex items-center gap-1 text-[14px]'>
                                <MdWorkspacePremium className='text-base' />
                                <span>premium</span>
                            </p>
                        }
                    </div>
                </div>

                {tags &&
                    <div className='flex items-center flex-wrap gap-2'>
                        <div className='py-[2px] px-3 bg-[#ff970e] rounded-sm flex items-center gap-1 text-base font-semibold text-black w-fit'>
                            <IoMdPricetag />
                            <span>tags : </span>
                        </div>
                        <div className='flex items-center flex-wrap gap-1'>
                            {
                                tags?.map((t, i) => <p
                                    key={i}
                                    className='py-[2px] px-3 bg-indigo-600 rounded-sm flex items-center gap-1 text-base text-white w-fit'
                                >
                                    {t?.value}
                                </p>)
                            }
                        </div>
                    </div>
                }

                <div>
                    <p className='text-xl font-normal'>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetails;