import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionCountdown = ({ expirationTime }) => {
    const navigate = useNavigate();

    const calculateTimeRemaining = () => {
        const currentTime = new Date();
        const remainingTime = new Date(expirationTime) - currentTime;

        if (remainingTime <= 0) {
            // If the remaining time is negative or zero, the countdown has ended
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
        const intervalId = setInterval(() => {
            const remainingTime = calculateTimeRemaining();
            setTimeRemaining(remainingTime);

            // navigate after end the subscription period
            if (remainingTime.days === 0 && remainingTime.hours === 0 && remainingTime.minutes === 0 && remainingTime.seconds === 0) {

                
                // Reload the page after navigation
                window.location.reload();

                // If the countdown has ended, navigate to the subscription page
                // navigate('/subscription');
            }

        }, 1000);

        return () => clearInterval(intervalId); // Clear the interval on component unmount
    }, [expirationTime, navigate]);

    return (
        <div className='w-fit text-base flex items-center justify-center gap-1 bg-green-600 text-white py-[2px] px-[5px] rounded-sm whitespace-nowrap'>
            <p>Remaining:</p>
            <p>{timeRemaining.days} days</p>
            <p>{timeRemaining.hours}h : </p>
            <p>{timeRemaining.minutes}m : </p>
            <p>{timeRemaining.seconds}s</p>
        </div>
    );
};

export default SubscriptionCountdown;
