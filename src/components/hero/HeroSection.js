import React, { useState, useEffect } from 'react';
import './HeroSection.css';


export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://media.homecentre.com/i/homecentre/161691850-161691850-HC210519_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp-2x$",
      text: "Fine Quality",
      buttonText: "Shop Now",
    },
    {
      image:
        "https://mobilia.ca/blog/wp-content/uploads/2024/04/2024-02-28_Mobilia_Lookbook0544-copie-Large.jpeg",
      text: "Unique Style",
      buttonText: "Shop Now",
    },
    {
      image:
        "https://cdn.salla.sa/rgVjz/6a7989d4-9365-4897-a42d-0674dd85b998-1000x1000-3WMHdQOnfnQ17SVcCo41c1I7aJ5Cqq02eK9BkN5K.jpg",
      text: "Stylish Design",
      buttonText: "Shop Now",
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
        <button >{slides[currentSlide].buttonText}</button>
      </div>
    </section>
  );
}