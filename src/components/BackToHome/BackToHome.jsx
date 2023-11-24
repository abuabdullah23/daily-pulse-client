import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BackToHome = () => {
    return (
        <div className='px-10 pt-10'>
            <Link className='text-slate-600 dark:text-gray-100' to={'/'}><FaHome /></Link>
        </div>
    );
};

export default BackToHome;