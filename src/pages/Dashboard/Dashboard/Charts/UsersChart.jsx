import React from 'react';
import useCountAllUser from '../../../../hooks/adminHooks/useCountUsers';
import Chart from 'react-google-charts';

const UsersChart = () => {
    const { countAllUsers } = useCountAllUser();

    const total = countAllUsers?.totalUser
    const admin = countAllUsers?.totalAdmin
    const premium = countAllUsers?.totalPremiumUser
    const onlyUser = countAllUsers?.onlyUser

    const dataOld = [
        ["Name", "Popularity"],
        ["Total", 5],
        ["Admin", 1],
        ["Premium", 2],
        ["Only User", 7],
    ];

    const dataNew = [
        ["User", "Status"],
        ["Total", total],
        ["Admin", admin],
        ["Premium", premium],
        ["Only User", onlyUser],
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

export default UsersChart;