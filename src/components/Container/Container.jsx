import React from 'react';

const Container = ({ children }) => {
    return (
        <div className='container mx-auto px-5 md:mpx-8 lg:px-16'>
            {children}
        </div>
    );
};

export default Container;