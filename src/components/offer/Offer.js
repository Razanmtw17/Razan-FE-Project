import React, { useState, useEffect } from 'react';
import './Offer.css';
import image from '../../images/offer image.jpg'
import { ScreenLockLandscapeRounded } from '@mui/icons-material';
export default function Offer() {
    const [countdown, setCountdown] = useState(null);
    useEffect(() => {
        const targetDate = new Date('2024-12-25').getTime(); // Replace with your desired date
        const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        if (distance < 0) {
        clearInterval(intervalId); 
        setCountdown('Countdown finished');
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown({
          days,
          hours,
          minutes,
          seconds,
        });
      }
    }, 1000);

    return () => clearInterval(intervalId); 
  }, [])
  return (
    <div>
        <div className='trend'>
            <div className='Title'>
                <p>TRENDY PRODUCTS</p>
                <h1>Furniture And Accessories</h1>
                <button className="shopNow">SHOP&nbsp;NOW</button>
            </div>
        </div>
        <div className='countdown'>
            <div className='counter'>
                <div className='Title'>
                    <p>SALE UP TO 50%</p>
                    <h1>Mega Offer On Every Sale</h1>
                    {countdown && (
                        <div className="count">
                            <div className="time-unit">
                                <span className="days">{countdown.days} <hr className="hr-line"/> <p>Days</p></span>
                            </div>
                            <div className="time-unit">
                                <span className="hours">{countdown.hours} <hr className="hr-line"/> <p>HRS</p></span>
                            </div>
                            <div className="time-unit">
                                <span className="minutes">{countdown.minutes}<hr className="hr-line"/> <p>MIN</p></span>
                            </div>
                            <div className="time-unit">
                                <span className="seconds">{countdown.seconds} <hr className="hr-line"/><p>SEC</p></span>
                                
                            </div>
                        </div>
                    )}
                    <button className="shopNow">SHOP&nbsp;ALL</button>
                </div>
            </div>
            <div className='sideimage'>
                <img src = {image} alt="side"/>
            </div>
        </div>
    </div>
  )
}
