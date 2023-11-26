import { AiFillDashboard, AiOutlinePlus } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { RiArticleLine } from "react-icons/ri";

export const dashboardNav = [
    {
        title: 'Dashboard',
        icon: <AiFillDashboard />,
        path: '/dashboard'
    },
    {
        title: 'All Users',
        icon: <FiUsers />,
        path: '/dashboard/all-users'
    },
    {
        title: 'All Articles',
        icon: <RiArticleLine />,
        path: '/dashboard/all-articles'
    },
    {
        title: 'Add Publisher',
        icon: <AiOutlinePlus />,
        path: '/dashboard/add-publisher'
    }
]