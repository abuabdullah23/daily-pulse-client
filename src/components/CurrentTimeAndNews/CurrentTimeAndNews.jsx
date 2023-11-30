// import React, { useEffect, useState } from 'react';
// import './CurrentTimeAndNews.css';
// import moment from 'moment';
// import { getTrendingArticles } from '../../api/article';
// import { useNavigate } from 'react-router-dom';

// const CurrentTimeAndNews = () => {
//   const [articles, setArticles] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getTrendingArticles().then(res => {
//       setArticles(res);
//     });
//   }, []);

//   const articleDetails = id => {
//     navigate(`/approved-article-details/${id}`);
//   };

//   const currentDate = new Date();

//   return (
//     <div className='flex items-center gap-2 mt-3'>
//       <p className='text-[#fca311] font-bold whitespace-nowrap'>
//         Current Date:
//       </p>
//       <p className='text-sm font-medium whitespace-nowrap'>
//         <span className='font-normal'>
//           {moment(currentDate).format('D MMM YYYY, h:mm A')}
//         </span>
//       </p>

//       <div className='border-l-2 pl-2 border-slate-400 dark:border-slate-600'>
//         <div className='marquee-container'>
//           {articles.map(news => (
//             <p
//               key={news?._id}
//               className='marquee'
//               onClick={() => articleDetails(news?._id)}
//             >
//               {news?.title}
//             </p>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CurrentTimeAndNews;





import React, { useEffect, useState } from 'react';
import './CurrentTimeAndNews.css';
import moment from 'moment';
import { getTrendingArticles } from '../../api/article';
import { Link } from 'react-router-dom';

const CurrentTimeAndNews = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getTrendingArticles()
            .then(res => {
                setArticles(res);
            })
    }, [])

    const currentDate = new Date();

    return (
        <div className='flex items-center gap-2 mt-3'>
            <p className='text-[#fca311] font-bold whitespace-nowrap'>Current Date:</p>
            <p className='text-sm font-medium whitespace-nowrap'><span className='font-normal'>{moment(currentDate).format("D MMM YYYY, h:mm A")}</span></p>

            <div className='border-l-2 pl-2 border-slate-400 dark:border-slate-600 flex items-center overflow-hidden'>
                <div className='marquee flex items-center gap-3'>
                    {
                        articles.map((news) => (
                            <Link to={`approved-article-details/${news?._id}`} key={news?._id} className='text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-[#fcd911]'>
                                {news?.title}  ||
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default CurrentTimeAndNews;
