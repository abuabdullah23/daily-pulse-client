import React from 'react';
import CustomSlider from '../../../components/CustomSlider/CustomSlider';

const Banner = () => {
// TODO: here is get all trending news array from db, then have to send to CustomSlider by parameter

    return (
        <div className='text-[var(--primary-text)]'>
            <CustomSlider />
        </div>
    );
};

export default Banner;