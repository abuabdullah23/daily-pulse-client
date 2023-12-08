import React, { useState } from 'react';
import { FaTrashAlt, FaUser } from 'react-icons/fa';
import { MdRemoveModerator, MdWorkspacePremium } from "react-icons/md";
import useAllUser from '../../../hooks/useAllUser';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import Pagination from '../../../components/Pagination/Pagination';
import LoadingSpinner from '../../../components/LoadingComp/LoadingSpinner/LoadingSpinner';
import UsersStatistics from './UsersStatistics';
import useCountAllUser from '../../../hooks/adminHooks/useCountUsers';

const AllUsers = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const { totalUser, allUser, refetch, isLoading } = useAllUser({ pageNumber, perPage });
    const { refetch: refetchUser } = useCountAllUser();

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    // handleDeleteUser
    const handleDeleteUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes, delete user!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-user/${id}`)
                    .then(res => {
                        if (res.status === 200) {
                            toast.success('User deleted successful');
                            refetch();
                            refetchUser();
                        }
                    })
                    .catch(error => {
                        toast.error(error.message);
                    })
            }
        })
    }


    // handle Make Admin
    const handleMakeAdmin = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes, Make Admin!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/make-admin/${id}`)
                    .then(res => {
                        if (res.status === 200) {
                            toast.success('Successfully make admin');
                            refetch();
                            refetchUser();
                        }
                    })
                    .catch(error => {
                        toast.error(error.message);
                    })
            }
        })
    }

    // handle Remove Admin
    const handleRemoveAdmin = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes, Remove Admin!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/remove-admin/${id}`)
                    .then(res => {
                        if (res.status === 200) {
                            toast.success('Successfully remove admin');
                            refetch();
                            refetchUser();
                        }
                    })
                    .catch(error => {
                        toast.error(error.message);
                    })
            }
        })
    }

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <UsersStatistics />

            <div className='flex flex-wrap w-full mt-5'>
                <div className='w-full p-4 bg-[#283046] rounded-md'>
                    {/* Table data */}
                    <h1 className='text-[#d0d2d6] font-semibold text-base mb-2'>All Users: {totalUser}</h1>
                    {
                        isLoading ? <LoadingSpinner /> :

                            <div className='relative overflow-x-auto'>
                                <table className='w-full text-sm text-left text-[#ffffff]'>
                                    <thead className='text-sm text-[#ececec] uppercase border-b border-slate-700 bg-slate-900'>
                                        <tr>
                                            <th scope='col' className='py-3 px-4'>No</th>
                                            <th scope='col' className='py-3 px-4'>Image</th>
                                            <th scope='col' className='py-3 px-4'>Email</th>
                                            <th scope='col' className='py-3 px-4'>Name</th>
                                            <th scope='col' className='py-3 px-4'>Is Premium</th>
                                            <th scope='col' className='py-3 px-4'>Role</th>
                                            <th scope='col' className='py-3 px-4'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allUser.map((u, i) => <tr key={i}>
                                                <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{i + 1}</td>

                                                <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'><img className='h-11 w-11 object-cover object-center border rounded border-blue-800' src={u?.image} alt="publisher image" /></td>

                                                <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'><span>{u?.email}</span></td>

                                                <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'><span>{u?.name}</span></td>

                                                <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                                    {u?.role === 'admin' ? '' :
                                                        <p className='flex items-center gap-2'>{u?.isPremium ?
                                                            <span className='py-[2px] px-1 w-fit text-xs bg-green-600 text-white rounded-sm flex items-center gap-1'>
                                                                <MdWorkspacePremium className='h-[16px] w-[16px]' />
                                                                <span>Premium</span>
                                                            </span> :
                                                            <span className='py-[2px] px-1 w-fit text-xs bg-red-600 text-white rounded-sm flex items-center gap-1'>
                                                                <span>only user</span>
                                                            </span>}
                                                        </p>
                                                    }
                                                </td>

                                                <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                                    {
                                                        u?.role !== 'admin' ? <button
                                                            onClick={() => handleMakeAdmin(u?._id)}
                                                            title='Make Admin'
                                                            className='py-0.5 px-2 rounded bg-indigo-500 text-gray-50'>make admin</button> : <span className='py-0.5 px-2 rounded bg-green-500 text-gray-50'>{u?.role}</span>
                                                    }

                                                </td>
                                                <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                                    {
                                                        user?.email !== u?.email && <div className='flex justify-start items-center gap-4'>
                                                            {
                                                                u?.role === 'admin' ? <button
                                                                    onClick={() => handleRemoveAdmin(u?._id)}
                                                                    title='Remove Admin'
                                                                    className='p-[6px] bg-orange-500 rounded-sm hover:shadow-lg hover:shadow-orange-500/50'><MdRemoveModerator /></button> : <span title='User' className='p-[6px] bg-blue-500 rounded-sm hover:shadow-lg hover:shadow-blue-500/50'><FaUser />
                                                                </span>
                                                            }
                                                            <button
                                                                onClick={() => handleDeleteUser(u._id)}
                                                                title='Delete User'
                                                                className='p-[6px] bg-red-500 rounded-sm hover:shadow-lg hover:shadow-red-500/50'><FaTrashAlt /></button>
                                                        </div>
                                                    }
                                                </td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                    }

                    {/* pagination */}
                    <div className='flex items-center justify-end gap-8 mt-12'>
                        <div className='flex items-center gap-3'>
                            <div><p>Per Page</p></div>
                            <select onChange={(e) => setPerPage(parseInt((e.target.value)))} className='px-4 py-1 border border-slate-700 focus:border-gray-500 outline-none bg-gray-200 rounded-md text-slate-600'>
                                <option value={perPage}>{perPage}</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="50">50</option>

                            </select>
                        </div>
                        {
                            totalUser > perPage && <Pagination
                                pageNumber={pageNumber}
                                setPageNumber={setPageNumber}
                                totalItem={totalUser}
                                perPage={perPage}
                                showItem={(Math.floor(totalUser / perPage)) + 2} />
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AllUsers;