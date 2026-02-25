import React from 'react';

const WhatWeDo = () => {
  const services = [
    {
      image: require('../assets/service-1.svg'),
      title: 'On-Grid solar Solutions',
      description: 'Grid-tied systems with net metering for maximum savings and ROI.'
    },
    {
      image: require('../assets/service-2.svg'),
      title: 'Off-Grid Solar Solutions',
      description: 'Independent power systems for remote locations with battery backup.'
    },
    {
      image: require('../assets/service-3.svg'),
      title: 'Hybrid Solar Systems',
      description: 'Best of both worlds - grid connection with battery backup security.'
    },
    {
      image: require('../assets/service-4.svg'),
      title: 'Ground-Mounted Solar',
      description: 'Large-scale solar installations for industrial and commercial use.'
    },
    {
      image: require('../assets/service-5.svg'),
      title: 'Solar Rooftop Systems',
      description: 'Residential and commercial rooftop solar panel installations.'
    },
    {
      image: require('../assets/service-6.svg'),
      title: 'O&M Services',
      description: 'Comprehensive operation and maintenance for optimal performance.'
    }
  ];

  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-20">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[32px] md:text-[48px] font-bold text-primary mb-2 md:mb-4">
            What We Do
          </h2>
          <h3 className="text-[20px] md:text-[32px] font-normal text-dark">
            Comprehensive Energy Solutions
          </h3>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-primary rounded-[20px] shadow-card hover:shadow-xl transition-all hover:-translate-y-2 duration-300"
            >
              {/* Service Image */}
              <div className="w-full h-[180px] md:h-[227px] rounded-t-[20px] overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #1976D2 0%, #0d47a1 100%)';
                  }}
                />
              </div>
              
              {/* Service Content */}
              <div className="p-5 md:p-6">
                <h4 className="text-xl md:text-2xl font-bold text-lightBlue mb-2 md:mb-3 leading-tight">
                  {service.title}
                </h4>
                <p className="text-sm md:text-[15px] font-normal text-white leading-relaxed tracking-[0.05em]">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;