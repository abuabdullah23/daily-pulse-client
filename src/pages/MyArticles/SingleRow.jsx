import React, { useState } from 'react';
import ViewFeedbackModal from '../../components/Modal/ViewFeedbackModal';
import moment from 'moment';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BsCheck } from 'react-icons/bs';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const SingleRow = ({ article, index, refetch }) => {
    const { _id, title, authorName, authorEmail, authorPhoto, publisher, isPremium, tags, image, articleStatus, createdAt } = article;

    const axiosSecure = useAxiosSecure();

    // for modal
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false)
    }


    // handle delete my article
    const handleDeleteMyArticle = (id) => {
        Swal.fire({
            title: 'Are you sure to Delete your article?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes, Delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`delete-my-article/${id}`)
                    .then(res => {
                        if (res.status === 200) {
                            refetch();
                            toast.success(res.data.message);
                        }
                    })
                    .catch(error => {
                        toast.error(error.message);
                    })
            }
        })
    }

    return (
        <tr className='border-b-2 border-slate-300 dark:border-slate-800 hover:bg-gray-300 dark:hover:bg-slate-900 transition-all duration-300'>
            <td scope='row' className='py-4 px-4 font-medium whitespace-nowrap'>
                <div className='w-8 h-8 bg-slate-300 dark:bg-slate-700 rounded-full flex items-center justify-center'>{index + 1}</div>
            </td>

            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'><img className='h-8 w-11 object-cover border rounded border-[#2d5dc4]' src={image} alt="publisher image" /></td>

            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'><span title={title}>{title.slice(0, 20)}...</span></td>

            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap text-white'>
                {
                    isPremium === 'true'
                        ? <p className='py-0.5 px-2 bg-green-500 rounded w-fit flex items-center gap-2'><BsCheck className='text-xl' /> <span>Yes</span> </p>
                        : <span className='py-0.5 px-2 bg-[#ffd104] rounded text-slate-700'>No</span>
                }
            </td>

            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap' title={moment(createdAt).format("D MMMM YYYY, dddd, h:mm:ss A")}>
                {moment(createdAt).format("D-MMM-YYYY")}
            </td>

            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                <div className='flex items-center h-6'>
                    <span className={`py-[2px] px-2 h-full ${articleStatus === 'pending' ? 'bg-[#ffd104] text-black rounded-sm' : articleStatus === 'approved' ? 'bg-green-500 text-white rounded-sm' : 'bg-[#ff2929] text-white rounded-l-sm'}`} >{articleStatus}</span>
                    {
                        articleStatus === 'decline' &&
                        <button onClick={() => setIsOpen(true)}
                            title='View the reason of decline'
                            className='`py-[2px] px-2 h-full text-white bg-green-500 rounded-r-sm'><FaEye />
                        </button>
                    }
                </div>
                <ViewFeedbackModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    closeModal={closeModal}
                    article={article}
                    refetch={refetch}
                />
            </td>

            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                <div className='flex justify-start items-center gap-4 text-white'>


                    <div className='flex gap-2'>
                        <Link to={`/details/${_id}`}
                            title='View Article'
                            className='py-[2px] px-2 bg-indigo-500 rounded-sm hover:shadow-lg hover:shadow-indigo-500/50 flex flex-row items-center gap-1'><FaEye /> <span>view</span>
                        </Link>
                        <Link to={`/update-article/${_id}`}
                            title='Edit Article'
                            className='py-[2px] px-2 text-slate-800 bg-[#ffb004] rounded-sm hover:shadow-lg hover:shadow-[#ffb004]/50 flex flex-row items-center gap-1'><FaEdit /> <span>edit</span>
                        </Link>
                        <button
                            onClick={() => handleDeleteMyArticle(_id)}
                            title={isPremium === 'true' || articleStatus === 'approved' ? 'You can not delete this article' : 'Delete Article'}
                            disabled={isPremium === 'true' || articleStatus === 'approved' ? true : false}
                            className='py-[2px] px-2 bg-[#ff2929] rounded-sm hover:shadow-lg hover:shadow-[#ff2929]/50 flex flex-row items-center gap-1'><FaTrashAlt /> <span>delete</span>
                        </button>

                    </div>
                </div>
            </td>
        </tr >
    );
};

export default SingleRow;

