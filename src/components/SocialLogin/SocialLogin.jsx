import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {

    return (
        <div
            className='p-2 rounded-full w-full border-2 border-orange-400 hover:bg-orange-200 text-gray-700 dark:text-gray-100 dark:hover:text-slate-600 flex items-center justify-center gap-2 cursor-pointer'>
            <FcGoogle />
            <span className=' text-sm'>Login with Google</span>
        </div>
    );
};

export default SocialLogin;