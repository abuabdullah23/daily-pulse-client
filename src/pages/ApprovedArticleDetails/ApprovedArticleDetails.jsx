import { useParams } from 'react-router-dom';
import useViewApprovedArticle from '../../hooks/approvedArticles/useViewApprovedArticle';
import ArticleDetails from '../../components/ArticleDetails/ArticleDetails';

const ApprovedArticleDetails = () => {
    const { id } = useParams();
    const { viewApprovedArticle, isLoading } = useViewApprovedArticle(id);

    return (
        <div>
            <ArticleDetails article={viewApprovedArticle} isLoading={isLoading} />
        </div>
    );
};

export default ApprovedArticleDetails;