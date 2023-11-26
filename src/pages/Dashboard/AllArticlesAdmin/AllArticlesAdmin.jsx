import { useState } from 'react';
import useAllArticle from '../../../hooks/useAllArticle';
import ArticleRow from './ArticleRow';

const AllArticlesAdmin = () => {
    const [pageNumber, setPageNumber] = useState(1)

    const [allArticle, refetch] = useAllArticle({ pageNumber });



    return (
        <div className='px-2 lg:px-7 pt-5'>

            <div className='w-full p-4 bg-[#283046] rounded-md'>
               <h2 className='text-lg font-semibold mb-2'> All Articles: {allArticle.length}</h2>
                <div className=' overflow-x-auto overflow-y-auto h-[calc(100vh-200px)]'>
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
                                allArticle.map((article, index) => <ArticleRow
                                    key={index}
                                    index={index}
                                    article={article}
                                    refetch={refetch}
                                />)
                            }
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
};

export default AllArticlesAdmin;