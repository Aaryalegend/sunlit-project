import React from 'react';

const WhyGoSolar = () => {
  const benefits = [
    {
      icon: require('../assets/leaf-icon.png'),
      title: 'Environmental Impact',
      points: [
        '1 kW reduces ~1 ton CO₂ annually.',
        'Equivalent to planting 2 trees per year.',
        'Clean, sustainable energy generation.'
      ]
    },
    {
      icon: require('../assets/leaf-icon.png'),
      title: 'Cost Savings',
      points: [
        'Reduce electricity bills by up to 90%.',
        'Protection against rising energy costs.',
        'Government subsidies and incentives available.'
      ]
    },
    {
      icon: require('../assets/leaf-icon.png'),
      title: 'Energy Independence',
      points: [
        'Generate your own clean power.',
        'Reduce dependency on grid electricity.',
        'Reliable power supply with battery backup.'
      ]
    }
  ];

  return (
    <section className="w-full bg-lightBlue py-12 md:py-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[32px] md:text-[48px] font-bold text-primary mb-2 md:mb-4">
            Why Go Solar
          </h2>
          <h3 className="text-[20px] md:text-[32px] font-normal text-dark">
            Benefits of Solar Energy
          </h3>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white rounded-[20px] p-6 md:p-8 shadow-card hover:shadow-xl transition-shadow"
            >
              {/* Icon */}
              <div className="mb-4 md:mb-6 flex justify-center">
                <img 
                  src={benefit.icon} 
                  alt={benefit.title}
                  className="w-10 h-10 md:w-12 md:h-12"
                  onError={(e) => {
                    e.target.outerHTML = '<div style="width: 52px; height: 52px; background: #4CAF50; border-radius: 50%;"></div>';
                  }}
                />
              </div>

              {/* Title */}
              <h4 className="text-xl md:text-2xl font-bold text-dark text-center mb-4 md:mb-6">
                {benefit.title}
              </h4>

              {/* Points */}
              <ul className="space-y-2 md:space-y-3 list-none">
                {benefit.points.map((point, idx) => (
                  <li key={idx} className="text-sm md:text-base font-normal text-dark leading-6 md:leading-7 tracking-[0.05em] text-center">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyGoSolar;