import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useViewSingleArticle from '../../hooks/useViewSingleArticle';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import useAllPublisher from '../../hooks/useAllPublisher';
import Select from 'react-select';
import newsTags from '../AddArticle/tags';
import Loader from '../../components/Loader/Loader';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { imageUpload } from '../../utils/imageUpload';
import { toast } from 'react-toastify';

const UpdateArticle = () => {
    const { id } = useParams();
    const { singleArticle, refetch, isLoading } = useViewSingleArticle(id);
    const [loader, setLoader] = useState(false);
    const [allPublisher] = useAllPublisher();
    const [selectedOption, setSelectedOption] = useState(singleArticle?.tags);
    const { _id, title, authorName, authorEmail, authorPhoto, publisher, description } = singleArticle;
    const axiosSecure = useAxiosSecure();
    const initialSelectedOption = selectedOption || [];

    // update article method
    const handleUpdateArticle = (event) => {
        event.preventDefault();
        setLoader(true);
        const form = event.target;
        const image = event.target.image.files[0];
        const title = form.title.value;
        const publisher = form.publisher.value;
        const description = form.description.value;

        // upload image
        imageUpload(image || singleArticle?.image)
            .then(data => {
                const imgUrl = data.data.display_url;
                const articleInfo = {
                    title,
                    authorName,
                    authorEmail,
                    authorPhoto,
                    publisher,
                    tags: selectedOption || singleArticle?.tags,
                    image: imgUrl,
                    description
                }
                axiosSecure.put(`/update-article/${_id}`, articleInfo)
                    .then(res => {
                        if (res.status === 200) {
                            toast.success(res?.data?.message);
                            setLoader(false);
                            refetch();
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
            <SectionTitle sectionTitle={'Update Article'} />

            <div className='flex items-center justify-center mb-8'>
                <div className='w-2/3 md:w-1/2 h-[120px] md:h-[156px] lg:h-[200px] transition-all duration-300 rounded-lg border border-slate-500'>
                    <img src={singleArticle?.image} className='w-full h-full object-cover object-top rounded-lg overflow-hidden' alt="article image" />
                </div>
            </div>

            <form onSubmit={handleUpdateArticle}>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className='flex flex-col items-start gap-1 w-full md:w-1/2'>
                            <label className='font-semibold' htmlFor="">Select Article Image</label>
                            <input accept='image/*' type="file" name='image' className='w-full py-[5px] px-2 border bg-transparent border-indigo-400 focus:border-indigo-500 rounded outline-none' />
                        </div>
                        <div className='flex flex-col items-start gap-1 w-full md:w-1/2'>
                            <label className='font-semibold' htmlFor="">article Name</label>
                            <input required defaultValue={title} type="text" name='title' placeholder='article name is here' className='w-full py-2 px-2 border bg-transparent border-indigo-400 focus:border-indigo-500 rounded outline-none' />
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className='flex flex-col items-start gap-1 w-full md:w-1/2'>
                            <label className='font-semibold' htmlFor="">User Name</label>
                            <input readOnly value={authorName} type="text" name='providerName' className='w-full py-2 px-2 border bg-transparent border-indigo-400 focus:border-indigo-500 rounded outline-none' />
                        </div>
                        <div className='flex flex-col items-start gap-1 w-full md:w-1/2'>
                            <label className='font-semibold' htmlFor="">User Email</label>
                            <input readOnly value={authorEmail} type="text" name='providerEmail' className='w-full py-2 px-2 border bg-transparent border-indigo-400 focus:border-indigo-500 rounded outline-none' />
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className='flex flex-col items-start gap-1 w-full md:w-1/2'>
                            <label className='font-semibold' htmlFor="">Select publisher</label>
                            <select required name="publisher" id="publisher" className='w-full py-2 px-2 border text-slate-600 dark:text-gray-100 bg-transparent dark:bg-[#101b33] border-indigo-400 focus:border-indigo-500 rounded outline-none'>
                                <option value={publisher?._id}>{publisher?.name}</option>
                                {
                                    allPublisher?.map((p, i) => <option key={i} value={p?._id}>{p?.name}</option>)
                                }
                            </select>
                        </div>
                        <div className='flex flex-col items-start gap-1 w-full md:w-1/2'>
                            <label className='font-semibold' htmlFor="">Tags</label>
                            {
                                isLoading && !singleArticle?.tags ? '' :
                                    <Select
                                        className='w-full border text-slate-600 border-indigo-400 focus:border-indigo-500 rounded outline-none'
                                        isMulti
                                        defaultValue={initialSelectedOption}
                                        onChange={setSelectedOption}
                                        options={newsTags}
                                    />
                            }
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className='flex flex-col items-start gap-1 w-full'>
                            <label className='font-semibold' htmlFor="">Description</label>
                            <textarea required defaultValue={description} rows={8} type="text" name='description' placeholder='Write your article description' className='w-full py-2 px-2 border bg-transparent border-indigo-400 focus:border-indigo-500 rounded outline-none' />
                        </div>
                    </div>

                    <div className='flex justify-center w-full mt-5'>
                        <button
                            disabled={loader ? true : false}
                            type="submit"
                            className={`py-2 px-4 w-fit bg-orange-500 hover:shadow-orange-500/20 hover:shadow-lg font-semibold text-white rounded-md mb-3 ${loader && 'bg-orange-400'} `}>
                            {
                                loader ? <Loader loadingText={'Updating Article...'} /> : 'Update Article'
                            }
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateArticle;