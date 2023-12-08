import React, { useState } from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import CountUp from 'react-countup';
import useCountAllUser from '../../hooks/adminHooks/useCountUsers';
import ScrollTrigger from 'react-scroll-trigger';

const CountUpUser = () => {
    const { countAllUsers } = useCountAllUser();
    const [counterOn, setCounterOn] = useState(false);

    const total = countAllUsers?.totalUser
    const admin = countAllUsers?.totalAdmin
    const premium = countAllUsers?.totalPremiumUser

    const counterArray = [
        { label: 'Total user', count: total },
        { label: 'Admin', count: admin },
        { label: 'Premium User', count: premium },
    ]

    return (
        <div className='my-16 lg:my-32'>
            <SectionTitle sectionTitle={'Our Users'} />
            <div className='border-2 border-[#fca311] text-[#14213d] dark:text-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 py-4 rounded-md -mt-8'>

                {
                    counterArray.map((c, i) => (
                        <div key={i}>
                            <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                                <div className='flex flex-col items-center gap-1'>
                                    {
                                        counterOn && <CountUp className='text-3xl font-bold' start={0} end={c?.count} duration={2} delay={0} />
                                    }
                                    <h2 className='text-lg font-thin'>{c?.label}</h2>
                                </div>
                            </ScrollTrigger>
                        </div>
                    ))
                }


            </div>
        </div>
    );
};

export default CountUpUser;