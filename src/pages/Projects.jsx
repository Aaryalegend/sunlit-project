import React, { useState, useEffect } from 'react';
import { getProjects } from '../data/projectsData';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);

  const filters = ['All', 'Residential', 'Commercial', 'Industrial', 'Government'];

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[300px] md:h-[400px]">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#02203E] to-[#1976D2]"></div> */}
        <div className="absolute inset-0 bg-[rgba(2,32,62,0.57)]"></div>
        <div className="relative max-w-[1280px] mx-auto px-4 md:px-[90px] h-full flex flex-col justify-center">
          <h1 className="text-[32px] md:text-[64px] font-bold text-lightBlue leading-tight tracking-[0.05em]">
            Our Projects
          </h1>
          <p className="text-base md:text-2xl font-normal text-white mt-4 max-w-[634px] tracking-[0.05em]">
            Explore our portfolio of successful solar installations across India
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="w-full bg-primary py-6 md:py-9">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-2 md:flex md:justify-between gap-6 md:gap-0">
            {[
              { number: '200+', label: 'Projects Completed' },
              { number: '5MW+', label: 'Total Capacity' },
              { number: '15+', label: 'Cities Covered' },
            ].map((stat, index) => (
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

      {/* Filter Tabs */}
      <section className="w-full py-8 md:py-12 px-4 md:px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-10 md:mb-16">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 md:px-8 py-2.5 md:py-3 rounded-[19px] text-sm md:text-base font-bold tracking-[0.05em] transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-primary text-white shadow-card'
                    : 'bg-lightBlue text-primary hover:bg-primary hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-[20px] shadow-card hover:shadow-xl transition-all hover:-translate-y-2 duration-300 overflow-hidden"
              >
                {/* Project Image */}
                <div className="w-full h-[200px] md:h-[227px] bg-gradient-to-br from-[#1976D2] to-[#0d47a1] relative overflow-hidden">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-16 h-16 text-white opacity-30" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                      </svg>
                    </div>
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-4 py-1">
                    <span className="text-xs md:text-sm font-bold text-primary">{project.category}</span>
                  </div>
                  {/* Capacity Badge */}
                  <div className="absolute top-4 right-4 bg-primary bg-opacity-90 backdrop-blur-sm rounded-full px-4 py-1">
                    <span className="text-xs md:text-sm font-bold text-white">{project.capacity}</span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-5 md:p-6">
                  <h4 className="text-lg md:text-xl font-bold text-dark mb-2 leading-tight">
                    {project.title}
                  </h4>
                  <div className="flex items-center gap-1 mb-3">
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="text-sm text-primary font-normal">{project.location}</span>
                  </div>
                  <p className="text-sm md:text-[15px] font-normal text-dark leading-relaxed tracking-[0.05em] mb-4">
                    {project.description}
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full h-[300px] md:h-[350px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#02203E] to-[#1976D2]"></div>
        <div className="relative h-full flex flex-col items-center justify-center px-4 md:px-8">
          <h2 className="text-[28px] md:text-[48px] font-bold text-lightBlue mb-4 md:mb-6 text-center leading-tight">
            Want to See Your Project Here?
          </h2>
          <p className="text-base md:text-xl font-normal text-white text-center mb-6 md:mb-10 max-w-[700px] tracking-[0.05em]">
            Get started with your solar journey today. Contact us for a free consultation.
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <a href="/contact" className="bg-white text-primary px-6 md:px-9 py-3 md:py-4 rounded-[19px] text-base md:text-xl font-bold tracking-[0.05em] hover:bg-lightBlue transition-colors text-center">
              Get Free Consultation
            </a>
            <a href="/calculator" className="bg-transparent border-[1.5px] border-white text-white px-6 md:px-9 py-3 md:py-4 rounded-[19px] text-base md:text-xl font-normal tracking-[0.05em] hover:bg-white hover:text-primary transition-colors text-center">
              Calculate Savings
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
