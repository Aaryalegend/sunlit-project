import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../data/blogsData';

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [allBlogs, setAllBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

  const categories = ['All', 'Solar Energy', 'Technology', 'Sustainability', 'Industry News'];

  useEffect(() => {
    const loadBlogs = async () => {
      const blogs = await getBlogs();
      setAllBlogs(blogs);
    };
    loadBlogs();
  }, []);

  const featuredBlog = allBlogs.find(b => b.featured) || allBlogs[0];
  const blogs = allBlogs.filter(b => b.id !== (featuredBlog ? featuredBlog.id : -1));

  const filteredBlogs = activeCategory === 'All' 
    ? blogs 
    : blogs.filter(b => b.category === activeCategory);

  const visibleBlogs = filteredBlogs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredBlogs.length;

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Solar Energy': return 'bg-yellow-100 text-yellow-800';
      case 'Technology': return 'bg-blue-100 text-blue-800';
      case 'Sustainability': return 'bg-green-100 text-green-800';
      case 'Industry News': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[150px] md:h-[200px]">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#02203E] to-[#1976D2]"></div>
        
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#02203E] to-[#1976D2]"></div> */}
        <div className="relative max-w-[1280px] mx-auto px-4 md:px-[90px] h-full flex flex-col justify-center">
          <h1 className="text-[32px] md:text-[64px] font-bold text-lightBlue leading-tight tracking-[0.05em]">
            Our Blog
          </h1>
          <p className="text-base md:text-xl font-normal text-white mt-4 max-w-[634px] tracking-[0.05em]">
            Insights, news, and guides about solar energy and sustainability
          </p>
        </div>
      </section>

      {/* Featured Blog */}
      {featuredBlog && (
      <section className="w-full py-10 md:py-16 px-4 md:px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-white rounded-[20px] shadow-card overflow-hidden">
            {/* Featured Image */}
            <div className="h-[250px] md:h-auto bg-gradient-to-br from-[#1976D2] to-[#0d47a1] relative">
              {featuredBlog.image ? (
                <img src={featuredBlog.image} alt={featuredBlog.title} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white opacity-20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>
                  </svg>
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className="bg-yellow-400 text-dark px-4 py-1.5 rounded-full text-sm font-bold">
                  Featured
                </span>
              </div>
            </div>

            {/* Featured Content */}
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(featuredBlog.category)}`}>
                  {featuredBlog.category}
                </span>
                <span className="text-sm text-gray-500">{featuredBlog.readTime}</span>
              </div>
              <h2 className="text-[24px] md:text-[32px] font-bold text-dark mb-4 leading-tight">
                {featuredBlog.title}
              </h2>
              <p className="text-sm md:text-base font-normal text-dark leading-relaxed tracking-[0.05em] mb-6">
                {featuredBlog.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SL</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-dark">{featuredBlog.author}</p>
                    <p className="text-xs text-gray-500">{featuredBlog.date}</p>
                  </div>
                </div>
                <Link to={`/blogs/${featuredBlog.id}`} className="bg-primary text-white px-6 py-2.5 rounded-[19px] text-sm font-bold hover:bg-blue-700 transition-colors">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Category Filter */}
      <section className="w-full px-4 md:px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-10 md:mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => { setActiveCategory(category); setVisibleCount(3); }}
                className={`px-5 md:px-8 py-2 md:py-3 rounded-[19px] text-sm md:text-base font-bold tracking-[0.05em] transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-card'
                    : 'bg-lightBlue text-primary hover:bg-primary hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="w-full pb-12 md:pb-20 px-4 md:px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {visibleBlogs.map((blog) => (
              <Link 
                to={`/blogs/${blog.id}`}
                key={blog.id}
                className="bg-white rounded-[20px] shadow-card hover:shadow-xl transition-all hover:-translate-y-2 duration-300 overflow-hidden group cursor-pointer block"
              >
                {/* Blog Image */}
                <div className="w-full h-[180px] md:h-[200px] bg-gradient-to-br from-[#1976D2] to-[#0d47a1] relative overflow-hidden">
                  {blog.image ? (
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-12 h-12 text-white opacity-20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(blog.category)}`}>
                      {blog.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white bg-opacity-90 px-3 py-1 rounded-full text-xs font-normal text-dark">
                      {blog.readTime}
                    </span>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-5 md:p-6">
                  <p className="text-xs text-gray-500 mb-2">{blog.date}</p>
                  <h4 className="text-lg md:text-xl font-bold text-dark mb-3 leading-tight group-hover:text-primary transition-colors">
                    {blog.title}
                  </h4>
                  <p className="text-sm font-normal text-dark leading-relaxed tracking-[0.05em] mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white font-bold text-xs">SL</span>
                      </div>
                      <span className="text-xs font-bold text-dark">{blog.author}</span>
                    </div>
                    <span className="text-primary font-bold text-sm group-hover:underline">Read →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setVisibleCount(prev => prev + 3)}
                className="bg-primary text-white px-10 py-3.5 rounded-[19px] text-base font-bold hover:bg-blue-700 transition-colors"
              >
                View More
              </button>
            </div>
          )}
          {!hasMore && visibleCount > 3 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setVisibleCount(3)}
                className="bg-transparent border-2 border-primary text-primary px-10 py-3.5 rounded-[19px] text-base font-bold hover:bg-primary hover:text-white transition-colors"
              >
                View Less
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Opportunity Section */}
      <section className="w-full bg-[#E6F2FF] py-12 md:py-16 px-4 md:px-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row gap-10 md:gap-12">

            {/* Left: Solar Potential in India */}
            <div className="flex-1 flex flex-col justify-center gap-6">
              <p className="text-[20px] md:text-[24px] font-normal text-primary tracking-[0.05em]">
                Opportunity
              </p>
              <h3 className="text-[24px] md:text-[32px] font-bold text-dark leading-tight tracking-[0.05em]">
                Solar Potential in India
              </h3>
              <p className="text-base md:text-[20px] font-normal text-dark leading-snug tracking-[0.05em]">
                India offers one of the world's most favourable environments for solar energy generation, making solar PV a strong long-term solution.
              </p>
              <ul className="flex flex-col gap-3 mt-2">
                {[
                  'Average solar radiation of 4-7 kWh/m²/day',
                  'Over 330 sunny days annually',
                  'Clean energy reducing carbon emissions',
                  'Proven technology with 25+ years lifespan',
                  'Attractive government incentives and policies',
                ].map((point, i) => (
                  <li key={i} className="text-sm md:text-base font-bold text-dark tracking-[0.05em]">
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: two white cards */}
            <div className="flex-1 flex flex-col gap-4">

              {/* Card 1: Investment Protection */}
              <div className="bg-white rounded-[20px] shadow-[0px_0px_6.9px_1px_rgba(0,0,0,0.1)] border border-[rgba(102,102,102,0.5)] p-6">
                <h4 className="text-[18px] md:text-[20px] font-bold text-dark text-center tracking-[0.05em] mb-4">
                  Investment Protection
                </h4>
                <ul className="flex flex-col gap-2 list-disc pl-5">
                  {[
                    'Project insurance covering natural disasters and theft',
                    'Third-party insurance for high-value equipment and human life',
                    'Minimum generation guarantees for assured performance',
                    'Detailed resource assessment and feasibility analysis',
                  ].map((point, i) => (
                    <li key={i} className="text-sm md:text-base font-normal text-dark leading-relaxed tracking-[0.05em]">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 2: Revenue & Returns */}
              <div className="bg-white rounded-[20px] shadow-[0px_0px_6.9px_1px_rgba(0,0,0,0.1)] border border-[rgba(102,102,102,0.5)] p-6">
                <h4 className="text-[18px] md:text-[20px] font-bold text-dark text-center tracking-[0.05em] mb-4">
                  Revenue &amp; Returns
                </h4>
                <ul className="flex flex-col gap-2 list-disc pl-5">
                  {[
                    'Power sales through DISCOM PPAs and third-party open access',
                    'Eligibility for Renewable Energy Certificates (RECs) and Carbon Credits',
                    'Annual generation potential of 13.5-19 lakh units per MW',
                    'Accelerated Depreciation (80%) and tax benefits',
                    'Long-term land value appreciation',
                  ].map((point, i) => (
                    <li key={i} className="text-sm md:text-base font-normal text-dark leading-relaxed tracking-[0.05em]">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* End-to-End Project Support Section */}
      <section className="w-full bg-white py-12 md:py-16 px-4 md:px-12">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-[20px] md:text-[24px] font-normal text-primary tracking-[0.05em] mb-2">
            Support
          </p>
          <h3 className="text-[24px] md:text-[32px] font-bold text-dark tracking-[0.05em] mb-8">
            End-to-End Project Support
          </h3>
          <div className="flex flex-col gap-3">
            {[
              'Land procurement and statutory approvals',
              'Registrations with MNRE, nodal agencies, and utilities',
              'Facilitation of open-access PPAs, RECs, and carbon credits',
              'Assistance with project financing and soft loans',
              'Execution by an experienced professional team',
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#E6F2FF] rounded-[14px] px-4 py-3"
              >
                <span className="text-sm md:text-base font-normal text-dark tracking-[0.05em]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operations & Maintenance Section */}
      <section className="w-full bg-[#E6F2FF] py-12 md:py-16 px-4 md:px-12">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-[20px] md:text-[24px] font-normal text-primary tracking-[0.05em] mb-2">
            Maintenance
          </p>
          <h3 className="text-[24px] md:text-[32px] font-bold text-dark tracking-[0.05em] mb-8">
            Operations &amp; Maintenance
          </h3>
          <div className="flex flex-col gap-3">
            {[
              'Secure real-time monitoring of power generation',
              'Preventive and corrective maintenance programs',
              'Performance optimization for maximum energy yield',
              '24×7 system surveillance and support',
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-[14px] px-4 py-3">
                <span className="text-sm md:text-base font-normal text-dark tracking-[0.05em]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Blogs;
