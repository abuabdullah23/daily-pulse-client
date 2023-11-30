import React from 'react';
import useCountAllUser from '../../../hooks/adminHooks/useCountUsers';
import { FaUsers } from 'react-icons/fa';
import { FaCircleUser } from "react-icons/fa6";
import { MdAdminPanelSettings, MdWorkspacePremium } from 'react-icons/md';

const UsersStatistics = () => {
    const { countAllUsers, refetch, isLoading } = useCountAllUser();

    return (
        <div>
            {/* Total Overview */}
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7'>
                {/* Total users */}
                <div className='flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#d0d2d6]'>
                        <h2 className='text-3xl font-bold'>{countAllUsers?.totalUser}</h2>
                        <span>Total users</span>
                    </div>
                    <div className='w-[46px] h-[46px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl'>
                        <FaUsers className='text-[#28c76f] shadow-lg font-semibold' />
                    </div>
                </div>

                {/* Total admin */}
                <div className='flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#d0d2d6]'>
                        <h2 className='text-3xl font-bold'>{countAllUsers?.totalAdmin}</h2>
                        <span>Admin</span>
                    </div>
                    <div className='w-[46px] h-[46px] rounded-full bg-[#e000e81f] flex justify-center items-center text-xl'>
                        <MdAdminPanelSettings className='text-[#cd00d8] shadow-lg font-semibold' />
                    </div>
                </div>

                {/* Total Premium User */}
                <div className='flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#d0d2d6]'>
                        <h2 className='text-3xl font-bold'>{countAllUsers?.totalPremiumUser}</h2>
                        <span>Premium user</span>
                    </div>
                    <div className='w-[46px] h-[46px] rounded-full bg-[#00cfe81f] flex justify-center items-center text-xl'>
                        <MdWorkspacePremium className='text-[#00cfe8] shadow-lg font-semibold' />
                    </div>
                </div>

                {/* Total Only user */}
                <div className='flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#d0d2d6]'>
                        <h2 className='text-3xl font-bold'>{countAllUsers?.onlyUser}</h2>
                        <span>Only user</span>
                    </div>
                    <div className='w-[46px] h-[46px] rounded-full bg-[#7367f01f] flex justify-center items-center text-xl'>
                    <FaCircleUser className='text-[#7367f0] shadow-lg font-semibold' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersStatistics;