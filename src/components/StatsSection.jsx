import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: '7+', label: 'Years of Experience' },
    { number: '5MW+', label: 'Installed Capacity' },
    { number: '200+', label: 'Projects Complete' },
    { number: '98%', label: 'Customer Satisfaction' },
  ];

  return (
    <section className="w-full bg-primary py-9">
      <div className="max-w-[1280px] mx-auto px-12">
        <div className="flex justify-between items-center">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-[48px] font-bold text-white mb-2">
                {stat.number}
              </h3>
              <p className="text-2xl font-normal text-white tracking-[0.05em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
