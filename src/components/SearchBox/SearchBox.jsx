import React from 'react';

const SearchBox = () => {
    return (
        <div>
            <div className='hidden md:block'>
                <input type="text" name='search' placeholder='search' className='px-3 py-2 outline-none border bg-transparent border-slate-600 rounded-md text-[#d0d2d6] focus:border-indigo-600 overflow-hidden' />
            </div>
        </div>
    );
};

export default SearchBox;