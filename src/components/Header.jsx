import React from 'react';

const Header = () => {
  return (
    <section className="relative w-full h-[778px] -mx-[43px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={require('../assets/header-bg.svg')} 
          alt="Solar panels" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #1976D2 0%, #0d47a1 100%)';
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-[rgba(2,32,62,0.57)]"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-[1280px] mx-auto px-[90px] h-full flex flex-col justify-center">
        <h1 className="text-[64px] font-bold leading-[1.23] tracking-[0.05em] text-lightBlue mb-6">
          Journey With Energy Powered by<br />
          Sun Lit Tech
        </h1>
        
        <p className="text-2xl font-normal leading-[1.23] tracking-[0.05em] text-center text-white mb-8 max-w-[634px]">
          More Than a Solar Project, A Shared Commitment
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-10">
          <button className="bg-primary text-white px-6 py-6 rounded-[19px] text-2xl font-normal tracking-[0.05em] hover:bg-blue-700 transition-colors min-w-[327px]">
            Get free Consultation
          </button>
          <button className="bg-transparent border-[1.5px] border-white text-white px-6 py-6 rounded-[19px] text-2xl font-normal tracking-[0.05em] hover:bg-white hover:text-primary transition-colors min-w-[245px]">
            Solar Calculator
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;
