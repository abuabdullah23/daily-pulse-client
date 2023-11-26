import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import useAuth from '../../hook/useAuth';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { toast } from 'react-toastify';

const BookingModal = ({ isOpen, closeModal, singleService }) => {
    const axiosSecure = useAxiosSecure();

    const { _id, service, image, price, providerName, providerInfo, providerEmail, providerPhoto, location, description } = singleService;
    const { user } = useAuth();

    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const takingDate = form.takingDate.value;
        const instruction = form.instruction.value;

        const bookingInfo = {
            name: service,
            image,
            serviceId: _id,
            takingDate,
            price,
            providerName,
            providerEmail,
            providerInfo,
            providerPhoto,
            location,
            status: 'pending',
            userEmail: user?.email || 'Unknown',
            userName: user?.displayName,
            instruction,
            description
        }

        axiosSecure.post('/service-booking', bookingInfo)
            .then(res => {
                if (res.status === 200) {
                    toast.success('Service booking successful');
                    closeModal();
                }
            })
            .catch(error => {
                toast.error(error.message);
                closeModal();
            })
    }

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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg text-center font-medium leading-6 text-gray-900"
                                    >
                                        Review Info Before Book
                                    </Dialog.Title>

                                    <form onSubmit={handleBooking}>
                                        <div className="flex flex-col gap-3 mt-2 text-base">
                                            <div className='w-full h-[180px] md:h-[240px] lg:h-[360px] transition-all duration-300 p-3 border border-rose-400 rounded-md'>
                                                <img className='h-full w-full object-cover rounded-md' src={image} alt="service image" />
                                            </div>
                                            <div className='bg-rose-100 p-2 rounded-md'>
                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex items-center gap-2'>
                                                        <label className='font-semibold' htmlFor="">Service Name:</label>
                                                        <p>{service}</p>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex items-center gap-2'>
                                                        <label className='font-semibold' htmlFor=""> Provider Email:</label>
                                                        <p>{providerEmail}</p>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex items-center gap-2'>
                                                        <label className='font-semibold' htmlFor=""> Price:</label>
                                                        <p>${price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex items-center gap-2'>
                                                    <label className='font-semibold' htmlFor="">User Email:</label>
                                                    <p>{user?.email}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex items-center gap-2'>
                                                    <label className='font-semibold' htmlFor="">Service Taking Date:</label>
                                                    <input required type="date" name='takingDate' className='py-1 px-2 border border-rose-200 focus:border-rose-500 rounded outline-none' />
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col items-start gap-2'>
                                                    <label className='font-semibold' htmlFor="">Special Instruction:</label>
                                                    <textarea required type="text" name='instruction' placeholder='Write Instruction, anything like address , area, customized service plan' className='w-full py-1 px-2 border border-rose-200 focus:border-rose-500 rounded outline-none' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex justify-center">
                                            <button
                                                disabled={providerEmail === user?.email ? true : false}
                                                type="submit"
                                                className="rounded-md border-2 hover:border-rose-500 py-2 px-3 bg-rose-500 font-semibold hover:bg-transparent text-white hover:text-rose-500 transition-all duration-300"
                                            >
                                                Purchase this Service
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default BookingModal;