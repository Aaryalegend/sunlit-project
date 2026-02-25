import React from 'react';

const Vision = () => {
  const visionPoints = [
    {
      icon: require('../assets/sun-icon.png'),
      title: 'Clean Energy',
      fallbackColor: '#FFB800'
    },
    {
      icon: require('../assets/lightning-icon.png'),
      title: 'Safe Distribution',
      fallbackColor: '#1976D2'
    },
    {
      icon: require('../assets/leaf-icon.png'),
      title: 'Lower Emission',
      fallbackColor: '#4CAF50'
    },
    {
      icon: require('../assets/eye-icon.png'),
      title: 'Community impact',
      fallbackColor: '#9C27B0'
    }
  ];

  return (
    <section className="w-full bg-lightBlue py-8 md:py-0">
      <div className="max-w-[1280px] mx-auto px-4 md:px-0 md:h-[525px] flex flex-col md:justify-start">
        {/* Text Content - Centered */}
        <div className="text-center mx-auto max-w-[795px] md:pt-8 mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-normal text-primary mb-3 md:mb-4 tracking-[0.05em]">
            Our Vision
          </h2>
          
          <h3 className="text-[24px] md:text-[32px] font-bold text-dark mb-4 md:mb-6 leading-tight tracking-[0.05em]">
            Building a Greener, Sustainable Future
          </h3>
          
          <p className="text-base md:text-xl font-normal text-dark leading-relaxed tracking-[0.05em]">
            At Sun Lit Tech, our vision is to harness the power of the sun and electricity 
            infrastructure expertise to build a greener, sustainable future. We develop 
            technologies and solutions that positively impact communities and industries, 
            supporting India's clean energy and infrastructure goals
          </p>
        </div>

        {/* Vision Points - Horizontal Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-[27px] md:px-[100px]">
          {visionPoints.map((point, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[20px] p-4 md:p-0 md:w-[250px] md:h-[171px] flex flex-col items-center justify-center shadow-[0px_0px_11.8px_1px_rgba(0,0,0,0.25)] hover:shadow-xl transition-shadow"
            >
              <div className="mb-3 md:mb-4 md:mt-[19px]">
                <img 
                  src={point.icon} 
                  alt={point.title}
                  className="w-12 h-12 md:w-[76px] md:h-[76px] object-contain"
                  onError={(e) => {
                    e.target.outerHTML = `<div style="width: 76px; height: 76px; background: ${point.fallbackColor}; border-radius: 50%;"></div>`;
                  }}
                />
              </div>
              <h4 className="text-base md:text-xl font-bold text-dark text-center tracking-[0.05em] md:mb-[31px]">
                {point.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vision;