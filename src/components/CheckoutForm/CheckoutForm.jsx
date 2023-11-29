import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutForm.css'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const CheckoutForm = ({ amount, period }) => {

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');

    const navigate = useNavigate();
    // console.log(clientSecret)

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: amount })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('error', error);
            setCardError(error.message)
        } else {
            setCardError('')
            // console.log('Payment method', paymentMethod)
        }

        setProcessing(true);

        setSuccess('')
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'Unknown',
                        name: user?.displayName || 'anonymous',
                    },
                },
            },
        );
        if (confirmError) {
            // console.log(confirmError);
        }
        console.log('payment Intent', paymentIntent);
        setProcessing(false)

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            setSuccess("Your Payment Successful.")
            const premiumUserInfo = {
                name: user?.displayName,
                email: user?.email,
                image: user?.photoURL,
                transactionId: paymentIntent.id,
                amount,
                period
            }
            axiosSecure.post('/save-subscription-info', premiumUserInfo)
                .then(res => {
                    console.log(res.data);
                    if (res?.data?.status === 200) {
                        toast.success(res?.data?.message)
                        navigate('/premium-articles')
                    }
                })
        }
        setProcessing(false);

        // console.log('card', card)
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='mb-10'>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '20px',
                                color: 'gray',
                                '::placeholder': {
                                    color: 'gray',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className='md:flex gap-5 items-center mt-8'>
                    <div className='flex justify-left'>
                        <button type="submit"
                            disabled={!stripe || !clientSecret || processing}
                            className='border border-slate-500 hover:bg-indigo-600 hover:text-white transition-all duration-300 py-1 px-2 rounded'>
                            Pay ${amount}
                        </button>
                    </div>
                    {
                        cardError && <p className='text-red-500 text-xl bg-neutral-200 py-3 px-5 rounded-md mt-5 md:mt-0'>{cardError}</p>
                    }

                    {
                        success && <>
                            <p className='text-green-600 text-xl bg-neutral-200 py-3 px-5 rounded-md mt-5 md:mt-0'>Your Transaction Id: {transactionId}</p>
                        </>
                    }
                </div>
            </form>
        </>
    );
};

export default CheckoutForm;