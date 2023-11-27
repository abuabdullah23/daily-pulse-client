import { useParams } from 'react-router-dom';
import useAuthorArticleDetails from '../../hooks/authorSecure/useAuthorArticleDetails';
import ArticleDetails from '../../components/ArticleDetails/ArticleDetails';

const MyArticleDetails = () => {
    const { id } = useParams();
    const { authorArticleDetails, isLoading } = useAuthorArticleDetails(id);

    return (
        <div>
            <ArticleDetails article={authorArticleDetails} isLoading={isLoading} />
        </div>
    );
};

export default MyArticleDetails;