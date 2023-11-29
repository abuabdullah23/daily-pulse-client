import './CustomSlider.css'
import { useState, useEffect } from 'react';
import { getTrendingArticles } from '../../api/article';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const CustomSlider = () => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getTrendingArticles()
            .then(res => {
                setArticles(res);
            })
    }, [])

    const articleDetails = (id) => {
        navigate(`/approved-article-details/${id}`)
    }

    const [active, setActive] = useState(0);

    const next = () => {
        setActive((active + 1) % articles.length);
    };

    const prev = () => {
        setActive((active - 1 + articles.length) % articles.length);
    };

    useEffect(() => {
        const refreshInterval = setInterval(next, 4000);

        return () => {
            clearInterval(refreshInterval);
        };
    }, [active]);

    const dots = articles.map((_, index) => (
        <li
            key={index}
            className={index === active ? 'active' : ''}
            onClick={() => setActive(index)}
        ></li>
    ));

    const sliderStyle = {
        left: `-${active * 100}%`,
    };

    return (
        <div className='overflow-hidden'>
            <div className="slider">

                <div className="list mt-6" style={sliderStyle}>
                    {articles.map((data, index) => (
                        <div key={index} className="item relative">
                            <img className='border-4' src={data?.image} alt="slider image" />

                            <div className='absolute bottom-0 left-0 py-2 md:py-5 lg:py-8 overflow-hidden bg-black/80 w-full'>
                                <div className='pb-6 pl-6'>
                                    <d className='text-white flex items-center gap-5'>
                                        <p className='text-base'>{data?.publisher?.name}</p>
                                        <p className='text-sm'>Published: {moment(data?.createdAt).format("D MMM YYYY, h:mm A")}</p>
                                    </d>
                                    <h2 onClick={() => articleDetails(data?._id)} className='text-lg md:text-2xl lg:text-4xl font-bold cursor-pointer text-[#fca311] hover:text-[#fcc511]'>{data?.title.slice(0, 30)}...</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                <div className='buttons-div'>
                    <div className="buttons">
                        <button id="prev" onClick={prev}>
                            &lt;
                        </button>
                        <button id="next" onClick={next}>
                            &gt;
                        </button>
                    </div>
                </div>

                <ul className="dots">{dots}</ul>
            </div>
        </div>
    );
};

export default CustomSlider;
