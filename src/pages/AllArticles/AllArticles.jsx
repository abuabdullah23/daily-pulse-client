import React from 'react';

const AllArticles = () => {
    return (
        <div>
            All Approved Articles

            {/* tags */}
            <div className="flex flex-row flex-wrap justify-start items-center gap-2">
                    {
                        [1,2].map((t, i) => <div key={i} className="py-[2px] px-[6px] bg-indigo-500 text-gray-100">
                            {t}
                        </div>)
                    }
                </div>
        </div>
    );
};

export default AllArticles;