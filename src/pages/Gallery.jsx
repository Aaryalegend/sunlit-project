import React, { useState } from 'react';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filters = ['All', 'Installations', 'Team', 'Events', 'Before & After'];

  const galleryItems = [
    { id: 1, category: 'Installations', title: 'Residential Rooftop - Pune', description: '10 kW rooftop solar installation', gradient: 'from-blue-400 to-blue-700' },
    { id: 2, category: 'Installations', title: 'Commercial Solar - Mumbai', description: '100 kW commercial installation', gradient: 'from-cyan-400 to-blue-600' },
    { id: 3, category: 'Team', title: 'Team at Work', description: 'Our engineers during installation', gradient: 'from-green-400 to-green-700' },
    { id: 4, category: 'Events', title: 'Solar Expo 2024', description: 'Sun Lit Tech at the annual solar expo', gradient: 'from-yellow-400 to-orange-600' },
    { id: 5, category: 'Installations', title: 'Ground-Mounted Solar - Nagpur', description: '500 kW ground-mounted system', gradient: 'from-blue-500 to-indigo-700' },
    { id: 6, category: 'Before & After', title: 'Factory Roof Transformation', description: 'Before and after solar installation', gradient: 'from-gray-400 to-gray-700' },
    { id: 7, category: 'Team', title: 'Team Celebration', description: '200th project completion celebration', gradient: 'from-purple-400 to-purple-700' },
    { id: 8, category: 'Installations', title: 'Industrial Plant - Chakan', description: '1 MW industrial solar plant', gradient: 'from-teal-400 to-teal-700' },
    { id: 9, category: 'Events', title: 'CSR Activity', description: 'Solar panel donation to school', gradient: 'from-pink-400 to-red-600' },
    { id: 10, category: 'Before & After', title: 'Warehouse Rooftop', description: 'Rooftop solar transformation', gradient: 'from-slate-400 to-slate-700' },
    { id: 11, category: 'Installations', title: 'Housing Society - Hadapsar', description: '50 kW shared solar system', gradient: 'from-sky-400 to-sky-700' },
    { id: 12, category: 'Team', title: 'Technical Training', description: 'Annual team training program', gradient: 'from-emerald-400 to-emerald-700' },
  ];

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[300px] md:h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#02203E] to-[#1976D2]"></div>
        <div className="relative max-w-[1280px] mx-auto px-4 md:px-[90px] h-full flex flex-col justify-center">
          <h1 className="text-[32px] md:text-[64px] font-bold text-lightBlue leading-tight tracking-[0.05em]">
            Gallery
          </h1>
          <p className="text-base md:text-2xl font-normal text-white mt-4 max-w-[634px] tracking-[0.05em]">
            A visual journey through our solar installations and team moments
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="w-full py-8 md:py-12 px-4 md:px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-10 md:mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 md:px-8 py-2 md:py-3 rounded-[19px] text-sm md:text-base font-bold tracking-[0.05em] transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-primary text-white shadow-card'
                    : 'bg-lightBlue text-primary hover:bg-primary hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Masonry-style Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredItems.map((item, index) => {
              const isLarge = index % 5 === 0;
              return (
                <div 
                  key={item.id}
                  className={`${isLarge ? 'sm:col-span-2 sm:row-span-2' : ''} relative group cursor-pointer rounded-[20px] overflow-hidden shadow-card hover:shadow-xl transition-all duration-300`}
                  onClick={() => setSelectedImage(item)}
                >
                  <div className={`w-full ${isLarge ? 'h-[300px] md:h-[460px]' : 'h-[200px] md:h-[220px]'} bg-gradient-to-br ${item.gradient} relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-12 h-12 md:w-16 md:h-16 text-white opacity-20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                      </svg>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
                      <div className="p-4 md:p-6 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-xs text-white bg-white bg-opacity-20 px-3 py-1 rounded-full backdrop-blur-sm">
                          {item.category}
                        </span>
                        <h4 className="text-base md:text-lg font-bold text-white mt-2">{item.title}</h4>
                        <p className="text-xs md:text-sm text-white text-opacity-80 mt-1">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-[60] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white rounded-[20px] max-w-[800px] w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`w-full h-[300px] md:h-[450px] bg-gradient-to-br ${selectedImage.gradient} relative`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-20 h-20 text-white opacity-20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
              </div>
              <button 
                className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                onClick={() => setSelectedImage(null)}
              >
                <svg className="w-5 h-5 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 md:p-8">
              <span className="text-xs font-bold text-primary bg-lightBlue px-3 py-1 rounded-full">
                {selectedImage.category}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-dark mt-3 mb-2">{selectedImage.title}</h3>
              <p className="text-sm md:text-base text-dark">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats section */}
      <section className="w-full bg-primary py-10 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12">
          <div className="text-center mb-10">
            <h2 className="text-[28px] md:text-[48px] font-bold text-white mb-2">Our Impact in Numbers</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { number: '200+', label: 'Projects' },
              { number: '1000+', label: 'Photos' },
              { number: '50+', label: 'Happy Teams' },
              { number: '15+', label: 'Cities' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-[32px] md:text-[48px] font-bold text-white mb-1">{stat.number}</h3>
                <p className="text-sm md:text-xl font-normal text-lightBlue tracking-[0.05em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
