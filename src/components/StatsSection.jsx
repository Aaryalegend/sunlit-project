import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: '7+', label: 'Years of Experience' },
    { number: '5MW+', label: 'Installed Capacity' },
    { number: '200+', label: 'Projects Complete' },
  ];

  return (
    <section className="w-full bg-primary py-3 md:py-4">
      <div className="max-w-[1280px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-2 md:flex md:justify-between gap-4 md:gap-0">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2 md:gap-3">
              <h3 className="text-[24px] md:text-[36px] font-bold text-white whitespace-nowrap">
                {stat.number}
              </h3>
              <p className="text-xs md:text-base font-normal text-white tracking-[0.05em] leading-tight">
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