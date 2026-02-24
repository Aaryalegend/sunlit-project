import React from 'react';

const OurBrand = () => {
  return (
    <section className="w-full py-20 px-20">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 gap-12 items-start">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h2 className="text-[48px] font-bold text-primary leading-tight">
              Our Brand
            </h2>
            
            <h3 className="text-[32px] font-normal text-dark leading-tight">
              Pioneering Solar & Electrical Solutions<br />
              Since 2017
            </h3>
            
            <div className="space-y-4 text-base font-normal text-dark leading-relaxed">
              <p>
                Sun Lit Tech is a leading solar energy and electrical infrastructure company in India, 
                established on 2 April 2017. With a strong focus on delivering innovative, reliable, 
                and sustainable energy solutions, we have rapidly grown into a trusted provider across 
                multiple sectors.
              </p>
              
              <p>
                Alongside our core solar EPC services, we specialize in electrical HT and LT cabling 
                infrastructure works and provide end-to-end electrical liaisoning with MSEGCL, MSETCL & MSEDCL.
              </p>
            </div>

            {/* Quote Box */}
            <div className="bg-lightBlue rounded-[20px] p-8 mt-8 relative">
              <div className="mb-4">
                <img 
                  src={require('../assets/quote-icon.svg')} 
                  alt="Quote" 
                  className="w-12 h-12"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <p className="text-lg italic text-dark mb-4">
                "Renewable energy is the only safe path to a sustainable future."
              </p>
              <p className="text-lg italic text-primary">
                — Hermann Scheer
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="rounded-[20px] overflow-hidden shadow-lg">
              <img 
                src={require('../assets/brand-image.svg')} 
                alt="Solar installation" 
                className="w-full h-[600px] object-cover"
                onError={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #1976D2 0%, #0d47a1 100%)';
                }}
              />
              
              {/* Location Badge */}
              <div className="absolute bottom-6 left-6 bg-white bg-opacity-90 backdrop-blur-sm rounded-[20px] p-6">
                <p className="text-base text-primary mb-2">
                  Pune, Maharashtra
                </p>
                <p className="text-[32px] font-normal text-primary">
                  Est. 2017
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurBrand;
