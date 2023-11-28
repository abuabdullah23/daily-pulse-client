import './CustomSlider.css'
import { useState, useEffect } from 'react';
import img1 from '../../assets/images/slider/1.jpg'
import img2 from '../../assets/images/slider/2.jpg'
import img3 from '../../assets/images/slider/3.jpg'
import img4 from '../../assets/images/slider/4.jpg'

const CustomSlider = () => {
    const items = [img1, img2, img3, img4];
    const [active, setActive] = useState(0);

    const next = () => {
        setActive((active + 1) % items.length);
    };

    const prev = () => {
        setActive((active - 1 + items.length) % items.length);
    };

    useEffect(() => {
        const refreshInterval = setInterval(next, 4000);

        return () => {
            clearInterval(refreshInterval);
        };
    }, [active]);

    const dots = items.map((_, index) => (
        <li
            key={index}
            className={index === active ? 'active' : ''}
            onClick={() => setActive(index)}
        ></li>
    ));

    const sliderStyle = {
        left: `-${active * 100}%`,
    };

    return (
        <div className='overflow-hidden'>
            <div className="slider">
               
                <div className="list mt-4" style={sliderStyle}>
                    {items.map((src, index) => (
                        <div key={index} className="item">
                            <img className='border-4 border-red-500' src={src} alt="slider image" />
                        </div>
                    ))}
                </div>
                
                
                <div className='buttons-div'>
                    <div className="buttons">
                        <button id="prev" onClick={prev}>
                            &lt;
                        </button>
                        <button id="next" onClick={next}>
                            &gt;
                        </button>
                    </div>
                </div>

                <ul className="dots">{dots}</ul>
            </div>
        </div>
    );
};

export default CustomSlider;
