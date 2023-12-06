import React, { useState } from 'react';
import useSingleUser from '../../hooks/useSingleUser';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { firstCharCapitalize } from '../../utils/firstCharCapitalize';
import useAdmin from '../../hooks/useAdmin';
import { MdWorkspacePremium } from 'react-icons/md';
import moment from 'moment';
import Loader from '../../components/Loader/Loader';
import { FaEdit } from 'react-icons/fa';
import { HiMiniXMark } from 'react-icons/hi2';
import { imageUpload } from '../../utils/imageUpload';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { FadeLoader } from 'react-spinners';
import useAuth from '../../hooks/useAuth';

const MyProfile = () => {
    const { singleUser, refetch, isLoading } = useSingleUser();
    const { _id, email, name, image, role, isPremium, takenPremium, expiresPremium, createdAt } = singleUser;
    const [show, setShow] = useState(false);
    const [isAdmin] = useAdmin();
    const [loader, setLoader] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { handleUpdateProfile, user } = useAuth();


    // update profile info
    const updateProfileInfo = (event) => {
        event.preventDefault();
        setLoader(true);
        const form = event.target;
        const yourName = form.yourName.value;
        const profileImage = event.target.profileImage.files[0];

        // const isChange = yourName !== name || profileImage !== image;
        const isChange = yourName !== name || event.target.profileImage.files.length > 0;

        if (!isChange) {
            toast.error("You didn't change anything");
            setLoader(false);
            return;
        }

        // upload image
        imageUpload(profileImage || image)
            .then(data => {
                const imgUrl = data.data.display_url;

                // update in firebase
                handleUpdateProfile(name, imgUrl)
                    .then(() => {
                        toast.success('Successfully Updated your Profile!')
                        setLoader(false)
                        refetch();
                        setShow(false);
                    })
                    .catch(error => {
                        toast.error(error.message)
                        setLoader(false)
                        refetch();
                        setShow(false);
                    })



                // update in database
                // const updateInfo = {
                //     yourName,
                //     imgUrl: imgUrl || image
                // }

                // // put method for update profile info
                // axiosSecure.put(`/update-user-profile/${_id}`, updateInfo)
                //     .then(res => {
                //         if (res.status === 200) {
                //             toast.success(res?.data?.message);
                //             form.reset('');
                //             setLoader(false);
                //             setShow(false);
                //             refetch();
                //         }
                //     })
                //     .catch(error => {
                //         toast.error(error.message);
                //         form.reset('');
                //         setLoader(false);
                //         setShow(false);
                //     })


            })
    }

    return (
        <div className='pb-28'>
            <SectionTitle sectionTitle={`${name}'s Profile`} />

            {isLoading ? <LoadingSpinner /> : <>
                <div className='w-full flex flex-col md:flex-row items-center justify-start gap-8 my-16'>
                    <div className='w-full md:w-1/2 flex items-center justify-center'>
                        {
                            loader && <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                                <FadeLoader />
                            </div>
                        }
                        <div className='w-[300px] h-[300px]'>
                            <img className='w-full h-full rounded object-cover object-top' src={user?.photoURL} alt="user photo" />
                        </div>
                    </div>

                    <div className='w-full md:w-1/2 text-lg font-light border border-slate-600 p-3 md:p-5 lg:p-8 transition-all duration-300 rounded flex flex-col gap-1'>
                        <h3>Name: <span className='font-normal'>{name}</span> </h3>
                        <p>Email: <span className='font-normal'>{email}</span></p>
                        <p>Role: <span className='font-normal'>{firstCharCapitalize(role)}</span></p>
                        <p>Member Since: <span className='py-1 font-light whitespace-nowrap' title={moment(createdAt).format("D MMMM YYYY, dddd, h:mm:ss A")}>
                            <span className='text-base font-normal'>{moment(createdAt).format("D MMMM, YYYY")}</span>
                        </span></p>
                        <div>
                            {isAdmin ? '' :
                                <p className='flex items-center gap-2'>Premium Status: {isPremium ?
                                    <span className='py-[2px] px-1 w-fit text-xs bg-green-600 text-white rounded-sm flex items-center gap-1'>
                                        <MdWorkspacePremium className='h-[16px] w-[16px]' />
                                        <span>Premium</span>
                                    </span> :
                                    <span className='py-[2px] px-1 w-fit text-xs bg-red-600 text-white rounded-sm flex items-center gap-1'>
                                        <span>Not Premium</span>
                                    </span>}
                                </p>
                            }
                        </div>


                        {/* premium status */}
                        {
                            isPremium &&
                            <div className='p-2 border border-green-500 rounded mb-3'>
                                <p>Start: <span className='py-1 font-light whitespace-nowrap' title={moment(takenPremium).format("D MMMM YYYY, dddd, h:mm:ss A")}>
                                    <span className='text-base font-normal'>{moment(takenPremium).format("D MMM, YYYY | h:mm:ss A")}</span>
                                </span></p>
                                <p className='text-[#ffbc04]'>End: <span className='py-1 font-light whitespace-nowrap' title={moment(expiresPremium).format("D MMMM YYYY, dddd, h:mm:ss A")}>
                                    <span className='text-base font-normal'>{moment(expiresPremium).format("D MMM, YYYY | h:mm:ss A")}</span>
                                </span></p>
                            </div>
                        }


                        {/* Update profile */}
                        <div className='relative'>
                            <div className='flex items-center justify-end'>
                                <button onClick={() => setShow(!show)} className='text-center w-fit py-[5px] px-[5px] rounded-sm bg-[#ffbc04] hover:bg-[#ff9204] text-[#151547] hover:text-white flex items-center justify-start gap-2 z-10 transition-all duration-500'>
                                    {show
                                        ?
                                        <> <HiMiniXMark /> </>
                                        :
                                        <> <FaEdit />

                                        </>
                                    }
                                </button>
                            </div>

                            <div className={`transition-all duration-300 ease-in-out absolute right-1 top-4 bg-white dark:bg-slate-950 rounded-md border border-slate-500 overflow-y-auto w-full ${!show ? 'w-[0px] h-[0px]' : 'h-[220px]'}`}>
                                <form
                                    onSubmit={updateProfileInfo}
                                    className='flex flex-col gap-3 p-4 text-base font-normal'>
                                    <div className='flex flex-col w-full gap-1'>
                                        <label htmlFor="yourName">Name</label>
                                        <input className='px-4 py-[6px] text-[15px] border border-slate-700 focus:border-indigo-500 outline-none bg-transparent rounded-md' name='yourName' id='yourName' defaultValue={name} type="text" placeholder='Your Name' required />
                                    </div>
                                    <div className='flex flex-col w-full gap-1'>
                                        <label htmlFor='profileImage' className='block'> Select Image </label>
                                        <input type='file' id='profileImage' name='profileImage' accept='image/*' className='px-4 py-1 text-[15px] border border-slate-700 focus:border-indigo-500 outline-none bg-transparent rounded-md' />
                                    </div>

                                    <button
                                        disabled={loader ? true : false}
                                        type="submit"
                                        className={`py-1 px-3 w-fit bg-orange-500 hover:shadow-orange-500/20 hover:shadow-lg text-white rounded ${loader && 'bg-orange-400'} `}>
                                        {
                                            loader ? <Loader loadingText={'Updating Info...'} /> : 'Update Info'
                                        }
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>

                </div>
            </>

            }
        </div>
    );
};

export default MyProfile;