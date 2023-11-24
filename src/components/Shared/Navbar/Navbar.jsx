import { useEffect, useState } from 'react';
import Container from '../../Container/Container';
import { allNav } from './NavItem';
import { Link } from 'react-router-dom';
import ActiveLink from '../../ActiveLink/ActiveLink';
import { FaList, FaMoon } from 'react-icons/fa';
import { BiSun } from 'react-icons/bi';
import logoLight from '../../../assets/images/logo/logo-light.png'
import logoDark from '../../../assets/images/logo/logo-dark.png'
import smallLogoLight from '../../../assets/images/logo/favicon.png'
import smallLogoDark from '../../../assets/images/logo/favicon-dark.png'

const Navbar = () => {
    const user = 'null';
    const [show, setShow] = useState(false);
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        const storageTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia("(prefers-color-scheme: light)").matches;
        if (storageTheme) {
            setTheme(storageTheme)
        } else {
            setTheme(prefersDark ? 'dark' : 'light')
        }
    }, [])

    useEffect(() => {
        if (theme) {
            document.documentElement.classList.toggle('dark', theme === 'dark');
            localStorage.setItem('theme', theme)
        }
    }, [theme])

    const handleThemeToggle = () => {
        setTheme((pre) => pre === 'dark' ? 'light' : 'dark');
    }

    return (
        <div className='sticky top-0 z-10 shadow py-3 bg-white dark:bg-black'>
            <Container>
                <div className='flex items-center justify-between relative'>
                    <Link to={'/'} className='hidden lg:block'>
                        <img className='h-8' src={theme === 'dark' ? logoDark : logoLight} alt="logo image" />
                    </Link>

                    <div onClick={() => setShow(!show)} className='lg:hidden p-2 rounded bg-orange-500 text-white'>
                        <FaList />
                    </div>

                    <Link to={'/'} className='lg:hidden'>
                        <img className='h-6' src={theme === 'dark' ? smallLogoDark : smallLogoLight} alt="logo image" />
                    </Link>

                    {/* show only from medium device */}
                    <div className={`${show ? 'absolute bg-white z-20 w-3/4 h-screen -top-3 -left-5 p-8' : 'hidden'} lg:hidden`}>
                        <ul className='flex flex-col items-start gap-2 font-semibold'>
                            {
                                allNav.map((nav) => <li key={nav.id} onClick={() => setShow(false)}>
                                    <ActiveLink to={nav.path}>
                                        {nav.title}
                                    </ActiveLink>
                                </li>)
                            }
                        </ul>
                    </div>

                    {/* show in large device */}
                    <div className='hidden lg:block'>
                        <ul className='lg:flex items-center gap-5 font-semibold'>
                            {
                                allNav.map((nav) => <li key={nav.id} onClick={() => setShow(false)}>
                                    <ActiveLink to={nav.path}>
                                        {nav.title}
                                    </ActiveLink>
                                </li>)
                            }
                        </ul>
                    </div>

                    <div className='flex items-center gap-3'>
                        <button onClick={handleThemeToggle} className='mr-3'>
                            {
                                theme === 'light' ? <FaMoon className='cursor-pointer' /> : <BiSun className='cursor-pointer text-white' />
                            }
                        </button>
                        {
                            user ? <>
                                <div className='flex items-center gap-3'>
                                    <img className='h-8 w-8 rounded-full' src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user image" />
                                    <button className='text-gray-600 hover:text-red-500 font-semibold'>Log Out</button>
                                </div>
                            </> : <>
                                <Link className='text-gray-600 hover:text-orange-500 font-semibold' to={'/login'}>Log In</Link>
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