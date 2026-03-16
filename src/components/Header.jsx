import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <section className="relative w-full h-[500px] md:h-[778px]">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video 
          src="https://res.cloudinary.com/dsgd4vb02/video/upload/v1773688388/sample_unzlr0.mp4" 
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #1976D2 0%, #0d47a1 100%)';
          }}
        />
        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-[rgba(2,32,62,0.57)]"></div> */}
      </div>

      {/* Content */}
      <div className="relative w-full px-4 md:px-20 h-full flex flex-col justify-center">
        <p className="text-[22px] md:text-[48px]  text-white mb-4">
          Solar Energy is the primary energy on Earth
        </p>
        <h1 className="text-[28px] md:text-[64px] font-bold leading-[1.3] md:leading-[1.23] tracking-[0.05em] text-lightBlue mb-4 md:mb-6">
          Journey With Energy Powered by Sun Lit Tech
        </h1>
        
        <p className="text-base md:text-2xl font-normal leading-[1.4] md:leading-[1.23] tracking-[0.05em] text-white mb-6 md:mb-8">
          More Than a Solar Project, A Shared Commitment
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-10">
          <button 
            onClick={() => navigate('/contact')}
            className="bg-primary text-white px-5 py-3 md:py-4 rounded-[14px] text-sm md:text-lg font-normal tracking-[0.05em] hover:bg-blue-700 transition-colors w-full md:w-auto md:min-w-[245px]">
            Get free Consultation
          </button>
          <button 
            onClick={() => navigate('/calculator')}
            className="bg-transparent border-[1px] border-white text-white px-5 py-3 md:py-4 rounded-[14px] text-sm md:text-lg font-normal tracking-[0.05em] hover:bg-white hover:text-primary transition-colors w-full md:w-auto md:min-w-[184px]">
            Solar Calculator
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;