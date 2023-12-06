import { useState } from 'react';
import Container from '../../Container/Container';
import { allNav, loggedUserNav } from './NavItem';
import { Link } from 'react-router-dom';
import ActiveLink from '../../ActiveLink/ActiveLink';
import { FaList, FaUserCheck } from 'react-icons/fa';
import logoLight from '../../../assets/images/logo/logo-light.png'
import logoDark from '../../../assets/images/logo/logo-dark.png'
import smallLogoLight from '../../../assets/images/logo/favicon.png'
import smallLogoDark from '../../../assets/images/logo/favicon-dark.png'
import DarkMode from '../../ThemeToggle/ThemeToggle';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import useAdmin from '../../../hooks/useAdmin';
import usePremiumUser from '../../../hooks/premium/usePremiumUser';
import { MdAdminPanelSettings, MdWorkspacePremium } from 'react-icons/md';

const Navbar = () => {
    const { user, logOut, setLoading } = useAuth();
    const [isAdmin] = useAdmin();
    const [isPremiumUser] = usePremiumUser();
    const [show, setShow] = useState(false);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "dark";
    });

    // handleLogOut
    const handleLogOut = () => {
        logOut()
            .then(res => {
                toast.success('Log Out Successful!');
                setLoading(false);
            })
            .catch(error => {
                toast.error(error.message);
                setLoading(false);
            })
    }

    return (
        <div className='sticky top-0 z-20 shadow py-4 bg-[var(--secondary)]'>
            <Container>
                <div className='flex items-center justify-between relative'>
                    <Link to={'/'} className='hidden lg:block'>
                        <img className='h-8' src={theme === 'dark' ? logoDark : logoLight} alt="logo image" />
                    </Link>

                    <div onClick={() => setShow(!show)} className='lg:hidden p-2 rounded bg-orange-500 text-white cursor-pointer'>
                        <FaList />
                    </div>

                    <Link to={'/'} className='lg:hidden'>
                        <img className='h-6' src={theme === 'dark' ? smallLogoDark : smallLogoLight} alt="logo image" />
                    </Link>

                    {/* show only from medium device */}
                    {/* <div className={`${show ? 'absolute bg-[var(--body)] z-[9999] w-3/4 h-screen -top-3 -left-5 p-8' : 'hidden'} lg:hidden`}>
                        <ul className='flex flex-col items-start gap-4 font-semibold'>
                            {
                                allNav.map((nav) => <li key={nav.id} onClick={() => setShow(false)}>
                                    <ActiveLink to={nav.path}>
                                        {nav.title}
                                    </ActiveLink>
                                </li>)
                            }
                            {
                                user &&
                                loggedUserNav?.map((item, i) => <ActiveLink
                                    key={i}
                                    to={item.path}
                                    onClick={() => setShow(false)}
                                >
                                    {item.title}
                                </ActiveLink>)
                            }
                            {
                                isAdmin &&
                                <li onClick={() => setShow(false)}>
                                    <ActiveLink to='/dashboard'>Dashboard</ActiveLink>
                                </li>
                            }
                        </ul>
                    </div> */}

                    <div className={`${show ? 'absolute bg-[var(--body)] z-[9999] w-3/4 h-screen -top-4 -left-5 p-8' : 'hidden'} lg:hidden`}>
                        <ul className='flex flex-col items-start gap-4 font-semibold'>
                            {allNav.map((nav) => (
                                <li key={nav.id} onClick={() => setShow(false)}>
                                    <ActiveLink to={nav.path}>{nav.title}</ActiveLink>
                                </li>
                            ))}
                            {user && loggedUserNav?.map((item, i) => (
                                <li key={i} onClick={() => setShow(false)}>
                                    <ActiveLink to={item.path}>{item.title}</ActiveLink>
                                </li>
                            ))}
                            {isAdmin && (
                                <li onClick={() => setShow(false)}>
                                    <ActiveLink to='/dashboard'>Dashboard</ActiveLink>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* show in large device */}
                    <div className='hidden lg:block'>
                        <ul className='lg:flex flex-wrap items-center gap-4 whitespace-nowrap px-5'>
                            {
                                allNav.map((nav) => <li key={nav.id} onClick={() => setShow(false)}>
                                    <ActiveLink to={nav.path}>
                                        {nav.title}
                                    </ActiveLink>
                                </li>)
                            }
                            {
                                user &&
                                loggedUserNav?.map((item, i) => <li key={i} onClick={() => setShow(show)}>
                                    <ActiveLink to={item.path} >
                                        {item.title}
                                    </ActiveLink>
                                </li>)
                            }
                            {
                                isAdmin && <ActiveLink to='/dashboard'>Dashboard</ActiveLink>
                            }
                        </ul>
                    </div>

                    <div className='flex items-center gap-3'>
                        <DarkMode theme={theme} setTheme={setTheme} />
                        {
                            user ? <>
                                <div className='flex items-center gap-3 relative'>
                                    <Link to='/my-profile' className='relative'>
                                        <div className='h-9 w-9 rounded-full'>
                                            <img className='h-full w-full rounded-full border dark:border-slate-400' title={user?.displayName || user?.email} src={user?.photoURL} alt="user image" />
                                        </div>
                                        {
                                            isPremiumUser ? <span title='Premium User' className='p-[3px] text-base border-[2px] border-[#14213d] hover:border-[#fca311] hover:bg-[#14213d] transition-all ease-in-out bg-green-600 text-white rounded-full -top-2 -right-2 flex items-center gap-1 absolute'>
                                                <MdWorkspacePremium className='h-[12px] w-[12px]' />
                                            </span> : isAdmin ? <span title='Admin' className='p-[3px] text-base border-[2px] border-[#14213d] hover:border-[#fca311] hover:bg-[#14213d] transition-all ease-in-out bg-purple-600 text-white rounded-full -top-2 -right-2 flex items-center gap-1 absolute'>
                                                <MdAdminPanelSettings className='h-[12px] w-[12px]' />
                                            </span> : <span title='User' className='p-[3px] text-base border-[2px] border-[#14213d] hover:border-[#fca311] hover:bg-[#14213d] transition-all ease-in-out bg-[#fca311] text-white rounded-full -top-2 -right-2 flex items-center gap-1 absolute'>
                                                <FaUserCheck className='h-[12px] w-[12px]' />
                                            </span>
                                        }
                                    </Link>
                                    <button onClick={handleLogOut} className='text-gray-600 dark:text-gray-100 hover:text-[#fca311] font-semibold whitespace-nowrap'>Log Out</button>
                                </div>
                            </> : <>
                                <Link className='text-gray-600 dark:text-gray-100 hover:text-[#fca311] font-semibold whitespace-nowrap' to={'/login'}>Log In</Link>
                            </>
                        }
                    </div>
                </div>
            </Container>
            <div onClick={() => setShow(false)} className={`fixed duration-200 ${!show ? 'invisible' : 'visible'} w-screen h-screen bg-[#22292f80] top-0 left-0 z-10 lg:hidden`}></div>
        </div>
    );
};

export default Navbar;