import React from 'react';
import { FaTrashAlt, FaUser } from 'react-icons/fa';
import { MdRemoveModerator } from "react-icons/md";
import useAllUser from '../../../hooks/useAllUser';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';

const AllUsers = () => {
    const [allUser, refetch] = useAllUser();
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
            <div className='flex flex-wrap w-full'>
                <div className='w-full p-4 bg-[#283046] rounded-md'>
                    {/* Table data */}
                    <h1 className='text-[#d0d2d6] font-semibold text-base mb-2'>All Users: {allUser.length}</h1>

                    <div className='relative overflow-x-auto overflow-y-auto h-[calc(100vh-200px)]'>
                        <table className='w-full text-sm text-left text-[#ffffff]'>
                            <thead className='text-sm text-[#ececec] uppercase border-b border-slate-700'>
                                <tr>
                                    <th scope='col' className='py-3 px-4'>No</th>
                                    <th scope='col' className='py-3 px-4'>Image</th>
                                    <th scope='col' className='py-3 px-4'>Email</th>
                                    <th scope='col' className='py-3 px-4'>Name</th>
                                    <th scope='col' className='py-3 px-4'>Role</th>
                                    <th scope='col' className='py-3 px-4'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allUser.map((u, i) => <tr key={i}>
                                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{i + 1}</td>
                                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'><img className='h-11 w-11 object-contain border rounded bg-gray-100' src={u?.image} alt="publisher image" /></td>
                                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'><span>{u?.email}</span></td>
                                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'><span>{u?.name}</span></td>

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
                </div>

            </div>
        </div>
    );
};

export default AllUsers;