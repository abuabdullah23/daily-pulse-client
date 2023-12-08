import EmptyContent from '../../components/EmptyContent/EmptyContent';
import LoadingSpinner from '../../components/LoadingComp/LoadingSpinner/LoadingSpinner';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import useMyArticles from '../../hooks/useMyArticles';
import SingleRow from './SingleRow';

const MyArticles = () => {
    const { myAllArticle, refetch, isLoading } = useMyArticles();

    return (
        <div className='min-h-screen'>
            <SectionTitle sectionTitle={'My Articles'} />

            {
                myAllArticle.length === 0 ? <EmptyContent EmptyText={'You have no article. Please add article.'} /> :

                    <div className='w-full rounded-md'>
                        <h2 className='text-lg font-semibold mb-2'> All Articles: {myAllArticle.length}</h2>
                        {
                            isLoading ? <LoadingSpinner /> :
                                <div className=' overflow-x-auto'>
                                    <table className='w-full text-sm text-left'>
                                        <thead className='text-sm text-[#ececec] bg-[#132346] uppercase border-b border-slate-700'>
                                            <tr>
                                                <th scope='col' className='py-3 px-4'>No</th>
                                                <th scope='col' className='py-3 px-4'>Image</th>
                                                <th scope='col' className='py-3 px-4'>Title</th>
                                                <th scope='col' className='py-3 px-4'>Is Premium</th>
                                                <th scope='col' className='py-3 px-4'>Posted Date</th>
                                                <th scope='col' className='py-3 px-4'>Status</th>
                                                <th scope='col' className='py-3 px-4'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                myAllArticle?.map((article, index) => <SingleRow
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

                    </div>
            }
        </div>
    );
};

export default MyArticles;