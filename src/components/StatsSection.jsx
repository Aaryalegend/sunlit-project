import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: '7+', label: 'Years of Experience' },
    { number: '5MW+', label: 'Installed Capacity' },
    { number: '200+', label: 'Projects Complete' },
  ];

  return (
    <section className="w-full bg-primary py-6 md:py-9">
      <div className="max-w-[1280px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-2 md:flex md:justify-between gap-6 md:gap-0">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-[32px] md:text-[48px] font-bold text-white mb-1 md:mb-2">
                {stat.number}
              </h3>
              <p className="text-sm md:text-2xl font-normal text-white tracking-[0.05em]">
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