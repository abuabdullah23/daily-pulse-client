import { useState } from 'react';
import Loader from '../../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { BsImage } from 'react-icons/bs';
import { imageUpload } from '../../../utils/imageUpload';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useAllPublisher from '../../../hooks/useAllPublisher';
import Swal from 'sweetalert2';

const AddPublisher = () => {
    const [show, setShow] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [loader, setLoader] = useState(false);
    const [imageShow, setImageShow] = useState('');
    const [image, setImage] = useState('');
    const [allPublisher, refetch] = useAllPublisher();

    // handleImage
    const handleImage = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setImageShow(URL.createObjectURL(files[0]))
            setImage(files[0])
        }
    }

    // handle add publisher
    const handleAddPublisher = (e) => {
        e.preventDefault();
        setLoader(true);
        const form = e.target;
        const name = form.name.value;

        // upload image
        imageUpload(image)
            .then(data => {
                const imgUrl = data.data.display_url;

                // save in the database
                axiosSecure.post('/add-publisher', { name, image: imgUrl })
                    .then((res) => {
                        console.log(res);
                        if (res?.status === 200) {
                            toast.success(res?.data?.message);
                            form.reset('');
                            setImageShow(''); // Reset the imageShow state
                            setImage('');
                            setLoader(false);
                            refetch();
                        }
                    })
                    .catch(error => {
                        console.log(error.message);
                        setLoader(false);
                        toast.error('Publisher already exists');
                    })
            })
    }


    // delete publisher by id
    const handleDeletePublisher = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-publisher/${id}`)
                    .then(res => {
                        if (res.status === 200) {
                            toast.success('Delete your publisher successful');
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
            {/* Conditional rendering: show only small device */}
            <div className='flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md'>
                <h1 className='text-[#d0d2d6] font-semibold text-base'>Publishers: {allPublisher.length}</h1>
                <button onClick={() => setShow(true)} className='bg-orange-500 shadow-lg hover:shadow-orange-500/50 px-4 py-2 cursor-pointer text-white rounded-sm text-sm'>Add</button>
            </div>

            <div className='flex flex-wrap w-full'>
                <div className='w-full lg:w-7/12 p-4 bg-[#283046] rounded-md'>
                    {/* Table data */}
                    <h1 className='text-[#d0d2d6] font-semibold text-base hidden lg:block mb-2'>Publishers: {allPublisher.length}</h1>

                    <div className='relative overflow-x-auto overflow-y-auto h-[calc(100vh-200px)]'>
                        <table className='w-full text-sm text-left text-[#ffffff]'>
                            <thead className='text-sm text-[#ececec] uppercase border-b border-slate-700'>
                                <tr>
                                    <th scope='col' className='py-3 px-4'>No</th>
                                    <th scope='col' className='py-3 px-4'>Logo</th>
                                    <th scope='col' className='py-3 px-4'>Name</th>
                                    <th scope='col' className='py-3 px-4'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allPublisher.map((item, i) => <tr key={i}>
                                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{i + 1}</td>
                                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'><img className='h-11 w-11 object-contain border rounded bg-gray-100' src={item.image} alt="publisher image" /></td>
                                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'><span>{item.name}</span></td>
                                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                            <div className='flex justify-center items-center gap-4'>
                                                {/* <Link className='p-[6px] bg-orange-500 rounded-sm hover:shadow-lg hover:shadow-orange-500/50'><FaEdit /></Link> */}
                                                <button onClick={() => handleDeletePublisher(item._id)} className='p-[6px] bg-red-500 rounded-sm hover:shadow-lg hover:shadow-red-500/50'><FaTrashAlt /></button>
                                            </div>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>

                </div>

                <div className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${show ? 'right-0 z-[9999]' : '-right-[340px]'}  top-0 transition-all duration-500`}>
                    <div className='w-full pl-6'>
                        <div className='bg-[#283046] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]'>
                            <div className='flex justify-between items-center mb-4'>
                                <h2 className='font-semibold text-xl'>Add Publisher</h2>
                                <div onClick={() => setShow(false)} className='block lg:hidden cursor-pointer'>
                                    <AiOutlineClose className='text-[#d0d2d6]' />
                                </div>
                            </div>
                            <form onSubmit={handleAddPublisher}>
                                <div className='flex flex-col w-full gap-1 mb-3'>
                                    <label htmlFor="name">Publisher name</label>
                                    <input className='px-4 py-2 border border-slate-700 focus:border-indigo-500 outline-none bg-[#283046] rounded-md text-[#d0d2d6]'
                                        type="text" id='name' name='name' placeholder='publisher name' required />
                                </div>
                                <div>
                                    <label className='flex flex-col justify-center items-center h-[238px] cursor-pointer border border-[#d0d2d6] border-dashed hover:border-indigo-500 w-full' htmlFor="image">
                                        {
                                            imageShow ? <img className='h-full w-full object-cover object-top' src={imageShow} alt="image" /> :
                                                <>
                                                    <span><BsImage /></span>
                                                    <span>Select Image</span>
                                                </>
                                        }
                                    </label>
                                </div>
                                <input
                                    onChange={handleImage}
                                    className='hidden' type="file" name="image" id="image" required />
                                <div className='mt-3'>
                                    {/* submit button */}
                                    <button
                                        disabled={loader ? true : false}
                                        type="submit"
                                        className={`py-2 px-4 w-full bg-orange-500 hover:shadow-orange-500/20 hover:shadow-lg text-white rounded-md mb-3 ${loader && 'bg-orange-400'} `}>
                                        {
                                            loader ? <Loader loadingText={'Uploading...'} /> : 'Add Publisher'
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AddPublisher;