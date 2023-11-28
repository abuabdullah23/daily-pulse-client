import { useParams } from 'react-router-dom';
import usePremiumArticleDetails from '../../hooks/premium/usePremiumArticleDetails';
import ArticleDetails from '../../components/ArticleDetails/ArticleDetails';

const PremiumArticlesDetails = () => {
    const { id } = useParams();
    const { viewPremiumArticle, refetch, isLoading } = usePremiumArticleDetails(id);



    return (
        <div>
            <ArticleDetails article={viewPremiumArticle} isLoading={isLoading} />
        </div>
    );
};

export default PremiumArticlesDetails;