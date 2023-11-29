import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';

const PricingSubscription = () => {
    return (
        <div>
            <section className="pb-6 dark:text-gray-100">
                <div className="container mx-auto sm:p-5">

                    {/* 1 */}
                    <div className="grid max-w-md grid-cols-1 gap-6 mx-auto auto-rows-fr lg:grid-cols-3 lg:max-w-full">
                        <div className="flex flex-col overflow-hidden border-2 rounded-md dark:border-gray-700 border-indigo-200">
                            <div className="flex flex-col items-center justify-center px-2 py-4 space-y-4 dark:bg-slate-800">
                                <p className="text-lg font-medium">Personal</p>
                                <p className="text-5xl font-bold">0$
                                    <span className="text-xl dark:text-gray-400">/d</span>
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center px-2 py-4 dark:bg-gray-900">
                                <ul className="self-stretch flex-1 space-y-2">
                                    <li className="flex justify-center items-center space-x-2">
                                        <FaRegCheckCircle />
                                        <span>Access to daily news articles and updates.</span>
                                    </li>
                                    <li className="flex justify-center items-center space-x-2">
                                        <FaRegCheckCircle />
                                        <span>Not access to premium content.</span>
                                    </li>
                                    <li className="flex justify-center items-center space-x-2">
                                        <FaRegCheckCircle />
                                        <span>Show advertise reading time.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>


                        {/* 2 */}
                        <div className="flex flex-col overflow-hidden border-2 rounded-md  dark:border-violet-400 border-orange-500 shadow-lg">
                            <div className="flex flex-col items-center justify-center px-2 py-4 space-y-4 dark:bg-slate-800">
                                <p className="text-lg font-medium">Premium Plan</p>
                                <p className="text-5xl font-bold">5$
                                    <span className="text-xl dark:text-gray-400">/5d</span>
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center px-2 py-4 dark:bg-gray-900">
                                <ul className="self-stretch flex-1 space-y-2">
                                    <li className="flex justify-center items-center space-x-2">
                                        <FaRegCheckCircle />
                                        <span>Full access to premium articles.</span>
                                    </li>
                                    <li className="flex justify-center items-center space-x-2">
                                        <FaRegCheckCircle />
                                        <span>Ad-free reading experience</span>
                                    </li>
                                    <li className="flex justify-center items-center space-x-2">
                                        <FaRegCheckCircle />
                                        <span>Early access to breaking news.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 3 */}
                        <div className="flex flex-col overflow-hidden border-2 rounded-md dark:border-gray-700 border-indigo-200">
                            <div className="flex flex-col items-center justify-center px-2 py-4 space-y-4 dark:bg-slate-800">
                                <p className="text-lg font-medium">Family Plan</p>
                                <p className="text-5xl font-bold">10$
                                    <span className="text-xl dark:text-gray-400">/10d</span>
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center px-2 py-4 dark:bg-gray-900">
                                <ul className="self-stretch flex-1 space-y-2">
                                    <li className="flex justify-center items-center space-x-2">
                                        <FaRegCheckCircle />
                                        <span>Subscription with family members.</span>
                                    </li>
                                    <li className="flex justify-center items-center space-x-2">
                                        <FaRegCheckCircle />
                                        <span>You got bonus every month.</span>
                                    </li>
                                    <li className="flex justify-center items-center space-x-2">
                                        <FaRegCheckCircle />
                                        <span>Access to moderator.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PricingSubscription;