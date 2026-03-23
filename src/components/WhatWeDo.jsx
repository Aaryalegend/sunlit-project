import React, { useState } from 'react';

const WhatWeDo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const services = [
    {
      image: 'https://res.cloudinary.com/dsgd4vb02/image/upload/v1774248216/Screenshot_20260323_120449_k17xq2.png',
      title: 'On-Grid solar Solutions',
      description: 'Grid-tied systems with net metering for maximum savings and ROI.'
    },
    {
      image: 'https://res.cloudinary.com/dsgd4vb02/image/upload/v1774248216/Screenshot_20260323_120417_jl5ulz.png',
      title: 'Off-Grid Solar Solutions',
      description: 'Independent power systems for remote locations with battery backup.'
    },
    {
      image: 'https://res.cloudinary.com/dsgd4vb02/image/upload/v1774248216/Screenshot_20260323_121320_dodhxo.png',
      title: 'Hybrid Solar Systems',
      description: 'Best of both worlds - grid connection with battery backup security.'
    },
    {
      image: 'https://res.cloudinary.com/dsgd4vb02/image/upload/v1774248240/groundMounted_hde9o4.webp',
      title: 'Ground-Mounted Solar',
      description: 'Large-scale solar installations for industrial and commercial use.'
    },
    {
      image: 'https://res.cloudinary.com/dsgd4vb02/image/upload/v1774248240/OpenAccess_itjvky.jpg',
      title: 'Open-access Solar Parks',
      description: 'Residential and commercial rooftop solar panel installations.'
    },
    {
      image: 'https://res.cloudinary.com/dsgd4vb02/image/upload/v1774248243/o_m_vpd78i.png',
      title: 'O&M Services',
      description: 'Comprehensive operation and maintenance for optimal performance.'
    },
    {
      image: 'https://res.cloudinary.com/dsgd4vb02/image/upload/v1774248241/HT-LT-Cables_nzpzjx.png',
      title: 'HT & LT Cabling and Installations',
      description: 'Electrical Infrastructure with Sanctioning HT & LT Cabling and Installations.'
    }
  ];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === services.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDragStart = (e) => {
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    setDragStartX(clientX);
    setIsDragging(true);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const diff = clientX - dragStartX;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 50) {
      handlePrevious();
    } else if (dragOffset < -50) {
      handleNext();
    }
    setDragOffset(0);
  };

  return (
    <section className="w-full py-12 md:py-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-20">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[32px] md:text-[48px] font-bold text-primary mb-2 md:mb-4">
            What We Do
          </h2>
          <h3 className="text-[20px] md:text-[32px] font-normal text-dark">
            Comprehensive Energy Solutions
          </h3>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full flex items-center justify-center group">
        {/* Left Arrow */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 md:left-8 lg:left-16 p-2 md:p-3 bg-primary rounded-full text-white hover:bg-opacity-80 transition-all duration-300 shadow-md hover:shadow-lg z-30 opacity-70 group-hover:opacity-100"
          aria-label="Previous service"
        >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Carousel Viewport */}
          <div 
            className="w-full relative h-[420px] md:h-[580px] lg:h-[680px] flex items-center justify-center overflow-visible touch-pan-y"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {services.map((service, index) => {
              let offset = index - currentIndex;
              const len = services.length;
              if (offset < -Math.floor(len / 2)) offset += len;
              if (offset > Math.floor(len / 2)) offset -= len;

              const isCenter = offset === 0;
              
              let translateX = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 1;

              if (offset === 0) {
                translateX = `calc(0% + ${dragOffset}px)`;
                scale = 1;
                opacity = 1;
                zIndex = 10;
              } else if (offset === -1) {
                translateX = `calc(-105% + ${dragOffset}px)`;
                scale = 0.75;
                opacity = 0.5;
                zIndex = 5;
              } else if (offset === 1) {
                translateX = `calc(105% + ${dragOffset}px)`;
                scale = 0.75;
                opacity = 0.5;
                zIndex = 5;
              } else if (offset === -2) {
                translateX = `calc(-200% + ${dragOffset}px)`;
                scale = 0.55;
                opacity = 0.2;
                zIndex = 2;
              } else if (offset === 2) {
                translateX = `calc(200% + ${dragOffset}px)`;
                scale = 0.55;
                opacity = 0.2;
                zIndex = 2;
              } else if (offset < -2) {
                translateX = `calc(-280% + ${dragOffset}px)`;
                scale = 0.4;
                opacity = 0;
                zIndex = 0;
              } else if (offset > 2) {
                translateX = `calc(280% + ${dragOffset}px)`;
                scale = 0.4;
                opacity = 0;
                zIndex = 0;
              }

              return (
                <div
                  key={index}
                  className={`absolute w-[320px] md:w-[480px] lg:w-[560px] transition-all select-none ${isDragging ? 'duration-0' : 'duration-500 ease-in-out'}`}
                  style={{
                    transform: `translateX(${translateX}) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                  onMouseEnter={() => !isDragging && setHoveredIndex(index)}
                  onMouseLeave={() => !isDragging && setHoveredIndex(null)}
                >
                  <div className={`bg-primary rounded-[20px] shadow-card transition-shadow duration-300 overflow-hidden ${isCenter ? 'hover:shadow-2xl' : ''}`}>
                    {/* Service Image */}
                    <div className="w-full h-[240px] md:h-[340px] lg:h-[400px] overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover pointer-events-none"
                        draggable="false"
                        onError={(e) => {
                          e.target.style.background = 'linear-gradient(135deg, #1976D2 0%, #0d47a1 100%)';
                        }}
                      />
                    </div>
                    
                    {/* Service Content */}
                    <div className={`flex flex-col justify-center transition-all duration-300 ${isCenter ? 'p-6 md:p-8 lg:p-10 min-h-[140px] md:min-h-[180px] lg:min-h-[220px]' : 'p-4 md:p-6 min-h-[100px] md:min-h-[140px]'}`}>
                      <h4 className={`font-bold text-lightBlue leading-tight transition-all duration-300 ${isCenter ? 'text-2xl md:text-3xl mb-3 md:mb-4' : 'text-lg md:text-xl line-clamp-2 text-center'}`}>
                        {service.title}
                      </h4>
                      
                      {/* Description - Show only for Center on Hover */}
                      <div className={`overflow-hidden transition-all duration-300 ${
                        isCenter && hoveredIndex === index ? 'max-h-[200px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
                      }`}>
                        <p className="text-sm md:text-[15px] font-normal text-white leading-relaxed tracking-[0.05em]">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 lg:right-16 p-2 md:p-3 bg-primary rounded-full text-white hover:bg-opacity-80 transition-all duration-300 shadow-md hover:shadow-lg z-30 opacity-70 group-hover:opacity-100"
            aria-label="Next service"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="w-full flex justify-center gap-2 mt-8 md:mt-14 relative z-20">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 md:w-10 bg-primary' 
                  : 'w-2 md:w-3 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>
    </section>
  );
};

export default WhatWeDo;