import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrendingArticles } from '../../../api/article';
import Card from './Card';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import LoadingSpinner from '../../../components/LoadingComp/LoadingSpinner/LoadingSpinner';

const MostViewsArticles = () => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getTrendingArticles()
            .then(res => {
                setArticles(res);
            })
    }, [])

    return (
        <div className='mt-12'>
            <SectionTitle sectionTitle={'Most Popular Articles'} />

            {
                articles.length > 0 ? <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 -mt-8'>
                    {
                        articles?.map((article) => <Card
                            key={article?._id}
                            article={article}
                        />)
                    }
                </div>
                    :
                    <LoadingSpinner />
            }
        </div>
    );
};

export default MostViewsArticles;