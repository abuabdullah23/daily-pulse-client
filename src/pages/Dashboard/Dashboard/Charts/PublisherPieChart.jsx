import React from 'react';
import Chart from 'react-google-charts';
import useGetPublisherPercentage from '../../../../hooks/adminHooks/useGetPublisherPercentage';

const PublisherPieChart = () => {
    const { publisherPercentage, refetch, isLoading } = useGetPublisherPercentage();

    const data = [
        ["Publications", "Percentage"],
        ["CNN", 11],
        ["Dhaka Tribune", 20],
        ["Daily Sun", 10],
        ["Daily Pulse", 5],
        ["Al Jazira", 15],
        ["The Daily Star", 25],
        ["Real Time", 7],
        ["The Daily Sun", 10],
    ];

    const options = {
        title: "Percentage of publications articles",
        is3D: true,
    };


    return (
        <div>
            <Chart
                className='bg-[#050000]'
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