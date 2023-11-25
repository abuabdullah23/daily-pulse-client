import { Link, useLocation } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { dashboardNav } from "../utils/dashboardNavItem";
import logo from '../assets/images/logo/logo-dark.png';

const Sidebar = ({ showSidebar, setShowSidebar }) => {
    const { pathname } = useLocation();

    return (
        <div>
            <div onClick={() => setShowSidebar(false)} className={`fixed duration-200 ${!showSidebar ? 'invisible' : 'visible'} w-screen h-screen bg-[#22292f80] top-0 left-0 z-10`}></div>

            <div className={`w-[260px] fixed bg-[#283046] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${showSidebar ? 'left-0' : '-left-[260px] lg:left-0'}`}>
                <div className="h-[70px] flex justify-center items-center mt-3">
                    <Link to='/' className="h-[50px]">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className="px-4">
                    <ul>
                        {
                            dashboardNav.map((n, i) => <li key={i}>
                                <Link
                                    onClick={() => setShowSidebar(false)}
                                    to={n.path}
                                    className={`${pathname === n.path ? 'bg-slate-600 shadow-indigo-500/30 text-white duration-500' : 'text-[#d0d2d6] font-normal duration-200'} px-3 py-2 rounded-sm flex justify-start items-center gap-3 hover:pl-4 hover:bg-slate-600 transition-all w-full mb-1`}>
                                    <span>{n.icon}</span>
                                    <span>{n.title}</span>
                                </Link>
                            </li>)
                        }
                        <li>
                            <button className="text-[#d0d2d6] font-normal duration-200 px-3 py-2 rounded-sm flex justify-start items-center gap-3 hover:pl-4 hover:bg-slate-600 transition-all w-full mb-1">
                                <span><BiLogOutCircle /></span>
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;