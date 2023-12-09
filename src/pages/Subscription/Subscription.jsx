import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PricingSubscription from '../../components/Pricing/PricingSubscription';
import usePremiumUser from '../../hooks/premium/usePremiumUser';
import useAdmin from '../../hooks/useAdmin';

const Subscription = () => {
    const [amount, setAmount] = useState('');
    const [period, setPeriod] = useState('');
    const [isPremiumUser] = usePremiumUser();
    const [isAdmin] = useAdmin();
    const navigate = useNavigate();

    // Subscription period options
    const subscriptionOptions = [
        { value: 0.5, label: '1 minute' },
        { value: 5, label: '5 days' },
        { value: 10, label: '10 days' },
    ];

    useEffect(() => {
        const selectedOption = subscriptionOptions.find((option) => option.value === Number(amount));
        if (selectedOption) {
            setPeriod(selectedOption.label);
        }
    }, [amount, subscriptionOptions]);



    // send parameter by on onClick with navigation
    const goToPay = () => {
        navigate(`/make-payment?amount=${amount}&period=${period}`)
    }


    return (
        <div className='pb-16'>
            <div className="w-full bg-gray-500 bg-[url(https://i.ibb.co/g3FS1bQ/payment-banner-hq-01.png)] bg-bottom bg-blend-multiply bg-cover mb-5">

                <div className="container flex flex-col flex-wrap content-center justify-center p-4 mx-auto">
                    <div className='p-4 py-10 md:py-16 lg:py-20 text-white flex flex-col gap-2 items-center'>
                        <h3 className='font-semibold text-3xl md:text-4xl uppercase text-center'>Best Your Choice</h3>
                        <p className='mt-1 text-center'>Choose your plan, support quality journalism, and enjoy an enriched reading experience.</p>
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
            <p className='mt-2'>{`Please select how many days "Subscription" do you want?`}</p>

            <div className='p-5 border border-slate-500 my-6 rounded flex flex-col md:flex-row items-center gap-8 transition-all ease-in-out'>
                <div className='w-full md:w-1/2 flex items-center justify-center'>
                    <h3 className='text-5xl font-semibold'>${amount}<span className='text-base font-normal'></span> </h3>
                </div>
                <div className='h-[2px] w-[100px] lg:h-[100px] lg:w-[2px] bg-gray-400 dark:bg-slate-600 '>
                </div>
                <div className='w-full md:w-1/2 flex items-center justify-center'>
                    <label className='font-semibold mr-4' htmlFor="">Select Period: </label>
                    <select onChange={(e) => setAmount(e.target.value)} className='py-2 px-2 border text-slate-600 dark:text-gray-100 bg-transparent dark:bg-[#101b33] border-indigo-400 focus:border-indigo-500 rounded outline-none'>
                        <option value="">--select--</option>
                        {subscriptionOptions.map((option, i) => (
                            <option key={i} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {!isPremiumUser && !isAdmin && <div className='flex items-center justify-center'>
                <button onClick={goToPay} className={`rounded border-2 hover:border-[#203c79] py-2 px-3 bg-[#fca311] font-semibold hover:bg-transparent text-slate-900 hover:text-[#000000] dark:hover:text-gray-200 transition-all duration-300 ${!amount && 'hidden transition-all duration-500'}`}>Subscription</button>
            </div>}
        </div>
    );
};

export default Subscription;