import moment from 'moment/moment';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { MdWorkspacePremium } from 'react-icons/md';

const ArticleRow = ({ article, index, refetch }) => {
    const { _id, title, authorName, authorEmail, authorPhoto, publisher, isPremium, tags, image, articleStatus, createdAt } = article;

    const axiosSecure = useAxiosSecure();


    // handle approve article
    const handleApproveArticle = (id) => {
        Swal.fire({
            title: 'Are you sure to Approve?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes, Approve!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`approved-article/${id}`)
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

    // handle pending article
    const handlePendingArticle = (id) => {
        Swal.fire({
            title: 'Are you sure to Pending back?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes, Pending!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`make-pending/${id}`)
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


    // handle make premium article
    const handleMakePremium = (id) => {
        Swal.fire({
            title: 'Are you sure to Premium this article?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`make-premium/${id}`)
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

    // handle remove premium article
    const handleRemovePremium = (id) => {
        Swal.fire({
            title: 'Are you sure to remove Premium this article?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`remove-premium/${id}`)
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

    // handle delete article
    const handleDeleteArticle = (id) => {
        Swal.fire({
            title: 'Are you sure to Delete this article?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes, Delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`delete-article/${id}`)
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
        <tr className='border-b-2 border-slate-800 hover:bg-slate-900 transition-all duration-300'>
            <td scope='row' className='py-4 px-4 font-medium whitespace-nowrap'>
                <div className='w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center'>{index + 1}</div>
            </td>

            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'><img className='h-8 w-11 object-cover border rounded border-[#2d5dc4]' src={image} alt="publisher image" /></td>

            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'><span title={title}>{title.slice(0, 10)}...</span></td>

            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'><span title={publisher?.name}>{publisher?.name.slice(0, 12)}...</span></td>

            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                <div className='flex justify-start items-center gap-2'>
                    <div className='h-10 w-10'>
                        <img className='h-full w-full object-contain rounded-full border  border-[#2d5dc4]' src={authorPhoto} alt="publisher image" />
                    </div>
                    <div className='flex flex-col'>
                        <p>{authorName}</p>
                        <p>{authorEmail}</p>
                    </div>
                </div>
            </td>

            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap' title={moment(createdAt).format("D MMMM YYYY, dddd, h:mm:ss A")}>
                {moment(createdAt).format("D-MMM-YYYY")}
            </td>

            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                <span className={`py-[2px] px-2 text-white rounded-sm ${articleStatus === 'pending' ? 'bg-[#ffd104] text-slate-800' : articleStatus === 'approved' ? 'bg-green-500' : 'bg-red-500'}`} >{articleStatus}</span>
            </td>

            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                <div className='flex justify-start items-center gap-4 text-white'>
                    <div className='flex gap-1'>
                        {
                            articleStatus === 'decline'
                                ?
                                <button
                                    onClick={() => handlePendingArticle(_id)}
                                    title='Make Pending Article'
                                    className='py-[2px] px-1 bg-[#ffd104] text-slate-800 rounded-sm hover:shadow-lg hover:shadow-[#ffd104]/50'>pending
                                </button>
                                :
                                <button
                                    onClick={() => handleDecline(_id)}
                                    title='Decline Article'
                                    className='py-[2px] px-1 bg-red-500 rounded-sm hover:shadow-lg hover:shadow-red-500/50'>decline
                                </button>
                        }
                        {
                            articleStatus === 'approved'
                                ?
                                <button
                                    onClick={() => handlePendingArticle(_id)}
                                    title='Make Pending Article'
                                    className='py-[2px] px-1 bg-[#ffd104] text-slate-800 rounded-sm hover:shadow-lg hover:shadow-[#ffd104]/50'>pending
                                </button>
                                :
                                <button
                                    onClick={() => handleApproveArticle(_id)}
                                    title='Approve Article'
                                    className='py-[2px] px-1 bg-blue-500 rounded-sm hover:shadow-lg hover:shadow-blue-500/50'>approve
                                </button>
                        }
                    </div>

                    <div className='flex gap-1'>
                        <button
                            onClick={() => handleDeleteArticle(_id)}
                            title='Delete Article'
                            className='py-[2px] px-2 bg-red-500 rounded-sm hover:shadow-lg hover:shadow-red-500/50 flex flex-row items-center gap-1'><FaTrashAlt />
                        </button>
                        {isPremium === 'false' ? <button
                            onClick={() => handleMakePremium(_id)}
                            title='Make Premium Article'
                            className='py-[2px] px-1 bg-indigo-500 rounded-sm hover:shadow-lg hover:shadow-indigo-500/50'>Make Premium
                        </button> : <button
                            onClick={() => handleRemovePremium(_id)}
                            title='Remove Premium Article'
                            className='py-[2px] px-1 bg-green-500 rounded-sm hover:shadow-lg hover:shadow-green-500/50 flex items-center gap-1'><MdWorkspacePremium className='h-5 w-5' /> <span>Premium</span>
                        </button>}
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default ArticleRow;