const LoadingSpinner = () => {
    return (
        <div className='flex justify-center items-center h-[calc(100vh-25px)]'>
            <p className='text-7xl font-thin'>L</p>
            <div className='w-11 h-11 border-4 border-dotted border-[var(--button)] rounded-full animate-spin mt-5'></div>
            <p className='text-7xl font-thin'>ading...</p>
        </div>
    );
};

export default LoadingSpinner;