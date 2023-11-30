import React from 'react';

const EmptyContent = ({ EmptyText }) => {
    return (
        <div className='w-full h-[calc(100vh-320px)] flex items-center justify-center'>
            <h2 className='text-4xl font-semibold'>{EmptyText}</h2>
        </div>
    );
};

export default EmptyContent;