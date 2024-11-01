import React, { useState, useEffect } from 'react';
import './HeroSection.css';
import Hero1 from '../../images/hero section 1.webp';
import Hero2 from '../../images/hero section 2.webp';
import Hero3 from '../../images/hero section 3.webp';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: Hero1,
      text: 'Fine Quality',
      buttonText: 'Shop Now',
    },
    {
      image: Hero2,
      text: 'Unique Style',
      buttonText: 'Shop Now',
    },
    {
      image: Hero3,
      text: 'Stylish Design',
      buttonText: 'Shop Now',
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Adjust the interval as needed

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="hero-section">
      <img src={slides[currentSlide].image} alt="Slide" />
      <div className="text-container">
        <p>{slides[currentSlide].text}</p>
        <button>{slides[currentSlide].buttonText}</button>
      </div>
    </section>
  );
}