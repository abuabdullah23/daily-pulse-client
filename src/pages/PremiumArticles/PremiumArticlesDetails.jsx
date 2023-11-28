import { useParams } from 'react-router-dom';

const PremiumArticlesDetails = () => {
    const { id } = useParams();

    return (
        <div>
            Premium Articles Details : {id}
        </div>
    );
};

export default PremiumArticlesDetails;