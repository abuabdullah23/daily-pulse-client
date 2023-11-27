import { useParams } from 'react-router-dom';
import useAuthorArticleDetails from '../../../hooks/authorSecure/useAuthorArticleDetails';
import ArticleDetails from '../../../components/ArticleDetails/ArticleDetails';

const ViewArticleDetails = () => {
    const { id } = useParams();
    const { authorArticleDetails, refetch, isLoading } = useAuthorArticleDetails(id);

    return (
        <div  className='px-2 lg:px-7'>
            <ArticleDetails article={authorArticleDetails} isLoading={isLoading} />
        </div>
    );
};

export default ViewArticleDetails;