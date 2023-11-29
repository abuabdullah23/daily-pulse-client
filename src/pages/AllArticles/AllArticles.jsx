import { useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ArticleCard from './ArticleCard';
import newsTags from '../AddArticle/tags';
import useAllPublisher from '../../hooks/useAllPublisher';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { IoReload } from "react-icons/io5";


const AllArticles = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const [perPage, setPerPage] = useState(10);
    const [articles, setArticles] = useState([]);
    const [totalArticle, setTotalArticle] = useState(null);
    const [allPublisher, refetch] = useAllPublisher();
    const [loading, setLoading] = useState(true);

    // for search and filter
    const [searchValue, setSearchValue] = useState('');
    const [publisherSlug, setPublisherSlug] = useState('')
    const [tagValue, setTagValue] = useState('');

    // get all approved article by normal fetch method
    const getApprovedArticles = async () => {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_API_URL}/get-approved-articles?publisherSlug=${publisherSlug}&tagValue=${tagValue}&searchValue=${searchValue ? searchValue : ''}&pageNumber=${pageNumber}&perPage=${perPage}`
        );
        const data = await response.json();
        setArticles(data?.approvedArticles?.articles);
        setTotalArticle(data?.approvedArticles?.articles?.length);
        setLoading(false);

        // console.log(data?.total);
        // setAllArticle((prev) => [...prev, ...data]);
    };

    // console.log(publisherSlug);
    // console.log(tagValue);

    useEffect(() => {
        getApprovedArticles();
    }, [pageNumber, perPage, publisherSlug, tagValue, searchValue]);


    // ================= try infinity start ==============
    // // handle infinity scroll
    // const handleInfinityScroll = async () => {
    //     try {
    //         console.log('scrollHeight' + document.documentElement.scrollHeight);
    //         console.log('innerHeight' + window.innerHeight);
    //         console.log('scrollTop' + document.documentElement.scrollTop);

    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    // useEffect(() => {
    //     window.addEventListener("scroll", handleInfinityScroll);
    //     // return () => window.removeEventListener("scroll", handleInfinityScroll);
    // }, []);

    // ================= try infinity end ==============


    return (
        <div className='pb-12'>
            <SectionTitle sectionTitle={'All Article'} />

            <div className='py-3 px-3 bg-gray-300 dark:bg-slate-900 mb-5 rounded-md flex flex-col lg:flex-row justify-between items-center lg:items-start gap-3 border dark:border-slate-500 transition-all duration-300'>
                <p className='text-lg font-medium text-slate-600 dark:text-gray-300'>Articles: {totalArticle}</p>

                {/* search box */}
                <div className='flex items-center border border-slate-400 rounded'>
                    <input onChange={(e) => setSearchValue(e.target.value)} className='w-full h-full relative bg-transparent text-slate-900 dark:text-slate-100 outline-0 py-2 px-3' type="text" placeholder='Search by article title?' />
                </div>

                {/* Filter Articles */}
                <div className='flex flex-col md:flex-row items-center gap-4 '>
                    <div className='flex justify-center items-center gap-3'>
                        <select onChange={(e) => setPublisherSlug(e.target.value)} className='p-1 border dark:border-slate-600 outline-0 dark:bg-slate-950 text-slate-600 dark:text-gray-300 font-semibold' name='' id=''>
                            <option value="">Filter By Publisher</option>
                            {
                                allPublisher.map((p, i) => <option key={i}
                                    value={p?.slug}>{p?.name}</option>)
                            }
                        </select>
                    </div>

                    <div className='flex justify-center items-center gap-3'>
                        <select onChange={(e) => setTagValue(e.target.value)} className='p-1 border dark:border-slate-600 outline-0 dark:bg-slate-950 text-slate-600 dark:text-gray-300 font-semibold' name='' id=''>
                            <option value="">Filter By Tag</option>
                            {
                                newsTags.map((newsTag, i) => <option key={i}
                                    value={newsTag?.value}>{newsTag?.label}</option>)
                            }
                        </select>
                    </div>
                </div>
            </div>


            {
                loading ? <LoadingSpinner />
                    : totalArticle === 0 ?
                        <div className='flex items-center justify-center h-[calc(50vh)]'>
                            <div className='flex flex-col gap-3 items-center'>
                                <h3 className='text-2xl font-semibold'>No articles found in your search! Search again</h3>
                                {/* <button className='p-2 bg-orange-500 hover:bg-indigo-600 rounded-full text-white'><IoReload className='w-5 h-5' /></button> */}
                            </div>
                        </div> :

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                            {
                                articles?.map((article) => <ArticleCard
                                    key={article?._id}
                                    article={article}
                                />)
                            }
                        </div>

            }
        </div>
    );
};

export default AllArticles;



// normal fetch method
