import React from 'react';
import useAllPublisher from '../../../hooks/useAllPublisher';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Publishers = () => {
    const [allPublisher] = useAllPublisher();

    return (
        <div className='my-16 lg:my-32'>
            <SectionTitle sectionTitle={'All Publisher'} />

            <div className='flex flex-wrap justify-center gap-2'>
                {
                    allPublisher.map((p) => <div key={p?._id} title={ p.name } className='border-2 border-gray-300 dark:border-slate-700 bg-white rounded p-1 hover:scale-103 transition-all ease-in-out'>
                        <div className='h-6 md:h-8 w-full'>
                            <img className='w-full h-full' src={p.image} alt={p?.name} />
                        </div>
                        {/* <h3></h3> */}
                    </div>)
                }
            </div>
        </div>
    );
};

export default Publishers;