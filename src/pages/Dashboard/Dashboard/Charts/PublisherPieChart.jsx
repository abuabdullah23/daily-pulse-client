import React from 'react';
import Chart from 'react-google-charts';
import useGetPublisherPercentage from '../../../../hooks/adminHooks/useGetPublisherPercentage';

const PublisherPieChart = () => {
const {publisherPercentage, refetch, isLoading}= useGetPublisherPercentage();


    const data = [
        ["Publications", "Percentage"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7],
    ];

    const options = {
        title: "Percentage of publications articles",
        is3D: true,
    };



    return (
        <div>
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
            />
        </div>
    );
};

export default PublisherPieChart;