import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import { useSearchParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAdmin from '../../hooks/useAdmin';

//  Payment publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getaway_PK)

const MakePayment = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const amount = searchParams.get('amount');
    const period = searchParams.get('period');
    const { user } = useAuth();

    return (
        <div>
            <div className="w-full bg-slate-600 bg-[url(https://i.ibb.co/g3FS1bQ/payment-banner-hq-01.png)] bg-center bg-blend-multiply bg-cover">

                <div className="container flex flex-col flex-wrap content-center justify-center p-4 py-10 md:py-16 lg:py-20 mx-auto md:p-10">
                    <h1 className="text-3xl md:text-5xl antialiased font-semibold leadi text-center text-gray-100">Make Payment</h1>
                </div>
            </div>

            <div className='p-5 border border-slate-500 my-12 rounded w-full'>
                <h3 className='text-xl py-4 font-semibold text-center'>Review your info before checkout</h3>
                {/* Payment Details */}
                <div className='flex items-center justify-center'>
                    <div className='pb-12 text-base font-normal flex flex-col gap-1'>
                        <h3>Name: <span className='font-medium'>{user?.displayName}</span></h3>
                        <h3>Email: <span className='font-medium'>{user?.email}</span></h3>
                        <h3>Amount: <span className='font-medium'>${amount}</span></h3>
                        <h3 className='text-red-600 dark:text-[#fca311]'>Subscription Period: <span className='font-medium'>{period}</span> </h3>
                    </div>
                </div>

                {/* Payment Card */}
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            amount={amount}
                            period={period}
                        ></CheckoutForm>
                    </Elements>
                </div>
            </div>

        </div>
    );
};

export default MakePayment;