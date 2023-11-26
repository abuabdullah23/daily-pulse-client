import { useState } from 'react';
import useAllArticle from '../../../hooks/useAllArticle';
import ArticleRow from './ArticleRow';
import Pagination from '../../../components/Pagination/Pagination';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';

const AllArticlesAdmin = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const [perPage, setPerPage] = useState(5);

    const { totalArticle, allArticle, refetch, isLoading } = useAllArticle({ pageNumber, perPage });

    return (
        <div className='px-2 lg:px-7 pt-5'>

            <div className='w-full p-4 bg-[#283046] rounded-md'>
                <h2 className='text-lg font-semibold mb-2'> All Articles: {totalArticle}</h2>
                {
                    isLoading ? <LoadingSpinner /> :
                        <div className=' overflow-x-auto'>
                            <table className='w-full text-sm text-left'>
                                <thead className='text-sm text-[#ececec] bg-[#101b33] uppercase border-b border-slate-700'>
                                    <tr>
                                        <th scope='col' className='py-3 px-4'>No</th>
                                        <th scope='col' className='py-3 px-4'>Image</th>
                                        <th scope='col' className='py-3 px-4'>Title</th>
                                        <th scope='col' className='py-3 px-4'>Publisher</th>
                                        <th scope='col' className='py-3 px-4'>Author</th>
                                        <th scope='col' className='py-3 px-4'>Posted Date</th>
                                        <th scope='col' className='py-3 px-4'>Status</th>
                                        <th scope='col' className='py-3 px-4'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allArticle?.map((article, index) => <ArticleRow
                                            key={index}
                                            index={index}
                                            article={article}
                                            refetch={refetch}
                                        />)
                                    }
                                </tbody>
                            </table>
                        </div>
                }

                {/* pagination */}
                <div className='flex items-center justify-end gap-8 mt-12'>
                    <div className='flex items-center gap-3'>
                        <div><p>Per Page</p></div>
                        <select onChange={(e) => setPerPage(parseInt((e.target.value)))} className='px-4 py-1 border border-slate-700 focus:border-gray-500 outline-none bg-gray-200 rounded-md text-slate-600'>
                            <option value={perPage}>{perPage}</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>

                        </select>
                    </div>
                    {
                        totalArticle > perPage && <Pagination
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                            totalItem={totalArticle}
                            perPage={perPage}
                            showItem={(Math.floor(totalArticle / perPage)) + 2} />
                    }
                </div>
            </div>


        </div>
    );
};

export default AllArticlesAdmin;