import React, { useState } from 'react';
import LottieComp from '../../components/LottieComp/LottieComp';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import Loader from '../../components/LoadingComp/Loader/Loader';
import BackToHome from '../../components/BackToHome/BackToHome';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import registerAnimation from '../../assets/images/lottie/register_animation.json'
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { imageUpload } from '../../utils/imageUpload';
import { FadeLoader } from 'react-spinners';
import { saveUser } from '../../api/auth';

const Register = () => {
    const { loading, setLoading, createUser, handleUpdateProfile } = useAuth();
    const [seePass, setSeePass] = useState(false);

    // redirect after login to target page
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    // handle registration form value
    const handleRegister = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        // condition for strong password
        if (password.length < 6) {
            toast.error('Password must be 6 characters.')
            return;
        } else if (!/(?=.*[A-Z])/.test(password)) {
            toast.error('Please include one capital letter.');
            return;
        } else if (!/(?=.*[!@#$&*])/.test(password)) {
            toast.error('Please add a special character.');
            return;
        } else if (!/(?=.*\d)/.test(password)) {
            toast.error('Please add a numeric number.');
            return;
        }

        // image Upload
        const image = event.target.image.files[0];
        imageUpload(image) // call from utils.js for no repeat same code
            .then(data => {
                const imgUrl = data.data.display_url;
                createUser(email, password)
                    .then(result => {
                        handleUpdateProfile(name, imgUrl)
                            .then(() => {
                                toast.success('Successfully Signed Up!')
                                navigate(from, { replace: true });

                                // save user in mongoDB
                                saveUser(result?.user)
                            })
                            .catch(error => {
                                toast.error(error.message)
                                setLoading(false)
                            })
                    })
                    .catch(error => {
                        toast.error(error.message)
                        setLoading(false)
                    })
            })
    }

    return (
        <div>
            {
                loading && <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                    <FadeLoader />
                </div>
            }
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
                                    <div className='mb-2'>
                                        <label htmlFor='image' className='block mb-2'> Select Image: </label>
                                        <input required type='file' id='image' name='image' accept='image/*' />
                                    </div>
                                    {/* submit button */}
                                    <button
                                        disabled={loading ? true : false}
                                        type="submit"
                                        className={`px-8 mt-2 w-full py-2 bg-orange-500 shadow-lg hover:shadow-orange-500/30 text-white rounded-md ${loading && 'bg-orange-400'} `}>
                                        {
                                            loading ? <Loader loadingText={'Processing'} /> : 'Register'
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