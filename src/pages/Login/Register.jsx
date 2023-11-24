import React, { useState } from 'react';
import LottieComp from '../../components/LottieCom/LottieComp';
import { Link } from 'react-router-dom';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import Loader from '../../components/Loader/Loader';
import BackToHome from '../../components/BackToHome/BackToHome';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import registerAnimation from '../../assets/images/lottie/register_animation.json'

const Register = () => {
    const loader = false;
    const [seePass, setSeePass] = useState(false);

    // handle registration form value
    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const registerData = {
            name,
            email,
            password,
        }
        console.log(registerData);
    }

    return (
        <div>
            <BackToHome />
            <div className='py-5 flex items-center justify-center'>
                <div className='w-full justify-center items-center p-5 md:p-10'>
                    <div className='w-full rounded-md flex flex-col md:flex-row items-center justify-center'>
                        <div className='w-full lg:w-[50%] px-0 lg:px-20'>
                            <h2 className='text-center w-full text-xl text-slate-600 dark:text-gray-100 font-bold'>Register</h2>
                            <div className='flex flex-col gap-7'>
                                <form onSubmit={handleRegister} className='text-slate-600 dark:text-gray-100'>
                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label htmlFor="name">Name</label>
                                        <input required type="text" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-orange-500 rounded-md dark:text-slate-600' id='name' name='name' placeholder='name' />
                                    </div>
                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label htmlFor="email">Email</label>
                                        <input required type="email" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-orange-500 rounded-md dark:text-slate-600' id='email' name='email' placeholder='email' />
                                    </div>
                                    <div className='flex flex-col gap-1 mb-4'>
                                        <label htmlFor="password">Password</label>
                                        <div className="relative">
                                            <input
                                                required
                                                type={!seePass ? 'password' : 'text'}
                                                className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-orange-500 rounded-md dark:text-slate-600' id='password' name='password' placeholder='password' />
                                            <div
                                                onClick={() => setSeePass(!seePass)}
                                                className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 dark:text-slate-600">
                                                {
                                                    !seePass ? <FiEye /> : <FiEyeOff />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {/* submit button */}
                                    <button
                                        disabled={loader ? true : false}
                                        type="submit"
                                        className={`px-8 w-full py-2 bg-orange-500 shadow-lg hover:shadow-orange-500/30 text-white rounded-md ${loader && 'bg-orange-400'} `}>
                                        {
                                            loader ? <Loader loadingText={'Processing'} /> : 'Register'
                                        }
                                    </button>
                                </form>
                                <div>
                                    <SocialLogin />
                                </div>
                            </div>
                            <div className='text-center text-slate-600 dark:text-gray-100 pt-1'>
                                <p>You have no account ? <Link className='text-blue-500' to='/login'>Login</Link></p>
                            </div>
                        </div>

                        <div className="w-full lg:w-[50%]">
                            <LottieComp Animation={registerAnimation} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;