import React, { useEffect, useState } from 'react';

const TimePicker = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        setInterval(() => setTime(new Date()), 1000)
    }, [])

    return (
        <p className='text-sm whitespace-nowrap'>
            {time.toLocaleTimeString()}
        </p>
    );
};

export default TimePicker;