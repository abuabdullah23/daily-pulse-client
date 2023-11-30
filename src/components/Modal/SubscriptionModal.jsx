import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom';

const SubscriptionModal = ({ isOpen, closeModal }) => {

    return (
        <div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[9999]" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-200 dark:bg-[#14213d] text-slate-700 dark:text-gray-100 p-6 text-left align-middle shadow-xl border-2 border-[#2e56ad] transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg text-center font-medium leading-6"
                                    >
                                        Subscribe Please!
                                    </Dialog.Title>

                                    <div>
                                        <div className="flex flex-col gap-3 mt-2 text-base">
                                            <div className='w-full h-[180px] md:h-[200px] lg:h-[240px] transition-all duration-300 p-2 border border-[#203c79] rounded-md'>
                                                <img className='h-full w-full object-cover rounded-md' src='https://i.ibb.co/KWkhsWz/payment.webp' alt="service image" />
                                            </div>

                                            <div className='flex flex-col gap-4'>
                                                <div className="modal-content">
                                                    <p>Subscribe now to unlock premium Articles!</p>

                                                </div>
                                                <div className='flex justify-between'>
                                                    <Link to='/subscription'
                                                        className="rounded-md border-2 hover:border-[#203c79] py-2 px-3 bg-[#203c79] font-semibold w-fit hover:bg-transparent text-white hover:text-slate-700 dark:hover:text-[#ffffff] transition-all duration-300"
                                                    >Subscribe</Link>
                                                    <button
                                                        onClick={closeModal}
                                                        className="rounded-md border-2 hover:border-[#fcd111] py-2 px-3 bg-[#fca311] font-semibold w-fit hover:bg-transparent text-white hover:text-slate-200 dark:hover:text-[#ffffff] transition-all duration-300"
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default SubscriptionModal;