import ArticlesChart from "./Charts/ArticlesChart";
import PublisherPieChart from "./Charts/PublisherPieChart";
import UsersChart from "./Charts/UsersChart";

const Dashboard = () => {


    return (
        <div className='px-2 lg:px-7 pt-5 pb-8'>
            <PublisherPieChart />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-8">
                <UsersChart />
                <ArticlesChart />
            </div>


        </div>
    );
};

export default Dashboard;