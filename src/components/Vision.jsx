import React from 'react';

const Vision = () => {
  const visionPoints = [
    {
      icon: require('../assets/sun-icon.svg'),
      title: 'Clean Energy',
      fallbackColor: '#FFB800'
    },
    {
      icon: require('../assets/lightning-icon.svg'),
      title: 'Safe Distribution',
      fallbackColor: '#1976D2'
    },
    {
      icon: require('../assets/leaf-icon.svg'),
      title: 'Lower Emission',
      fallbackColor: '#4CAF50'
    },
    {
      icon: require('../assets/eye-icon.svg'),
      title: 'Community impact',
      fallbackColor: '#9C27B0'
    }
  ];

  return (
    <section className="w-full bg-lightBlue py-20">
      <div className="max-w-[1280px] mx-auto px-20">
        <div className="grid grid-cols-2 gap-16">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <h2 className="text-[48px] font-bold text-primary">
              Our Vision
            </h2>
            
            <h3 className="text-[32px] font-normal text-dark leading-tight">
              Building a Greener, Sustainable Future
            </h3>
            
            <p className="text-lg font-normal text-dark leading-relaxed">
              At Sun Lit Tech, our vision is to harness the power of the sun and electricity 
              infrastructure expertise to build a greener, sustainable future. We develop 
              technologies and solutions that positively impact communities and industries, 
              supporting India's clean energy and infrastructure goals
            </p>
          </div>

          {/* Right Column - Vision Points Grid */}
          <div className="grid grid-cols-2 gap-6">
            {visionPoints.map((point, index) => (
              <div 
                key={index} 
                className="bg-white rounded-[20px] p-8 shadow-card hover:shadow-xl transition-shadow"
              >
                <div className="mb-6">
                  <img 
                    src={point.icon} 
                    alt={point.title}
                    className="w-12 h-12"
                    onError={(e) => {
                      e.target.outerHTML = `<div style="width: 52px; height: 52px; background: ${point.fallbackColor}; border-radius: 50%;"></div>`;
                    }}
                  />
                </div>
                <h4 className="text-xl font-bold text-dark">
                  {point.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
