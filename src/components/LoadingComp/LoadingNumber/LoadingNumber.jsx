import React from 'react';
import { BiLoaderCircle } from 'react-icons/bi';

const LoadingNumber = () => {
    return (
        <>
            <div className='flex items-center justify-center gap-2'>
                <BiLoaderCircle className='animate-spin' />
            </div>
        </>
    );
};

export default LoadingNumber;