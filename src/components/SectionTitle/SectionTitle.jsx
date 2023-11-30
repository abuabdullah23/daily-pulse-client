const SectionTitle = ({ sectionTitle, sectionSubtitle }) => {
    return (
        <div className='mt-8 mb-12 flex flex-col items-center gap-2 '>
            <h3 className='text-center text-4xl text-slate-600 dark:text-gray-100 font-semibold'>
                {sectionTitle}
            </h3>
            <span className='w-[100px] border-b-2 rounded-md border-[var(--titleBg)] mt-4'></span>
            <p className="text-center">{sectionSubtitle}</p>
        </div>
    );
};

export default SectionTitle;