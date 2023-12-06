import React from 'react';
import Chart from 'react-google-charts';
import useCountAllArticle from '../../../../hooks/adminHooks/useCountArticles';

const ArticlesChart = () => {
    const { countArticles } = useCountAllArticle();

    const total = countArticles?.totalArticle
    const pending = countArticles?.totalPending
    const approved = countArticles?.totalApproved
    const premium = countArticles?.totalPremium

    const data = [
        ["Article", "Status"],
        ["Total", total],
        ["Pending", pending],
        ["Approved", approved],
        ["Premium", premium],
    ];
    const options = {
        chart: {
            title: "Articles Statistics",
            subtitle: "Total, Pending, Approved, Premium",
        },
    };

    return (
        <div>
            <Chart
                chartType="Bar"
                width="100%"
                height="400px"
                data={data}
                options={options}
            />
        </div>
    );
};

export default ArticlesChart;