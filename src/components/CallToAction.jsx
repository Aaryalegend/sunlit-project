import React from 'react';

const CallToAction = () => {
  return (
    <section className="relative w-full h-[422px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={require('../assets/cta-bg.svg')} 
          alt="Solar panels background" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #1976D2 0%, #0d47a1 100%)';
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-[rgba(0,10,47,0.44)]"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-8">
        <h2 className="text-[64px] font-bold text-lightBlue mb-6 text-center leading-tight">
          Ready to Go Solar?
        </h2>
        
        <p className="text-2xl font-normal text-white text-center mb-12 max-w-[852px] tracking-[0.05em]">
          Join hundreds of satisfied customers who have made the switch to clean, 
          affordable solar energy with Sun Lit Tech.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-8">
          <button className="bg-primary text-white px-9 py-4 rounded-[19px] text-2xl font-normal tracking-[0.05em] hover:bg-blue-700 transition-colors min-w-[285px]">
            Request a Quote
          </button>
          <button className="bg-transparent border-[1.5px] border-white text-white px-9 py-4 rounded-[19px] text-2xl font-normal tracking-[0.05em] hover:bg-white hover:text-primary transition-colors min-w-[269px]">
            Calculate Savings
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
