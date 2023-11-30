import React from 'react';
import Chart from 'react-google-charts';
import useCountAllArticle from '../../../../hooks/adminHooks/useCountArticles';

const ArticlesChart = () => {
    const { countArticles } = useCountAllArticle();

    const total = countArticles?.totalArticle
    const pending = countArticles?.totalPending
    const approved = countArticles?.totalApproved
    const premium = countArticles?.totalPremium


    const dataOld = [
        ["Name", "Popularity"],
        ["Total", 0],
        ["Pending", 10],
        ["Approved", 5],
        ["Premium", 4],
    ];

    const dataNew = [
        ["Article", "Status"],
        ["Total", total],
        ["Pending", pending],
        ["Approved", approved],
        ["Premium", premium],
    ];

   const diffdata = {
        old: dataOld,
        new: dataNew,
    };

   const options = {
        legend: { position: "top" },
    };


    return (
        <div>
            <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                diffdata={diffdata}
                options={options}
            />
        </div>
    );
};

export default ArticlesChart;