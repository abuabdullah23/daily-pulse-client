import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { saveUser } from '../../api/auth';

const SocialLogin = () => {
    const { googleLogin, setLoading } = useAuth();

    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                toast.success('Login with Google Successful');
                setLoading(false);
                saveUser(result?.user)
            })
            .catch(error => {
                toast.error(error.message);
                setLoading(false);
            })
    }

    return (
        <div onClick={handleGoogleLogin}
            className='p-2 rounded-md w-full border-2 border-orange-400 hover:bg-orange-200 text-gray-700 dark:text-gray-100 dark:hover:text-slate-600 flex items-center justify-center gap-2 cursor-pointer'>
            <FcGoogle />
            <span className=' text-sm'>Login with Google</span>
        </div>
    );
};

export default SocialLogin;