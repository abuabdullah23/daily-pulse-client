const LoadingSpinner = () => {
    return (
        <div className='flex justify-center items-center h-[calc(100vh-300px)]'>
            <p className='text-5xl lg:text-7xl font-thin'>L</p>
            <div className='w-7 h-7 lg:w-11 lg:h-11 border-2 lg:border-4 border-dotted border-[var(--button)] rounded-full animate-spin mt-5'></div>
            <p className='text-5xl lg:text-7xl font-thin'>ading...</p>
        </div>
    );
};

export default LoadingSpinner;