import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import PricingSubscription from '../../components/Pricing/PricingSubscription';
import usePremiumUser from '../../hooks/premium/usePremiumUser';

const Subscription = () => {
    const [amount, setAmount] = useState(5);
    const [isPremiumUser] = usePremiumUser();

    return (
        <div className='pb-8'>
            <div className="w-full bg-gray-500 bg-[url(https://i.ibb.co/g3FS1bQ/payment-banner-hq-01.png)] bg-bottom bg-blend-multiply bg-cover mb-5">

                <div className="container flex flex-col flex-wrap content-center justify-center p-4 mx-auto md:p-10">
                    <div className='py-20 text-white flex flex-col gap-2 items-center'>
                        <h3 className='font-semibold text-4xl uppercase'>Best Your Choice</h3>
                        <p className='mt-1'>Choose your plan, support quality journalism, and enjoy an enriched reading experience.</p>
                    </div>
                </div>
            </div>
            <PricingSubscription />

            <div className="mb-8 space-y-4 text-center">
                <h1 className="text-4xl font-semibold leadi">Why Subscribe?</h1>
            </div>
            <ul className=''>
                <li> <strong>Stay Informed:</strong> Get in-depth analysis and insights.</li>
                <li> <strong>Ad-Free Experience:</strong> Enjoy distraction-free reading.</li>
                <li> <strong>Support Quality Journalism:</strong> Contribute to independent reporting.</li>
            </ul>

            <p className='text-xl font-bold mt-5'>Risk-Free Trial</p>
            Not sure? Try our risk-free trial for [7 days]. Experience the difference with our premium content before committing to a subscription.

            <hr className='border-b-2 border-slate-300 dark:border-indigo-900 my-8' />

            <h3 className='text-4xl font-semibold dark:text-[#fca311] text-orange-500'>Ready to Subscribe?</h3>
            <p className='mt-1'>Choose your plan, support quality journalism, and enjoy an enriched reading experience.</p>

            <div className='p-5 border border-slate-500 my-6 rounded flex flex-col md:flex-row items-center gap-8 transition-all ease-in-out'>
                <div className='w-full md:w-1/2 flex items-center justify-center'>
                    <h3 className='text-5xl font-semibold'>${amount}<span className='text-base font-normal'></span> </h3>
                </div>
                <div className='h-[2px] w-[100px] lg:h-[100px] lg:w-[2px]  bg-gray-400 dark:bg-slate-600 '>
                </div>
                <div className='w-full md:w-1/2 flex items-center justify-center'>
                    <label className='font-semibold mr-4' htmlFor="">Select Period: </label>
                    <select onChange={(e) => setAmount(e.target.value)} className='py-2 px-2 border text-slate-600 dark:text-gray-100 bg-transparent dark:bg-[#101b33] border-indigo-400 focus:border-indigo-500 rounded outline-none'>
                        <option value="">--select--</option>
                        <option value={1}>1 min</option>
                        <option value={5}>5 days</option>
                        <option value={10}>10 days</option>
                    </select>
                </div>
            </div>

            {!isPremiumUser && <div className='flex items-center justify-end'>
                <Link to='/make-payment' className='rounded border-2 hover:border-[#203c79] py-2 px-3 bg-[#fca311] font-semibold hover:bg-transparent text-slate-900 hover:text-[#000000] dark:hover:text-gray-200 transition-all duration-300'>Subscription</Link>
            </div>}
        </div>
    );
};

export default Subscription;