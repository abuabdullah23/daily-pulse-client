import { BiLoaderCircle } from 'react-icons/bi';

const Loader = ({ loadingText }) => {
    return (
        <>
            <div className='flex items-center justify-center gap-2'>
                <BiLoaderCircle className='w-5 h-5 animate-spin' />
                <p>{loadingText}</p>
                <p className='animate-ping text-lg'>.</p>
                <p className='animate-ping text-lg'>.</p>
                <p className='animate-ping text-lg'>.</p>
            </div>
        </>
    );
};

export default Loader;