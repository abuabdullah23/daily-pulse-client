import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Pricing = () => {
    const { user } = useAuth();

    return (
        <div>
            <section className="py-6 dark:text-gray-100">
                <div className="container mx-auto sm:p-5">
                    <div className="mb-12 space-y-4 text-center">
                        <h1 className="text-4xl font-semibold leadi">Pricing</h1>
                        <p className="px-4 sm:px-8 lg:px-24">Elevate Your Reading Newspaper Experience: Pricing and Subscriptions</p>
                        <div>
                            <button className="px-4 py-1 font-semibold border rounded-lg dark:bg-indigo-400 bg-indigo-700 text-gray-200 dark:border-indigo-400 dark:text-gray-900">Daily</button>
                        </div>
                    </div>


                    {/* 1 */}
                    <div className="grid max-w-md grid-cols-1 gap-6 mx-auto auto-rows-fr lg:grid-cols-3 lg:max-w-full">
                        <div className="flex flex-col overflow-hidden border-2 rounded-md dark:border-gray-700 border-indigo-200">
                            <div className="flex flex-col items-center justify-center px-2 py-8 space-y-4 dark:bg-slate-800">
                                <p className="text-lg font-medium">Personal</p>
                                <p className="text-5xl font-bold">0$
                                    <span className="text-xl dark:text-gray-400">/d</span>
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center px-2 py-8 dark:bg-gray-900">
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
                                <Link to={`${!user ? '/login' : '/subscription'}`} className="px-8 py-3 mt-6 text-lg font-semibold rounded sm:mt-12 dark:bg-indigo-400 bg-indigo-700 text-gray-200 dark:text-gray-900">Sign up for Free</Link>
                            </div>
                        </div>


                        {/* 2 */}
                        <div className="flex flex-col overflow-hidden border-2 rounded-md  dark:border-indigo-400 border-orange-500 shadow-lg">
                            <div className="flex flex-col items-center justify-center px-2 py-8 space-y-4 dark:bg-slate-800">
                                <p className="text-lg font-medium">Premium Plan</p>
                                <p className="text-5xl font-bold">5$
                                    <span className="text-xl dark:text-gray-400">/5d</span>
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center px-2 py-8 dark:bg-gray-900">
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
                                <Link to={'/subscription'} className="px-8 py-3 mt-6 text-lg font-semibold rounded sm:mt-12 dark:bg-indigo-400 bg-indigo-700 text-gray-200 dark:text-gray-900">Details</Link>
                            </div>
                        </div>

                        {/*  */}
                        <div className="flex flex-col overflow-hidden border-2 rounded-md dark:border-gray-700 border-indigo-200">
                            <div className="flex flex-col items-center justify-center px-2 py-8 space-y-4 dark:bg-slate-800">
                                <p className="text-lg font-medium">Family Plan</p>
                                <p className="text-5xl font-bold">10$
                                    <span className="text-xl dark:text-gray-400">/10d</span>
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center px-2 py-8 dark:bg-gray-900">
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
                                <Link to={'/subscription'} className="px-8 py-3 mt-6 text-lg font-semibold rounded sm:mt-12 dark:bg-indigo-400 bg-indigo-700 text-gray-200 dark:text-gray-900">Details</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Pricing;