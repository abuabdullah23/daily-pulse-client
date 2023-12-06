import React, { useState } from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Loader from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import useAllPublisher from '../../hooks/useAllPublisher';
import newsTags from './tags';
import Select from 'react-select';
import { imageUpload } from '../../utils/imageUpload';

const AddArticle = () => {
    const [loader, setLoader] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [allPublisher] = useAllPublisher();
    const [selectedOption, setSelectedOption] = useState(null);

    // Add article method
    const handleAddArticle = (event) => {
        event.preventDefault();
        setLoader(true);
        const form = event.target;
        const image = event.target.image.files[0];
        const title = form.title.value;
        const publisher = form.publisher.value;
        const description = form.description.value;

        // upload image
        imageUpload(image)
            .then(data => {
                const imgUrl = data.data.display_url;
                const articleInfo = {
                    title,
                    authorName: user?.displayName,
                    authorEmail: user?.email,
                    authorPhoto: user?.photoURL,
                    publisher,
                    tags: selectedOption,
                    image: imgUrl,
                    description
                }
                axiosSecure.post('/add-article', articleInfo)
                    .then(res => {
                        if (res.status === 200) {
                            toast.success('Added article successful');
                            setLoader(false);
                            form.reset('');
                            setSelectedOption(null); // not working, TODO: have to fix
                        }
                    })
                    .catch(error => {
                        toast.error(error.message);
                        setLoader(false)
                    })
            })
    }

    return (
        <div>
            <SectionTitle sectionTitle={'Add New Article'} />

            <form onSubmit={handleAddArticle}>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className='flex flex-col items-start gap-1 w-full md:w-1/2'>
                            <label className='font-semibold' htmlFor="">Select Article Image</label>
                            <input required accept='image/*' type="file" name='image' className='w-full py-[5px] px-2 border bg-transparent border-indigo-400 focus:border-indigo-500 rounded outline-none' />
                        </div>
                        <div className='flex flex-col items-start gap-1 w-full md:w-1/2'>
                            <label className='font-semibold' htmlFor="">article Name</label>
                            <input required type="text" name='title' placeholder='article name is here' className='w-full py-2 px-2 border bg-transparent border-indigo-400 focus:border-indigo-500 rounded outline-none' />
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className='flex flex-col items-start gap-1 w-full md:w-1/2'>
                            <label className='font-semibold' htmlFor="">Author Name</label>
                            <input readOnly value={user?.displayName} type="text" name='providerName' className='w-full py-2 px-2 border bg-transparent border-indigo-400 focus:border-indigo-500 rounded outline-none' />
                        </div>
                        <div className='flex flex-col items-start gap-1 w-full md:w-1/2'>
                            <label className='font-semibold' htmlFor="">Author Email</label>
                            <input readOnly value={user?.email} type="text" name='providerEmail' className='w-full py-2 px-2 border bg-transparent border-indigo-400 focus:border-indigo-500 rounded outline-none' />
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className='flex flex-col items-start gap-1 w-full md:w-1/2'>
                            <label className='font-semibold' htmlFor="">Select publisher</label>
                            <select required name="publisher" id="publisher" className='w-full py-2 px-2 border text-slate-600 dark:text-gray-100 bg-transparent dark:bg-[#101b33] border-indigo-400 focus:border-indigo-500 rounded outline-none'>
                                <option value="">--select--</option>
                                {
                                    allPublisher?.map((p, i) => <option key={i} value={p?._id}>{p?.name}</option>)
                                }
                            </select>
                        </div>
                        <div className='flex flex-col items-start gap-1 w-full md:w-1/2'>
                            <label className='font-semibold' htmlFor="">Tags</label>
                            <Select
                                className='w-full border text-slate-600 border-indigo-400 focus:border-indigo-500 rounded outline-none'
                                isMulti
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={newsTags}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className='flex flex-col items-start gap-1 w-full'>
                            <label className='font-semibold' htmlFor="">Description</label>
                            <textarea required type="text" rows={8} name='description' placeholder='Write your article description' className='w-full py-2 px-2 border bg-transparent border-indigo-400 focus:border-indigo-500 rounded outline-none' />
                        </div>
                    </div>

                    <div className='flex justify-center w-full mt-5'>
                        <button
                            disabled={loader ? true : false}
                            type="submit"
                            className={`py-2 px-4 w-fit bg-orange-500 hover:shadow-orange-500/20 hover:shadow-lg font-semibold text-white rounded-md mb-3 ${loader && 'bg-orange-400'} `}>
                            {
                                loader ? <Loader loadingText={'Adding Article...'} /> : 'Add Article'
                            }
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddArticle;