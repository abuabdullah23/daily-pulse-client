import React from 'react';
import { Link } from 'react-router-dom';

const PremiumArticles = () => {
    return (
        <div>
            Premium Articles Page :

            <Link to={`/premium-article-details/${'644123154'}`}>Details</Link>
        </div>
    );
};

export default PremiumArticles;